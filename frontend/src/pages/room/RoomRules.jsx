import React from 'react';

const RoomRules = () => {
  const rules = [
    'Бронирование возможно не менее чем за 30 минут до начала',
    'Максимальный срок бронирования — 4 часа подряд',
    'Отмена без последствий — за 15 минут до начала',
    'Аудитория автоматически освобождается, если не отмечен вход в течение 15 минут',
    'При систематическом неиспользовании — временная блокировка брони'
  ];

  return (
    <div className="info-section">
      <div className="info-section-header">
        <span>📌</span>
        <h3>Правила использования</h3>
      </div>
      <div className="info-section-body">
        <ul className="rules-list">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomRules;