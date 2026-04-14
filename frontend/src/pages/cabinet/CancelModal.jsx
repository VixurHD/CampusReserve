import React from 'react';

const CancelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '6px',
          padding: '32px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>❓</div>
        <h2 style={{ fontFamily: 'PT Serif, serif', fontSize: '20px', marginBottom: '8px' }}>
          Отменить бронирование?
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Аудитория станет доступна другим пользователям. Отмена бесплатна и без последствий.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-red" onClick={onConfirm}>
            Да, отменить
          </button>
          <button className="btn btn-grey" onClick={onClose}>
            Нет, оставить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;