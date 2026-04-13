import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import RoomPreview from './RoomPreview';
import RoomSpecs from './RoomSpecs';
import RoomSchedule from './RoomSchedule';
import RoomRules from './RoomRules';
import BookingPanel from './BookingPanel';

export default class RoomDetail extends Component {
  state = {
    room: {
      id: 1,
      number: '1-101',
      name: 'Учебная аудитория',
      building: 'Корпус 1',
      floor: '1 этаж',
      capacity: 30,
      icon: '🎓',
      status: 'free',
      specs: {
        projector: 'Epson EB-X51',
        board: 'Маркерная + меловая',
        wifi: 'Есть (НГТУ_STUDENT)',
        accessibility: 'Полная (пандус, лифт)'
      },
      schedule: {
        today: [
          { start: '8:00', end: '10:00', type: 'free' },
          { start: '10:00', end: '12:00', type: 'busy' },
          { start: '12:00', end: '15:00', type: 'free' },
          { start: '15:00', end: '17:00', type: 'mine' },
          { start: '17:00', end: '18:00', type: 'free' }
        ],
        tomorrow: [
          { start: '8:00', end: '20:00', type: 'free' }
        ]
      }
    },
    selectedDate: '2026-03-26',
    selectedStart: '12:00',
    selectedEnd: '13:00',
    purpose: 'Учебное занятие',
    comment: ''
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleStartChange = (start) => {
    this.setState({ selectedStart: start });
  };

  handleEndChange = (end) => {
    this.setState({ selectedEnd: end });
  };

  handlePurposeChange = (purpose) => {
    this.setState({ purpose });
  };

  handleCommentChange = (comment) => {
    this.setState({ comment });
  };

  getDuration = () => {
    const [startHour, startMin] = this.state.selectedStart.split(':').map(Number);
    const [endHour, endMin] = this.state.selectedEnd.split(':').map(Number);
    const durationHours = endHour - startHour;
    const durationMins = (endMin - startMin) / 60;
    const totalHours = durationHours + durationMins;
    
    if (totalHours === 0.5) return '30 мин';
    if (totalHours === 1) return '1 час';
    if (totalHours === 1.5) return '1.5 часа';
    if (totalHours === 2) return '2 часа';
    return `${totalHours} часа`;
  };

  render() {
    const { room, selectedDate, selectedStart, selectedEnd, purpose, comment } = this.state;

    return (
      <>
        <Header />
        
        <div className="breadcrumb">
          <div className="breadcrumb-inner">
            <a href="#">НГТУ</a> <span>›</span>
            <Link to="/">Кампус-Бронь</Link> <span>›</span>
            <Link to="/">Каталог</Link> <span>›</span>
            Аудитория {room.number}
          </div>
        </div>

        <div className="page-title-bar">
          <div className="page-title-bar-inner">
            <div>
              <h1>Аудитория {room.number}</h1>
              <p>{room.name} · {room.building}, {room.floor} · Вместимость {room.capacity} мест</p>
            </div>
            <span className="badge badge-green" style={{ fontSize: '14px', padding: '6px 14px' }}>
              ● {room.status === 'free' ? 'Сейчас свободна' : 'Сейчас занята'}
            </span>
          </div>
        </div>

        <main>
          <div className="container">
            <div className="room-layout">
              
              {/* LEFT COLUMN */}
              <div>
                <RoomPreview room={room} />
                <RoomSpecs room={room} />
                <RoomSchedule schedule={room.schedule} />
                <RoomRules />
              </div>

              {/* RIGHT COLUMN */}
              <div className="booking-panel">
                {/* Карточка бронирования */}
                <BookingPanel 
                  room={room}
                  selectedDate={selectedDate}
                  selectedStart={selectedStart}
                  selectedEnd={selectedEnd}
                  purpose={purpose}
                  comment={comment}
                  duration={this.getDuration()}
                  onDateChange={this.handleDateChange}
                  onStartChange={this.handleStartChange}
                  onEndChange={this.handleEndChange}
                  onPurposeChange={this.handlePurposeChange}
                  onCommentChange={this.handleCommentChange}
                />
                
                {/* Блок уведомлений — ОТДЕЛЬНЫЙ БЛОК ПОД КАРТОЧКОЙ */}
                <div className="notify-box">
                  <p>🔔 Уведомления</p>
                  <span>Получить уведомление, когда аудитория освободится раньше?</span>
                  <div style={{ marginTop: '8px' }}>
                    <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      Подписаться на уведомления
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }
}