import React from 'react';

const RoomSchedule = ({ schedule }) => {
  const getTypeClass = (type) => {
    switch(type) {
      case 'free': return 'tl-free';
      case 'busy': return 'tl-busy';
      case 'mine': return 'tl-mine';
      default: return 'tl-free';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'free': return 'Свободно';
      case 'busy': return 'Занято';
      case 'mine': return 'Моя бронь';
      default: return 'Свободно';
    }
  };

  // Функция для расчёта flex веса на основе времени
  const getFlexWeight = (start, end) => {
    const toHours = (time) => {
      const [hour, minute] = time.split(':').map(Number);
      return hour + minute / 60;
    };
    return toHours(end) - toHours(start);
  };

  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="info-section">
      <div className="info-section-header">
        <span>📅</span>
        <h3>Расписание на сегодня — {today}</h3>
      </div>
      <div className="info-section-body">
        <div className="schedule-day">Сегодня</div>
        <div className="timeline">
          {schedule.today.map((slot, index) => (
            <div 
              key={index}
              className={`tl-slot ${getTypeClass(slot.type)}`}
              style={{ flex: getFlexWeight(slot.start, slot.end) }}
              title={`${slot.start}–${slot.end} (${getTypeLabel(slot.type)})`}
            >
              {slot.start}–{slot.end}
            </div>
          ))}
        </div>
        <div className="tl-labels">
          <span>8:00</span><span>10:00</span><span>12:00</span><span>15:00</span><span>17:00</span><span>18:00</span>
        </div>
        <div className="tl-legend">
          <div className="tl-legend-item"><div className="tl-legend-dot" style={{ background: '#C8EAB8' }}></div> Свободно</div>
          <div className="tl-legend-item"><div className="tl-legend-dot" style={{ background: '#F9D6D7' }}></div> Занято</div>
          <div className="tl-legend-item"><div className="tl-legend-dot" style={{ background: '#C0D6F5' }}></div> Моя бронь</div>
        </div>

        <div className="schedule-day" style={{ marginTop: '16px' }}>Завтра — {tomorrow}</div>
        <div className="timeline">
          {schedule.tomorrow.map((slot, index) => (
            <div 
              key={index}
              className={`tl-slot ${getTypeClass(slot.type)}`}
              style={{ flex: getFlexWeight(slot.start, slot.end) }}
            >
              {slot.start === '8:00' && slot.end === '20:00' ? 'Свободна весь день' : `${slot.start}–${slot.end}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSchedule;