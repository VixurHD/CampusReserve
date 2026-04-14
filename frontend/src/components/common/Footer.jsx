import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>Кампус-Бронь</h4>
          <p>Система бронирования учебных аудиторий и поточных залов Новосибирского государственного технического университета НЭТИ. Проект команды «1».</p>
        </div>
        <div className="footer-col">
          <h4>Контакты</h4>
          <p>📞 +7 (383) 346-12-34</p>
          <p>✉ campus@nstu.ru</p>
        </div>
        <div className="footer-col">
          <h4>Часы работы</h4>
          <p>Пн-Пт: 8:00 - 20:00</p>
          <p>Сб: 9:00 - 15:00</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;