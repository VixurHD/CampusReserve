import React, { Component } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import UserCard from './UserCard';
import Sidebar from './Sidebar';
import StatsRow from './StatsRow';
import BookingsList from './BookingsList';
import NotificationsList from './NotificationsList';
import CancelModal from './CancelModal';

export default class Cabinet extends Component {
  state = {
    activeTab: 'bookings',
    user: {
      initials: 'ИИ',
      name: 'Иванов Иван Иванович',
      role: 'Студент · ФА, гр. АС-304',
      totalBookings: 12,
      activeBookings: 2,
    },
    activeBookings: [
      {
        id: 1,
        icon: '🎓',
        title: 'Аудитория А-101',
        location: 'Корпус А, 1 этаж · 30 мест · Проектор',
        time: 'Сегодня, 26 марта · 12:00 — 13:00',
        status: 'active',
      },
      {
        id: 2,
        icon: '💻',
        title: 'Компьютерный класс Б-305',
        location: 'Корпус Б, 3 этаж · 25 мест · 25 ПК',
        time: 'Завтра, 27 марта · 14:00 — 16:00',
        status: 'active',
      },
    ],
    historyBookings: [
      {
        id: 3,
        icon: '🎓',
        title: 'Аудитория А-210',
        location: 'Корпус А, 2 этаж · Поточный зал',
        time: '24 марта · 10:00 — 12:00',
        status: 'past',
      },
      {
        id: 4,
        icon: '🤝',
        title: 'Переговорная В-118',
        location: 'Корпус В, 1 этаж',
        time: '22 марта · 15:00 — 16:30',
        status: 'cancelled',
      },
      {
        id: 5,
        icon: '💻',
        title: 'Компьютерный класс Б-305',
        location: 'Корпус Б, 3 этаж',
        time: '19 марта · 13:00 — 15:00',
        status: 'past',
      },
    ],
    notifications: [
      {
        id: 1,
        text: '<strong>Аудитория В-118 освободилась</strong> — вы подписались на уведомление. Доступна с 13:45 до 18:00.',
        time: '10 мин назад',
        read: false,
      },
      {
        id: 2,
        text: '<strong>Напоминание:</strong> бронь А-101 начинается через 1 час (в 12:00).',
        time: '1 час назад',
        read: false,
      },
      {
        id: 3,
        text: '<strong>Бронь Б-305 подтверждена</strong> на 27 марта, 14:00–16:00.',
        time: 'вчера',
        read: false,
      },
      {
        id: 4,
        text: 'Бронь А-210 от 24 марта успешно завершена.',
        time: '24 мар',
        read: true,
      },
    ],
    cancelModalOpen: false,
    bookingToCancel: null,
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleCancelClick = (bookingId) => {
    this.setState({ cancelModalOpen: true, bookingToCancel: bookingId });
  };

  handleConfirmCancel = () => {
    const { bookingToCancel, activeBookings } = this.state;
    // Удаляем бронь из активных и добавляем в историю как отменённую
    const cancelledBooking = activeBookings.find(b => b.id === bookingToCancel);
    if (cancelledBooking) {
      const newActiveBookings = activeBookings.filter(b => b.id !== bookingToCancel);
      const cancelledHistory = {
        ...cancelledBooking,
        status: 'cancelled',
      };
      this.setState({
        activeBookings: newActiveBookings,
        historyBookings: [cancelledHistory, ...this.state.historyBookings],
        user: {
          ...this.state.user,
          activeBookings: this.state.user.activeBookings - 1,
        },
        cancelModalOpen: false,
        bookingToCancel: null,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({ cancelModalOpen: false, bookingToCancel: null });
  };

  handleMarkAllRead = () => {
    const updatedNotifications = this.state.notifications.map(notif => ({
      ...notif,
      read: true,
    }));
    this.setState({ notifications: updatedNotifications });
  };

  render() {
    const { activeTab, user, activeBookings, historyBookings, notifications, cancelModalOpen } = this.state;
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
      <>
        <Header />
        
        <div className="breadcrumb">
          <div className="breadcrumb-inner">
            <a href="#">НГТУ</a> <span> › </span>
            <a href="/">Кампус-Бронь</a> <span> › </span>
            Личный кабинет
          </div>
        </div>

        <div className="page-title-bar">
          <div className="page-title-bar-inner">
            <div>
              <h1>Личный кабинет</h1>
              <p>Управление бронированиями и уведомлениями</p>
            </div>
            <a href="/catalog" className="btn btn-red">+ Новое бронирование</a>
          </div>
        </div>

        <main>
          <div className="container">
            <div className="cabinet-layout">
              <div className="sidebar">
                <UserCard user={user} />
                <Sidebar 
                  activeTab={activeTab} 
                  onTabChange={this.handleTabChange}
                  notificationsCount={unreadCount}
                />
              </div>

              <div>
                <StatsRow 
                  upcoming={activeBookings.length}
                  completed={historyBookings.filter(b => b.status === 'past').length}
                  notifications={unreadCount}
                />

                {activeTab === 'bookings' && (
                  <>
                    <BookingsList 
                      title="Предстоящие брони"
                      bookings={activeBookings}
                      badgeText={`${activeBookings.length} активных`}
                      onCancel={this.handleCancelClick}
                    />
                    <BookingsList 
                      title="История броней"
                      bookings={historyBookings}
                    />
                  </>
                )}

                {activeTab === 'notifications' && (
                  <NotificationsList 
                    notifications={notifications}
                    onMarkAllRead={this.handleMarkAllRead}
                  />
                )}

                {activeTab === 'history' && (
                  <BookingsList 
                    title="История броней"
                    bookings={historyBookings}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <CancelModal 
          isOpen={cancelModalOpen}
          onClose={this.handleCloseModal}
          onConfirm={this.handleConfirmCancel}
        />
      </>
    );
  }
}