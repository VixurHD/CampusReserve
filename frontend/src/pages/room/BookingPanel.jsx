import React from 'react';
import { Link } from 'react-router-dom';

const BookingPanel = ({ 
  room, 
  selectedDate, 
  selectedStart, 
  selectedEnd, 
  purpose, 
  comment, 
  duration,
  onDateChange, 
  onStartChange, 
  onEndChange, 
  onPurposeChange, 
  onCommentChange 
}) => {
  // Генерация доступных временных слотов
  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const purposes = ['Учебное занятие', 'Самостоятельная работа', 'Встреча группы', 'Мероприятие'];

  // Фильтрация концов (чтобы конец был позже начала)
  const availableEnds = timeSlots.filter(slot => slot > selectedStart);

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <h3>Забронировать {room.number}</h3>
        <p>Укажите дату и время</p>
      </div>
      <div className="booking-card-body">
        <div className="form-group">
          <label className="form-label">Дата</label>
          <input 
            type="date" 
            className="form-input" 
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Начало</label>
            <select className="form-select" value={selectedStart} onChange={(e) => onStartChange(e.target.value)}>
              {timeSlots.map(slot => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Конец</label>
            <select className="form-select" value={selectedEnd} onChange={(e) => onEndChange(e.target.value)}>
              {availableEnds.map(slot => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Цель использования</label>
          <select className="form-select" value={purpose} onChange={(e) => onPurposeChange(e.target.value)}>
            {purposes.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Комментарий (необязательно)</label>
          <textarea 
            className="form-input" 
            style={{ resize: 'vertical', minHeight: '70px', fontFamily: 'inherit' }}
            placeholder="Например: нужен микрофон, будет 28 человек..."
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
        </div>

        <div style={{ background: '#EDF2E8', borderRadius: '4px', padding: '12px', marginBottom: '16px' }}>
          <div className="price-row" style={{ padding: '4px 0', border: 'none' }}>
            <span className="price-label">Продолжительность</span>
            <span className="price-value">{duration}</span>
          </div>
          <div className="price-row" style={{ padding: '4px 0', border: 'none' }}>
            <span className="price-label">Аудитория</span>
            <span className="price-value">{room.number}</span>
          </div>
          <div className="price-row" style={{ padding: '4px 0', border: 'none' }}>
            <span className="price-label">Стоимость</span>
            <span className="price-value text-green">Бесплатно</span>
          </div>
        </div>

        <Link 
          to={`/booking/${room.id}`} 
          state={{ room, selectedDate, selectedStart, selectedEnd, purpose, comment, duration }}
          className="btn btn-red confirm-btn" 
          style={{ justifyContent: 'center' }}
        >
          Подтвердить бронирование →
        </Link>
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
          Вы можете отменить бронь за 15 минут до начала
        </p>
      </div>
    </div>
  );
};

export default BookingPanel;