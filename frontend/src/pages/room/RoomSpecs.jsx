import React from 'react';

const RoomSpecs = ({ room }) => {
  const specsList = [
    { icon: '👥', label: 'Вместимость', value: `${room.capacity} человек` },
    { icon: '🏛', label: 'Расположение', value: `${room.building}, ${room.floor}` },
    { icon: '📽', label: 'Проектор', value: room.specs.projector },
    { icon: '🖥', label: 'Доска', value: room.specs.board },
    { icon: '📡', label: 'Wi-Fi', value: room.specs.wifi },
    { icon: '♿', label: 'Доступность', value: room.specs.accessibility }
  ];

  return (
    <div className="info-section">
      <div className="info-section-header">
        <span>📋</span>
        <h3>Характеристики</h3>
      </div>
      <div className="info-section-body">
        <div className="specs-grid">
          {specsList.map((spec, index) => (
            <div key={index} className="spec-item">
              <div className="spec-icon">{spec.icon}</div>
              <div>
                <div className="spec-label">{spec.label}</div>
                <div className="spec-value">{spec.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSpecs;