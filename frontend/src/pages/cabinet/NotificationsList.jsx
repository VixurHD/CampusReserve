import React from 'react';

const NotificationsList = ({ notifications, onMarkAllRead }) => {
  return (
    <div className="content-card">
      <div className="content-card-header">
        <h3>Уведомления</h3>
        <button className="btn btn-grey btn-sm" onClick={onMarkAllRead}>
          Отметить все прочитанными
        </button>
      </div>
      {notifications.map((notif) => (
        <div key={notif.id} className="notif-item">
          <div className={`notif-dot ${notif.read ? 'read' : ''}`}></div>
          <div className="notif-text" dangerouslySetInnerHTML={{ __html: notif.text }} />
          <div className="notif-time">{notif.time}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;