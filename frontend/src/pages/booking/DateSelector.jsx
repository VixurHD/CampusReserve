import React from 'react';

const DateSelector = ({ date, onDateChange }) => {
  const getDateString = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <span>📅</span>
        <h3>Дата</h3>
      </div>
      <div className="form-section-body">
        <div className="form-row">
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Выберите дату</label>
            <input 
              type="date" 
              className="form-input" 
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <button 
              className={`dur-btn ${date === getDateString(0) ? 'selected' : ''}`}
              onClick={() => onDateChange(getDateString(0))}
            >
              Сегодня
            </button>
            <button 
              className={`dur-btn ${date === getDateString(1) ? 'selected' : ''}`}
              onClick={() => onDateChange(getDateString(1))}
            >
              Завтра
            </button>
            <button 
              className={`dur-btn ${date === getDateString(2) ? 'selected' : ''}`}
              onClick={() => onDateChange(getDateString(2))}
            >
              Послезавтра
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;