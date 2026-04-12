import React, { Component } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Hero from './Hero';
import FilterBar from './FilterBar';
import RoomsGrid from './RoomsGrid';
import Pagination from '../../components/Pagination';

export default class Catalog extends Component {
  state = {
    rooms: [
      {
        id: 1,
        number: 'А-101',
        name: 'Учебная аудитория · Корпус А, 1 этаж',
        icon: '🎓',
        status: 'green',
        specs: ['👥 30 мест', '📽 Проектор', '🖥 Доска'],
        slots: 'Свободна с <strong>12:00</strong> до <strong>18:00</strong>',
        buttonText: 'Забронировать',
        buttonVariant: 'btn-green',
        building: 'Корпус А',
        capacity: 30,
        type: '🎓 Аудитории'
      },
      {
        id: 2,
        number: 'А-210',
        name: 'Поточный зал · Корпус А, 2 этаж',
        icon: '📢',
        status: 'red',
        specs: ['👥 150 мест', '🎙 Микрофон', '📽 Проектор'],
        slots: 'Освободится в <strong>14:30</strong>',
        buttonText: 'Подробнее',
        buttonVariant: 'btn-grey',
        building: 'Корпус А',
        capacity: 150,
        type: '📢 Поточные залы'
      },
      {
        id: 3,
        number: 'Б-305',
        name: 'Компьютерный класс · Корпус Б, 3 этаж',
        icon: '💻',
        status: 'green',
        specs: ['👥 25 мест', '🖥 25 ПК', '🌐 Интернет'],
        slots: 'Свободна <strong>весь день</strong>',
        buttonText: 'Забронировать',
        buttonVariant: 'btn-green',
        building: 'Корпус Б',
        capacity: 25,
        type: '💻 Компьютерные'
      },
      {
        id: 4,
        number: 'В-118',
        name: 'Переговорная · Корпус В, 1 этаж',
        icon: '🤝',
        status: 'orange',
        specs: ['👥 12 мест', '📺 Экран', '☕ Зона кофе'],
        slots: 'Освободится через <strong>20 мин</strong>',
        buttonText: '🔔 Уведомить',
        buttonVariant: 'btn-outline',
        building: 'Корпус В',
        capacity: 12,
        type: '🤝 Переговорные'
      },
      {
        id: 5,
        number: 'Г-204',
        name: 'Учебная аудитория · Корпус Г, 2 этаж',
        icon: '🎓',
        status: 'green',
        specs: ['👥 45 мест', '📽 Проектор', '♿ Доступна'],
        slots: 'Свободна с <strong>10:00</strong>',
        buttonText: 'Забронировать',
        buttonVariant: 'btn-green',
        building: 'Корпус Г',
        capacity: 45,
        type: '🎓 Аудитории'
      },
      {
        id: 6,
        number: 'А-402',
        name: 'Лаборатория · Корпус А, 4 этаж',
        icon: '🔬',
        status: 'red',
        specs: ['👥 20 мест', '🔬 Оборудование', '🧪 Спец. зона'],
        slots: 'Занята <strong>до 17:00</strong>',
        buttonText: 'Подробнее',
        buttonVariant: 'btn-grey',
        building: 'Корпус А',
        capacity: 20,
        type: '🔬 Лаборатории'
      }
    ],
    filteredRooms: [],
    searchText: '',
    selectedBuilding: 'Все корпуса',
    selectedDate: '2026-03-26',
    selectedCapacity: 'Любая',
    selectedType: 'Все',
    currentPage: 1,
    itemsPerPage: 6,
    viewMode: 'grid', // 'grid' or 'list'
    sortBy: 'По номеру ↑'
  };

  componentDidMount() {
    this.applyFilters();
  }

  applyFilters = () => {
    let filtered = [...this.state.rooms];

    // Фильтр по поиску
    if (this.state.searchText) {
      filtered = filtered.filter(room => 
        room.number.toLowerCase().includes(this.state.searchText.toLowerCase()) ||
        room.name.toLowerCase().includes(this.state.searchText.toLowerCase())
      );
    }

    // Фильтр по корпусу
    if (this.state.selectedBuilding !== 'Все корпуса') {
      filtered = filtered.filter(room => room.building === this.state.selectedBuilding);
    }

    // Фильтр по вместимости
    if (this.state.selectedCapacity !== 'Любая') {
      if (this.state.selectedCapacity === 'до 30 чел.') {
        filtered = filtered.filter(room => room.capacity <= 30);
      } else if (this.state.selectedCapacity === '30–100 чел.') {
        filtered = filtered.filter(room => room.capacity >= 30 && room.capacity <= 100);
      } else if (this.state.selectedCapacity === 'более 100 чел.') {
        filtered = filtered.filter(room => room.capacity > 100);
      }
    }

    // Фильтр по типу
    if (this.state.selectedType !== 'Все' && this.state.selectedType !== '✅ Только свободные') {
      filtered = filtered.filter(room => room.type === this.state.selectedType);
    }

    // Фильтр "Только свободные"
    if (this.state.selectedType === '✅ Только свободные') {
      filtered = filtered.filter(room => room.status === 'green');
    }

    // Сортировка
    switch(this.state.sortBy) {
      case 'По вместимости':
        filtered.sort((a, b) => a.capacity - b.capacity);
        break;
      case 'Сначала свободные':
        filtered.sort((a, b) => {
          if (a.status === 'green' && b.status !== 'green') return -1;
          if (a.status !== 'green' && b.status === 'green') return 1;
          return 0;
        });
        break;
      case 'По корпусу':
        filtered.sort((a, b) => a.building.localeCompare(b.building));
        break;
      default: // По номеру
        filtered.sort((a, b) => a.number.localeCompare(b.number));
    }

    this.setState({ filteredRooms: filtered, currentPage: 1 });
  };

  handleSearch = (text) => {
    this.setState({ searchText: text }, () => this.applyFilters());
  };

  handleBuildingChange = (building) => {
    this.setState({ selectedBuilding: building }, () => this.applyFilters());
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date }, () => this.applyFilters());
  };

  handleCapacityChange = (capacity) => {
    this.setState({ selectedCapacity: capacity }, () => this.applyFilters());
  };

  handleTypeChange = (type) => {
    this.setState({ selectedType: type }, () => this.applyFilters());
  };

  handleSortChange = (sortBy) => {
    this.setState({ sortBy }, () => this.applyFilters());
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleViewChange = (mode) => {
    this.setState({ viewMode: mode });
  };

  getCurrentRooms = () => {
    const { currentPage, itemsPerPage, filteredRooms } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRooms.slice(startIndex, startIndex + itemsPerPage);
  };

  getTotalPages = () => {
    return Math.ceil(this.state.filteredRooms.length / this.state.itemsPerPage);
  };

  getFreeCount = () => {
    return this.state.filteredRooms.filter(room => room.status === 'green').length;
  };

  render() {
    const { filteredRooms, viewMode, sortBy, currentPage } = this.state;
    const currentRooms = this.getCurrentRooms();
    const totalPages = this.getTotalPages();
    const freeCount = this.getFreeCount();

    return (
      <>
        <Header />
        
        <div className="breadcrumb">
          <div className="breadcrumb-inner">
            <a href="#">НГТУ</a> <span>›</span>
            <a href="/">Кампус-Бронь</a> <span>›</span>
            Каталог аудиторий
          </div>
        </div>

        <Hero freeCount={freeCount} totalCount={filteredRooms.length} buildingsCount={4} />

        <main>
          <div className="container section">
            <FilterBar 
              onSearch={this.handleSearch}
              onBuildingChange={this.handleBuildingChange}
              onDateChange={this.handleDateChange}
              onCapacityChange={this.handleCapacityChange}
              onTypeChange={this.handleTypeChange}
            />

            <div className="results-meta">
              <div className="results-count">
                Найдено: <strong>{filteredRooms.length} аудиторий</strong>, 
                из них свободно сейчас: <strong style={{ color: 'var(--green-light)' }}>{freeCount}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <select 
                  className="sort-select" 
                  value={sortBy}
                  onChange={(e) => this.handleSortChange(e.target.value)}
                >
                  <option>По номеру ↑</option>
                  <option>По вместимости</option>
                  <option>Сначала свободные</option>
                  <option>По корпусу</option>
                </select>
                <div className="view-toggle">
                  <div 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                    onClick={() => this.handleViewChange('grid')}
                    title="Сетка"
                  >
                    ▦
                  </div>
                  <div 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
                    onClick={() => this.handleViewChange('list')}
                    title="Список"
                  >
                    ☰
                  </div>
                </div>
              </div>
            </div>

            <RoomsGrid rooms={currentRooms} />

            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            )}
          </div>
        </main>

        <Footer />
      </>
    );
  }
}