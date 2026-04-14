import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default class Booking extends Component {
  state = {
    room: {
      id: 1,
      number: '1-101',
      name: 'Учебная аудитория',
      building: 'Корпус 1',
      floor: '1 этаж',
      capacity: 30,
      icon: '🎓'
    },
    selectedDate: '2026-03-26',
    selectedTime: '12:00',
    duration: '1 час',
    purpose: 'Учебное занятие',
    peopleCount: '',
    discipline: '',
    equipment: {
      projector: true,
      microphone: false,
      flipchart: false,
      extender: false
    },
    comment: '',
    showSuccess: false
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleTimeSelect = (time) => {
    this.setState({ selectedTime: time });
  };

  handleDurationSelect = (duration) => {
    this.setState({ duration });
  };

  handlePurposeChange = (purpose) => {
    this.setState({ purpose });
  };

  handlePeopleCountChange = (e) => {
    this.setState({ peopleCount: e.target.value });
  };

  handleDisciplineChange = (e) => {
    this.setState({ discipline: e.target.value });
  };

  handleEquipmentChange = (type) => {
    this.setState(prev => ({
      equipment: {
        ...prev.equipment,
        [type]: !prev.equipment[type]
      }
    }));
  };

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = () => {
    this.setState({ showSuccess: true });
    // Здесь будет API-запрос
  };

  handleCloseModal = () => {
    this.setState({ showSuccess: false });
  };

  getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  getAfterTomorrowDate = () => {
    const after = new Date();
    after.setDate(after.getDate() + 2);
    return after.toISOString().split('T')[0];
  };

  getEndTime = () => {
    const [hour, minute] = this.state.selectedTime.split(':').map(Number);
    let endHour = hour;
    
    if (this.state.duration === '30 мин') endHour = hour + 0.5;
    else if (this.state.duration === '1 час') endHour = hour + 1;
    else if (this.state.duration === '1.5 часа') endHour = hour + 1.5;
    else if (this.state.duration === '2 часа') endHour = hour + 2;
    else if (this.state.duration === '3 часа') endHour = hour + 3;
    
    const endHourInt = Math.floor(endHour);
    const endMinute = (endHour % 1) * 60;
    return `${String(endHourInt).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
  };

  formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  render() {
    const { room, selectedDate, selectedTime, duration, purpose, peopleCount, discipline, equipment, comment, showSuccess } = this.state;
    const endTime = this.getEndTime();

    // Временные слоты
    const timeSlots = [
      '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];
    
    const busySlots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30'];
    
    const durations = ['30 мин', '1 час', '1.5 часа', '2 часа', '3 часа'];
    const purposes = ['Учебное занятие', 'Самостоятельная работа', 'Групповая работа', 'Мероприятие / лекция', 'Другое'];

    const isBusy = (slot) => busySlots.includes(slot);

    return (
      <>
        <Header />
        
        <div className="breadcrumb">
          <div className="breadcrumb-inner">
            <a href="#">НГТУ</a> <span>›</span>
            <Link to="/">Кампус-Бронь</Link> <span>›</span>
            <Link to={`/room/${room.id}`}>Аудитория {room.number}</Link> <span>›</span>
            Бронирование
          </div>
        </div>

        <div className="page-title-bar">
          <div className="page-title-bar-inner">
            <div>
              <h1>Бронирование аудитории</h1>
              <p>Выберите время и подтвердите — это займёт меньше минуты</p>
            </div>
          </div>
        </div>

        <main>
          <div className="container">
            {/* STEPS BAR */}
            <div className="steps-bar" style={{ marginTop: '24px' }}>
              <div className="step-item">
                <div className="step-circle done">✓</div>
                <div className="step-info">
                  <div className="step-label">Шаг 1</div>
                  <div className="step-title done">Выбор аудитории</div>
                </div>
              </div>
              <div className="step-line done"></div>
              <div className="step-item">
                <div className="step-circle active">2</div>
                <div className="step-info">
                  <div className="step-label">Шаг 2</div>
                  <div className="step-title active">Время и детали</div>
                </div>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-circle">3</div>
                <div className="step-info">
                  <div className="step-label">Шаг 3</div>
                  <div className="step-title">Подтверждение</div>
                </div>
              </div>
            </div>

            <div className="booking-layout">
              {/* LEFT COLUMN */}
              <div>
                {/* DATE SECTION */}
                <div className="form-section">
                  <div className="form-section-header">
                    <span>📅</span>
                    <h3>Дата</h3>
                  </div>
                  <div className="form-section-body">
                    <div className="form-row">
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Выберите дату</label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={selectedDate}
                          onChange={(e) => this.handleDateChange(e.target.value)}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                        <button 
                          className={`dur-btn ${selectedDate === this.getTodayDate() ? 'selected' : ''}`}
                          onClick={() => this.handleDateChange(this.getTodayDate())}
                        >
                          Сегодня
                        </button>
                        <button 
                          className={`dur-btn ${selectedDate === this.getTomorrowDate() ? 'selected' : ''}`}
                          onClick={() => this.handleDateChange(this.getTomorrowDate())}
                        >
                          Завтра
                        </button>
                        <button 
                          className={`dur-btn ${selectedDate === this.getAfterTomorrowDate() ? 'selected' : ''}`}
                          onClick={() => this.handleDateChange(this.getAfterTomorrowDate())}
                        >
                          Послезавтра
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIME SECTION */}
                <div className="form-section">
                  <div className="form-section-header">
                    <span>🕐</span>
                    <h3>Время начала</h3>
                  </div>
                  <div className="form-section-body">
                    <div className="form-label" style={{ marginBottom: '12px' }}>
                      Доступные слоты на {this.formatDate(selectedDate)} (зелёный = свободно)
                    </div>
                    <div className="time-grid">
                      {timeSlots.map(slot => (
                        <div
                          key={slot}
                          className={`time-slot ${isBusy(slot) ? 'busy' : ''} ${selectedTime === slot && !isBusy(slot) ? 'selected' : ''}`}
                          onClick={() => !isBusy(slot) && this.handleTimeSelect(slot)}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <label className="form-label">Продолжительность</label>
                      <div className="duration-picker">
                        {durations.map(dur => (
                          <button
                            key={dur}
                            className={`dur-btn ${duration === dur ? 'selected' : ''}`}
                            onClick={() => this.handleDurationSelect(dur)}
                          >
                            {dur}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DETAILS SECTION */}
                <div className="form-section">
                  <div className="form-section-header">
                    <span>📝</span>
                    <h3>Детали</h3>
                  </div>
                  <div className="form-section-body">
                    <div className="form-group">
                      <label className="form-label">Цель использования</label>
                      <select className="form-select" value={purpose} onChange={this.handlePurposeChange}>
                        {purposes.map(p => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Ожидаемое количество людей</label>
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="напр. 15" 
                          min="1" 
                          max={room.capacity}
                          value={peopleCount}
                          onChange={this.handlePeopleCountChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Дисциплина / предмет</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="напр. Математика"
                          value={discipline}
                          onChange={this.handleDisciplineChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Нужно дополнительное оборудование?</label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={equipment.projector} onChange={() => this.handleEquipmentChange('projector')} /> Проектор
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={equipment.microphone} onChange={() => this.handleEquipmentChange('microphone')} /> Микрофон
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={equipment.flipchart} onChange={() => this.handleEquipmentChange('flipchart')} /> Флипчарт
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={equipment.extender} onChange={() => this.handleEquipmentChange('extender')} /> Удлинитель
                        </label>
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Комментарий</label>
                      <textarea 
                        className="form-input" 
                        style={{ minHeight: '80px', fontFamily: 'inherit' }}
                        placeholder="Дополнительная информация для администратора..."
                        value={comment}
                        onChange={this.handleCommentChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - SUMMARY */}
              <div>
                <div className="summary-card">
                  <div className="summary-header">
                    <h3>Ваша бронь</h3>
                  </div>
                  <div className="summary-body">
                    <div className="summary-room">
                      <div className="summary-room-icon">{room.icon}</div>
                      <div>
                        <div className="summary-room-name">{room.number}</div>
                        <div className="summary-room-sub">{room.building}, {room.floor} · {room.capacity} мест</div>
                      </div>
                    </div>
                    <div className="summary-row">
                      <span className="summary-row-label">Дата</span>
                      <span className="summary-row-value">{this.formatDate(selectedDate)}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-row-label">Время</span>
                      <span className="summary-row-value">{selectedTime} — {endTime}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-row-label">Продолжительность</span>
                      <span className="summary-row-value">{duration}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-row-label">Тип</span>
                      <span className="summary-row-value">{purpose}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-row-label">Бронирующий</span>
                      <span className="summary-row-value">Иванов И.И.</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-row-label">Стоимость</span>
                      <span className="summary-row-value text-green">Бесплатно</span>
                    </div>

                    <div className="cancel-policy">
                      ⚡ Вы можете бесплатно отменить бронь за 15 минут до начала. Никаких последствий.
                    </div>

                    <button onClick={this.handleSubmit} className="btn btn-red" style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '13px' }}>
                      ✓ Подтвердить бронирование
                    </button>
                    <Link to={`/room/${room.id}`} style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px', textDecoration: 'none' }}>
                      ← Вернуться к аудитории
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* SUCCESS MODAL */}
        {showSuccess && (
          <div className="success-overlay show" onClick={this.handleCloseModal}>
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
              <span className="success-icon">🎉</span>
              <h2>Аудитория забронирована!</h2>
              <p>
                {room.number} зарезервирована для вас на <strong>{this.formatDate(selectedDate)}, {selectedTime}–{endTime}</strong>. 
                Подтверждение отправлено на почту университета.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/profile" className="btn btn-green">Мои брони</Link>
                <Link to="/" className="btn btn-outline">На главную</Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}