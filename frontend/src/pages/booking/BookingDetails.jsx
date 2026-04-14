import React from 'react';

const BookingDetails = ({
  purpose,
  peopleCount,
  discipline,
  equipment,
  comment,
  onPurposeChange,
  onPeopleCountChange,
  onDisciplineChange,
  onEquipmentChange,
  onCommentChange
}) => {
  const purposes = ['Учебное занятие', 'Самостоятельная работа', 'Групповая работа', 'Мероприятие / лекция', 'Другое'];
  const equipmentItems = [
    { key: 'projector', label: 'Проектор', defaultChecked: true },
    { key: 'microphone', label: 'Микрофон', defaultChecked: false },
    { key: 'flipchart', label: 'Флипчарт', defaultChecked: false },
    { key: 'extender', label: 'Удлинитель', defaultChecked: false }
  ];

  return (
    <div className="form-section">
      <div className="form-section-header">
        <span>📝</span>
        <h3>Детали</h3>
      </div>
      <div className="form-section-body">
        <div className="form-group">
          <label className="form-label">Цель использования</label>
          <select className="form-select" value={purpose} onChange={(e) => onPurposeChange(e.target.value)}>
            {purposes.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Ожидаемое количество людей</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="напр. 15" 
              min="1" 
              max="30"
              value={peopleCount}
              onChange={(e) => onPeopleCountChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Дисциплина / предмет</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="напр. Математика"
              value={discipline}
              onChange={(e) => onDisciplineChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Нужно дополнительное оборудование?</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {equipmentItems.map(item => (
              <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={equipment[item.key]}
                  onChange={() => onEquipmentChange(item.key)}
                /> 
                {item.label}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Комментарий</label>
          <textarea 
            className="form-input" 
            style={{ minHeight: '80px', fontFamily: 'inherit' }} 
            placeholder="Дополнительная информация для администратора..."
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;