import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">{user.initials}</div>
      <div className="user-name">{user.name}</div>
      <div className="user-role">{user.role}</div>
      <div className="user-stats">
        <div className="user-stat">
          <span className="user-stat-num">{user.totalBookings}</span>
          <div className="user-stat-label">Всего броней</div>
        </div>
        <div className="user-stat">
          <span className="user-stat-num" style={{ color: 'var(--green)' }}>{user.activeBookings}</span>
          <div className="user-stat-label">Активных</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;