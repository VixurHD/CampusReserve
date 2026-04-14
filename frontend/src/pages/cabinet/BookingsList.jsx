import React from 'react';
import BookingItem from './BookingItem';

const BookingsList = ({ title, bookings, badgeText, onCancel }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="content-card">
        <div className="content-card-header">
          <h3>{title}</h3>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Нет броней</h3>
          <p>У вас пока нет {title.toLowerCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-card">
      <div className="content-card-header">
        <h3>{title}</h3>
        {badgeText && <span className="badge badge-green">{badgeText}</span>}
      </div>
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingsList;