import React from 'react';
import RoomCard from './RoomCard';

const RoomsGrid = ({ rooms }) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Аудиторий не найдено. Попробуйте изменить параметры фильтрации.</p>
      </div>
    );
  }

  return (
    <div className="rooms-grid">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomsGrid;