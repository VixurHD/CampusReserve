# CampusReserve — план базы данных и правила работы с ней

## Зачем нужен этот файл
Этот документ описывает, как должна быть устроена база данных проекта **CampusReserve**, какие сущности нужны на старте, как они связаны между собой, как к ним обращаться из backend-части на Go/Gin/GORM, и как вести миграции.

Документ рассчитан на текущий этап проекта: **сначала проектирование и согласование структуры**, затем реализация моделей, миграций и API.

---

## Текущий контекст проекта
По README проекта стек сейчас определён так:
- Backend/API: **Go + Gin**
- DB: **PostgreSQL**
- ORM: **GORM**
- Infra: **Docker / docker-compose / Nginx**
- Frontend: **React**

Проект позиционируется как сервис бронирования аудиторий НГТУ, где студенты и преподаватели могут смотреть занятость аудиторий и бронировать свободные помещения.

На текущий момент раздел `db/` в репозитории практически пустой, поэтому именно здесь удобно положить документацию по схеме БД и будущим миграциям.

---

## Что должна решать база данных
Минимальный функционал БД:
1. Хранить пользователей системы.
2. Хранить корпуса и аудитории.
3. Хранить характеристики аудиторий (вместимость, этаж, тип, оборудование).
4. Хранить интервалы занятости аудиторий.
5. Хранить бронирования и их статусы.
6. Позволять быстро проверять, свободна ли аудитория в заданный интервал.
7. Давать основу для будущего API, модерации и импорта расписания.

---

## Предлагаемая структура папки `db/`
```text
/db
  README.md                 # этот документ
  /migrations               # versioned SQL-миграции
    000001_init.up.sql
    000001_init.down.sql
    000002_add_indexes.up.sql
    000002_add_indexes.down.sql
  /docs
    erd.md                  # ER-описание сущностей
    api-db-contract.md      # как API работает с БД
```

Если хотите оставить всё компактно, на первом этапе достаточно одного `db/README.md` и папки `db/migrations/`.

---

## Основные сущности

### 1) users
Пользователи системы: студенты, преподаватели, администраторы.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| full_name | TEXT | ФИО |
| email | TEXT UNIQUE | Университетская почта / логин |
| password_hash | TEXT NULL | Если будет локальная авторизация |
| role | TEXT | `student`, `teacher`, `admin` |
| group_name | TEXT NULL | Учебная группа для студентов |
| department | TEXT NULL | Кафедра / подразделение |
| is_active | BOOLEAN | Активен ли пользователь |
| created_at | TIMESTAMP | Создан |
| updated_at | TIMESTAMP | Обновлён |
| deleted_at | TIMESTAMP NULL | Мягкое удаление при необходимости |

**Комментарий:**
- Если авторизация будет через внешнюю систему, `password_hash` можно убрать.
- `role` лучше ограничить CHECK-constraint или enum-логикой приложения.

---

### 2) buildings
Корпуса / здания.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| code | TEXT UNIQUE | Короткий код, например `7k` |
| name | TEXT | Название корпуса |
| address | TEXT NULL | Адрес |
| description | TEXT NULL | Комментарий |
| created_at | TIMESTAMP | Создан |
| updated_at | TIMESTAMP | Обновлён |

---

### 3) rooms
Аудитории.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| building_id | FK -> buildings.id | Корпус |
| room_number | TEXT | Номер аудитории |
| name | TEXT NULL | Человекочитаемое название |
| floor | INT NULL | Этаж |
| capacity | INT | Вместимость |
| room_type | TEXT | `lecture`, `practice`, `lab`, `coworking`, `meeting` |
| description | TEXT NULL | Описание |
| is_active | BOOLEAN | Доступна ли аудитория |
| created_at | TIMESTAMP | Создана |
| updated_at | TIMESTAMP | Обновлена |

**Ограничения:**
- Уникальность: `(building_id, room_number)`.
- `capacity >= 0`.

---

### 4) equipment
Справочник оборудования.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| code | TEXT UNIQUE | Код оборудования |
| name | TEXT | Название |
| description | TEXT NULL | Описание |

Примеры: `projector`, `pc`, `board`, `mic`, `lab-kit`.

---

### 5) room_equipment
Связка many-to-many между аудиториями и оборудованием.

| Поле | Тип | Назначение |
|---|---|---|
| room_id | FK -> rooms.id | Аудитория |
| equipment_id | FK -> equipment.id | Оборудование |
| quantity | INT | Количество |

**PK:** составной `(room_id, equipment_id)`.

---

### 6) room_unavailabilities
Промежутки, когда аудитория недоступна не из-за пользовательской заявки.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| room_id | FK -> rooms.id | Аудитория |
| starts_at | TIMESTAMP | Начало блокировки |
| ends_at | TIMESTAMP | Конец блокировки |
| reason | TEXT | Причина |
| source | TEXT | `manual`, `schedule_import`, `maintenance` |
| created_by | FK -> users.id NULL | Кто внёс блокировку |
| created_at | TIMESTAMP | Создано |

**Зачем нужна таблица:**
Она отделяет «обычную занятость по расписанию / техработам» от пользовательских бронирований. Это сильно упрощает логику доступности аудитории.

---

### 7) bookings
Основная таблица бронирований.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| room_id | FK -> rooms.id | Какая аудитория |
| user_id | FK -> users.id | Кто создал заявку |
| title | TEXT | Название мероприятия |
| description | TEXT NULL | Описание |
| starts_at | TIMESTAMP | Начало |
| ends_at | TIMESTAMP | Конец |
| attendees_count | INT NULL | Ожидаемое число участников |
| status | TEXT | `pending`, `approved`, `rejected`, `cancelled`, `completed` |
| rejection_reason | TEXT NULL | Причина отказа |
| approved_by | FK -> users.id NULL | Кто одобрил |
| approved_at | TIMESTAMP NULL | Когда одобрил |
| created_at | TIMESTAMP | Создано |
| updated_at | TIMESTAMP | Обновлено |

**Главные правила:**
- `starts_at < ends_at`
- запрещать бронирование в прошлом на уровне API
- нельзя создавать пересекающиеся `approved`-бронирования для одной аудитории
- при необходимости также запрещать пересечение `pending` между собой, если хотите более строгую механику

---

### 8) booking_status_history
История изменения статусов бронирования.

| Поле | Тип | Назначение |
|---|---|---|
| id | UUID / BIGSERIAL | Первичный ключ |
| booking_id | FK -> bookings.id | Бронирование |
| old_status | TEXT NULL | Старый статус |
| new_status | TEXT | Новый статус |
| changed_by | FK -> users.id NULL | Кто изменил |
| comment | TEXT NULL | Комментарий |
| created_at | TIMESTAMP | Когда изменили |

Эта таблица пригодится для аудита и для админки.

---

## Связи между сущностями
```text
buildings 1 --- N rooms
rooms N --- M equipment       (через room_equipment)
rooms 1 --- N room_unavailabilities
users 1 --- N bookings
rooms 1 --- N bookings
bookings 1 --- N booking_status_history
users 1 --- N booking_status_history
users 1 --- N room_unavailabilities (created_by)
```

---

## Минимальная ER-логика в человеческом виде
1. Пользователь входит в систему.
2. Выбирает корпус.
3. Видит список аудиторий.
4. Для аудитории можно запросить доступность по интервалу времени.
5. Если аудитория не занята ни в `bookings`, ни в `room_unavailabilities`, создаётся новая запись в `bookings`.
6. Администратор может подтвердить или отклонить заявку.
7. Любое изменение статуса логируется в `booking_status_history`.

---

## Как определять доступность аудитории
Аудитория считается свободной, если:
- нет пересечения с подтверждёнными бронированиями (`bookings.status = approved`)
- нет пересечения с блокировками в `room_unavailabilities`

### Условие пересечения интервалов
Для диапазонов `A[start1, end1)` и `B[start2, end2)` пересечение есть, если:
```sql
start1 < end2 AND end1 > start2
```

Это условие стоит использовать во всех SQL-запросах и сервисной логике.

---

## Какие индексы нужны обязательно

### Для `rooms`
- `UNIQUE (building_id, room_number)`
- индекс по `building_id`
- индекс по `room_type`

### Для `bookings`
- индекс по `room_id`
- индекс по `user_id`
- индекс по `status`
- составной индекс `(room_id, starts_at, ends_at)`

### Для `room_unavailabilities`
- индекс по `room_id`
- составной индекс `(room_id, starts_at, ends_at)`

### Для `users`
- `UNIQUE (email)`
- индекс по `role`

---

## Что лучше выбрать: UUID или BIGSERIAL

### Вариант 1 — BIGSERIAL
Плюсы:
- проще читать и дебажить
- быстрее и компактнее
- проще на раннем этапе

### Вариант 2 — UUID
Плюсы:
- удобнее для внешних API
- сложнее угадывать id
- лучше подходит для распределённых систем

### Рекомендация для этого проекта
Если проект учебный/командный и важна простота — можно начать с **BIGSERIAL**.
Если хотите сразу более «production-like» подход — берите **UUID**.

Главное: выбрать один подход и использовать его везде консистентно.

---

## Рекомендация по миграциям
Для этого проекта лучше вести **versioned SQL migrations**, а не полагаться только на `AutoMigrate`.

### Почему
- миграции становятся воспроизводимыми
- схема контролируется в git
- проще ревьюить изменения
- безопаснее для прод-среды

### Важно про GORM
GORM `AutoMigrate` умеет создавать таблицы, недостающие внешние ключи, constraints, колонки и индексы, а также менять некоторые существующие столбцы, но **не удаляет неиспользуемые колонки**, чтобы не потерять данные. Поэтому использовать только `AutoMigrate` как полноценную систему миграций рискованно.

### Практика
- `AutoMigrate` можно оставить для локальных экспериментов или smoke-check
- основная схема должна жить в SQL-миграциях
- модели GORM должны соответствовать уже описанной SQL-схеме

---

