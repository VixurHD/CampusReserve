import React from 'react';

const BookingSummary = ({ room, date, timeSlot, endTime, duration, purpose, onSubmit }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
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
          <span className="summary-row-value">{formatDate(date)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-row-label">Время</span>
          <span className="summary-row-value">{timeSlot} — {endTime}</span>
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

        <button onClick={onSubmit} className="btn btn-red" style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '13px' }}>
          ✓ Подтвердить бронирование
        </button>
        <a href="/" style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px', textDecoration: 'none' }}>
          ← Вернуться к аудитории
        </a>
      </div>
    </div>
  );
};

export default BookingSummary;