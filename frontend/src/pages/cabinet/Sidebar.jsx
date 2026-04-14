import React from 'react';

const Sidebar = ({ activeTab, onTabChange, notificationsCount = 0 }) => {
  const menuItems = [
    { id: 'bookings', label: 'Мои брони', icon: '📋', count: 2 },
    { id: 'notifications', label: 'Уведомления', icon: '🔔', count: notificationsCount },
    { id: 'history', label: 'История', icon: '📅', count: null },
    { id: 'settings', label: 'Настройки', icon: '⚙️', count: null },
    { id: 'accessibility', label: 'Доступность', icon: '♿', count: null },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={activeTab === item.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(item.id);
            }}
          >
            {item.icon} {item.label}
            {item.count !== null && (
              <span className="nav-count">{item.count}</span>
            )}
          </a>
        ))}
        <a href="#" style={{ color: 'var(--red)' }}>← Выйти</a>
      </div>
    </div>
  );
};

export default Sidebar;