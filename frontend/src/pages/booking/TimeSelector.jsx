import React from 'react';

const TimeSelector = ({ timeSlot, duration, onTimeChange, onDurationChange }) => {
  const timeSlots = [
    '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];
  
  const busySlots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30'];
  
  const durations = ['30 мин', '1 час', '1.5 часа', '2 часа', '3 часа'];

  const isBusy = (slot) => busySlots.includes(slot);

  return (
    <div className="form-section">
      <div className="form-section-header">
        <span>🕐</span>
        <h3>Время начала</h3>
      </div>
      <div className="form-section-body">
        <div className="form-label" style={{ marginBottom: '12px' }}>
          Доступные слоты на 26 марта (зелёный = свободно)
        </div>
        <div className="time-grid">
          {timeSlots.map(slot => (
            <div
              key={slot}
              className={`time-slot ${isBusy(slot) ? 'busy' : ''} ${timeSlot === slot && !isBusy(slot) ? 'selected' : ''}`}
              onClick={() => !isBusy(slot) && onTimeChange(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label className="form-label">Продолжительность</label>
          <div className="duration-picker">
            {durations.map(dur => (
              <button
                key={dur}
                className={`dur-btn ${duration === dur ? 'selected' : ''}`}
                onClick={() => onDurationChange(dur)}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;