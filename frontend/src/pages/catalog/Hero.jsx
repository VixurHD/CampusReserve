import React from 'react';

const Hero = ({ freeCount = 14, totalCount = 45, buildingsCount = 4 }) => {
  return (
    <div className="hero">
      <div className="hero-inner">
        
        <h1>Каталог аудиторий</h1>
        <p>
          Найдите свободное пространство и забронируйте его в три клика — 
          без беготни по корпусам.
        </p>
        <div className="hero-stats">
          <span>🟢 Сейчас свободно: <strong>{freeCount} аудиторий</strong></span>
          <span>🔴 Занято: <strong>{totalCount - freeCount}</strong></span>
          <span>🏛 Корпусов: <strong>{buildingsCount}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default Hero;