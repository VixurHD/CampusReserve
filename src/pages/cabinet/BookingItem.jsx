import React from 'react';
import { Link } from 'react-router-dom';

const BookingItem = ({ booking, onCancel }) => {
  const getIconClass = () => {
    if (booking.status === 'active') return 'booking-icon-active';
    if (booking.status === 'past') return 'booking-icon-past';
    if (booking.status === 'cancelled') return 'booking-icon-cancel';
    return 'booking-icon-active';
  };

  const getBadgeClass = () => {
    if (booking.status === 'active') return 'badge-green';
    if (booking.status === 'past') return 'badge-grey';
    if (booking.status === 'cancelled') return 'badge-red';
    return 'badge-green';
  };

  const getBadgeText = () => {
    if (booking.status === 'active') return 'Подтверждена';
    if (booking.status === 'past') return 'Завершена';
    if (booking.status === 'cancelled') return 'Отменена';
    return 'Подтверждена';
  };

  return (
    <div className="booking-item">
      <div className={`booking-icon ${getIconClass()}`}>{booking.icon}</div>
      <div className="booking-meta">
        <h4>{booking.title}</h4>
        <p>{booking.location}</p>
        <div className="booking-time" style={booking.status !== 'active' ? { color: 'var(--text-muted)' } : {}}>
          ⏰ {booking.time}
        </div>
      </div>
      <div className="booking-actions">
        <span className={`badge ${getBadgeClass()}`}>{getBadgeText()}</span>
        <Link to={`/room/${booking.roomId || 1}`} className="btn btn-outline btn-sm">
          Подробнее
        </Link>
        {booking.status === 'active' && (
          <button className="btn btn-grey btn-sm" onClick={() => onCancel(booking.id)}>
            Отменить
          </button>
        )}
        {booking.status !== 'active' && (
          <Link to={`/room/${booking.roomId || 1}`} className="btn btn-grey btn-sm">
            Повторить
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookingItem;