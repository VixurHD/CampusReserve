import React from 'react';

const RoomPreview = ({ room }) => {
  return (
    <div className="room-preview">
      {room.icon}
      <div className="room-preview-badge">
        <span className="badge badge-green">● {room.status === 'free' ? 'Свободна сейчас' : 'Занята сейчас'}</span>
      </div>
    </div>
  );
};

export default RoomPreview;