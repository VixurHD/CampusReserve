import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  // Определяем стиль градиента для иконки
  const getGradient = () => {
    switch(room.icon) {
      case '📢': return 'linear-gradient(135deg,#F9D6D7,#F0C0C2)';
      case '💻': return 'linear-gradient(135deg,#E8EDE3,#D5E2CE)';
      case '🤝': return 'linear-gradient(135deg,#FDEBD0,#F5D5A8)';
      case '🔬': return 'linear-gradient(135deg,#EAE8F5,#D5D0EE)';
      default: return 'linear-gradient(135deg,#E8EDE3,#D0DACA 100%)';
    }
  };

  // Определяем текст и класс бейджа
  const getBadgeInfo = () => {
    switch(room.status) {
      case 'green': return { text: '● Свободна', class: 'badge-green' };
      case 'red': return { text: '● Занята', class: 'badge-red' };
      case 'orange': return { text: '● Скоро свободна', class: 'badge-orange' };
      default: return { text: '● Свободна', class: 'badge-green' };
    }
  };
  
  const badge = getBadgeInfo();

  return (
    <div className="room-card">
      <div className="room-card-img" style={{ background: getGradient() }}>
        {room.icon}
        <div className="room-status">
          <span className={`badge ${badge.class}`}>{badge.text}</span>
        </div>
      </div>
      <div className="room-card-body">
        <div className="room-card-num">{room.number}</div>
        <div className="room-card-name">{room.name}</div>
        <div className="room-card-specs">
          {room.specs.map((spec, index) => (
            <div key={index} className="spec-chip">{spec}</div>
          ))}
        </div>
        <div className="room-card-footer">
          <div className="room-slots" dangerouslySetInnerHTML={{ __html: room.slots }} />
          <Link to={`/room/${room.id}`} className={`btn ${room.buttonVariant || 'btn-green'} btn-sm`}>
            {room.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;