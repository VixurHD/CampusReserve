import React from 'react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-inner">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Логотип" className="logo-img" /> 
          Кампус-<span>Бронь</span>
        </a>
        <nav className="nav-links">
          <a href="/">Аудитории</a>
          <a href="/booking">Забронировать</a>
          <a href="/profile">Мои брони</a>
          <a href="/profile">Профиль</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;