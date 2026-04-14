import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChalkboardUser,      // аудитория 🎓
  faLaptopCode,          // компьютерный класс 💻
  faPeopleGroup,         // переговорная 🤝
  faFlask,               // лаборатория 🔬
  faBullhorn,            // поточный зал 📢
  faPersonWalking,       // вместимость 👥
  faVideo,               // проектор 📽
  faChalkboard,          // доска 🖥
  faCalendar,            // дата 📅
  faClock,               // время 🕐
  faPen,                 // детали 📝
  faList,                // мои брони 📋
  faBell,                // уведомления 🔔
  faGear,                // настройки ⚙️
  faWheelchair,          // доступность ♿
} from '@fortawesome/free-solid-svg-icons';

// Экспортируем иконки для переиспользования
export const Icons = {
  auditorium: faChalkboardUser,
  computerClass: faLaptopCode,
  meetingRoom: faPeopleGroup,
  laboratory: faFlask,
  lectureHall: faBullhorn,
  capacity: faPersonWalking,
  projector: faVideo,
  board: faChalkboard,
  calendar: faCalendar,
  clock: faClock,
  details: faPen,
  bookings: faList,
  notifications: faBell,
  settings: faGear,
  accessibility: faWheelchair,
};

// Компонент-обёртка для удобства
export const Icon = ({ icon, className = "", size = "1x" }) => (
  <FontAwesomeIcon icon={icon} className={className} size={size} />
);