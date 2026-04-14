import React from 'react';

const StatsRow = ({ upcoming, completed, notifications }) => {
  const stats = [
    { icon: '📅', value: upcoming, label: 'Предстоящих', bgClass: 'stat-card-icon-green' },
    { icon: '✓', value: completed, label: 'Завершённых', bgClass: 'stat-card-icon-grey' },
    { icon: '🔔', value: notifications, label: 'Новых уведомлений', bgClass: 'stat-card-icon-red' },
  ];

  return (
    <div className="stats-row">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className={`stat-card-icon ${stat.bgClass}`}>{stat.icon}</div>
          <div>
            <span className="stat-card-num">{stat.value}</span>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;