## Предлагаемый стартовый SQL-скелет
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  group_name TEXT,
  department TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP NULL
);

CREATE TABLE buildings (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  address TEXT,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE rooms (
  id BIGSERIAL PRIMARY KEY,
  building_id BIGINT NOT NULL REFERENCES buildings(id) ON DELETE RESTRICT,
  room_number TEXT NOT NULL,
  name TEXT,
  floor INT,
  capacity INT NOT NULL DEFAULT 0 CHECK (capacity >= 0),
  room_type TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (building_id, room_number)
);

CREATE TABLE equipment (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE room_equipment (
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  equipment_id BIGINT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  PRIMARY KEY (room_id, equipment_id)
);

CREATE TABLE room_unavailabilities (
  id BIGSERIAL PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  reason TEXT NOT NULL,
  source TEXT NOT NULL,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (starts_at < ends_at)
);

CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  description TEXT,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  attendees_count INT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled', 'completed')),
  rejection_reason TEXT,
  approved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (starts_at < ends_at)
);

CREATE TABLE booking_status_history (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rooms_building_id ON rooms(building_id);
CREATE INDEX idx_rooms_room_type ON rooms(room_type);
CREATE INDEX idx_bookings_room_time ON bookings(room_id, starts_at, ends_at);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_unavailabilities_room_time ON room_unavailabilities(room_id, starts_at, ends_at);
CREATE INDEX idx_users_role ON users(role);
```

---

## Как backend должен работать с БД

### Слой 1 — models
Go-структуры, отражающие таблицы.

Примерно так:
- `User`
- `Building`
- `Room`
- `Equipment`
- `RoomEquipment`
- `RoomUnavailability`
- `Booking`
- `BookingStatusHistory`

### Слой 2 — repository
Репозиторный слой делает только работу с БД:
- получить комнаты по корпусу
- получить комнату по id
- проверить конфликты бронирования
- создать booking
- обновить статус booking

### Слой 3 — service
Бизнес-логика:
- можно ли бронировать это время
- кто может подтверждать заявки
- как переводить статусы
- что делать при отмене

### Слой 4 — handler/API
HTTP-слой:
- валидирует входные данные
- вызывает service
- возвращает JSON

---

## Минимальный набор API-методов, который прямо опирается на эту БД

### Справочники
- `GET /buildings`
- `GET /buildings/{id}/rooms`
- `GET /rooms/{id}`
- `GET /rooms/{id}/availability?from=...&to=...`

### Бронирование
- `POST /bookings`
- `GET /bookings/{id}`
- `GET /bookings/my`
- `PATCH /bookings/{id}/cancel`

### Админка / модерация
- `GET /admin/bookings?status=pending`
- `PATCH /admin/bookings/{id}/approve`
- `PATCH /admin/bookings/{id}/reject`
- `POST /admin/rooms/{id}/unavailability`

---

## Бизнес-правила, которые стоит зафиксировать сразу
1. Нельзя бронировать аудиторию на нулевой или отрицательный интервал.
2. Нельзя бронировать неактивную аудиторию.
3. Нельзя подтверждать бронирование, если есть пересечение с уже подтверждённым бронированием.
4. Нельзя подтверждать бронирование, если есть пересечение с `room_unavailabilities`.
5. Только администратор может подтверждать и отклонять заявки.
6. Создатель бронирования может отменить свою заявку.
7. История смены статуса должна записываться всегда.

---

## Что можно реализовать сразу после согласования этого файла
1. Создать `db/README.md` в репозитории.
2. Создать папку `db/migrations/`.
3. Написать первую миграцию `000001_init.up.sql` и `000001_init.down.sql`.
4. Добавить GORM-модели в backend.
5. Поднять подключение к PostgreSQL.
6. Реализовать методы проверки доступности аудитории.
7. После этого уже синхронизироваться с Димой по API.

---

## Что обсудить с Димой до начала API
1. Будет ли модерация бронирования или подтверждение автоматически.
2. Нужна ли регистрация по паролю или только университетская авторизация.
3. Нужна ли привязка к учебным группам/кафедрам обязательно.
4. Нужно ли хранить регулярное расписание пар отдельно или пока достаточно `room_unavailabilities`.
5. Какой формат id берём: `BIGSERIAL` или `UUID`.

---

## Готовая короткая формулировка твоей зоны ответственности
> Моя текущая задача — описать и согласовать схему базы данных: сущности, поля, связи, ограничения, индексы и правила обращения к БД. После согласования структуры я помогаю с миграциями и синхронизируюсь с backend/API частью.

---

## Что можно положить в PR
### Ветка
`docs/db-architecture`

### Коммит
`docs: добавить план структуры базы данных и правила миграций`

### Состав PR
- `db/README.md`
- при желании `db/migrations/.gitkeep`
- при желании `db/docs/erd.md`

---

## Источники
- README проекта: стек, назначение проекта и структура репозитория.
- CONTRIBUTING: правила ветвления и оформления PR.
- Документация GORM: базовые поля моделей, ассоциации и ограничения `AutoMigrate`.
