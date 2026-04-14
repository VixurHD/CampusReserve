import React from 'react';
import { Link } from 'react-router-dom';

const SuccessModal = ({ isOpen, onClose, room, date, timeSlot, endTime }) => {
  if (!isOpen) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="success-overlay show" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <span className="success-icon">🎉</span>
        <h2>Аудитория забронирована!</h2>
        <p>
          {room.number} зарезервирована для вас на <strong>{formatDate(date)}, {timeSlot}–{endTime}</strong>. 
          Подтверждение отправлено на почту университета.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/profile" className="btn btn-green">Мои брони</Link>
          <Link to="/" className="btn btn-outline">На главную</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;