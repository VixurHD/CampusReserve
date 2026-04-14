import React, { useState } from 'react';

const FilterBar = ({ onSearch, onBuildingChange, onDateChange, onCapacityChange, onTypeChange }) => {
  const [activeType, setActiveType] = useState('Все');
  
  const typeTags = ['Все', '🎓 Аудитории', '📢 Поточные залы', '💻 Компьютерные', '🤝 Переговорные', '🔬 Лаборатории', '✅ Только свободные'];
  
  const handleTypeClick = (type) => {
    setActiveType(type);
    onTypeChange(type);
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar-inner">
        <div>
          <div className="filter-label">Поиск</div>
          <input 
            className="filter-input" 
            type="text" 
            placeholder="Номер аудитории или название..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div>
          <div className="filter-label">Корпус</div>
          <select className="filter-select" onChange={(e) => onBuildingChange(e.target.value)}>
            <option>Все корпуса</option>
            <option>Корпус А</option>
            <option>Корпус Б</option>
            <option>Корпус В</option>
            <option>Корпус Г</option>
          </select>
        </div>
        <div>
          <div className="filter-label">Дата</div>
          <input 
            className="filter-input" 
            type="date" 
            defaultValue="2026-03-26"
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div>
          <div className="filter-label">Вместимость</div>
          <select className="filter-select" onChange={(e) => onCapacityChange(e.target.value)}>
            <option>Любая</option>
            <option>до 30 чел.</option>
            <option>30–100 чел.</option>
            <option>более 100 чел.</option>
          </select>
        </div>
        <div>
          <button className="btn btn-red" style={{ height: '40px', whiteSpace: 'nowrap' }}>
            🔍 Найти
          </button>
        </div>
      </div>
      <div className="filter-tags">
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', alignSelf: 'center' }}>
          Тип:
        </span>
        {typeTags.map((type) => (
          <div 
            key={type}
            className={`filter-tag ${activeType === type ? 'active' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;