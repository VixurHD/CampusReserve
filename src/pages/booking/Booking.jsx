import React, { Component } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import StepsBar from './StepsBar';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import BookingDetails from './BookingDetails';
import BookingSummary from './BookingSummary';
import SuccessModal from './SuccessModal';

export default class Booking extends Component {
  state = {
    room: {
      id: 1,
      number: 'А-101',
      name: 'Учебная аудитория',
      building: 'Корпус А',
      floor: '1 этаж',
      capacity: 30,
      icon: '🎓',
      specs: ['Проектор', 'Доска', '30 мест']
    },
    date: '2026-03-26',
    timeSlot: '12:00',
    duration: '1 час',
    purpose: 'Учебное занятие',
    peopleCount: '',
    discipline: '',
    equipment: {
      projector: true,
      microphone: false,
      flipchart: false,
      extender: false
    },
    comment: '',
    showSuccess: false
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleTimeChange = (time) => {
    this.setState({ timeSlot: time });
  };

  handleDurationChange = (duration) => {
    this.setState({ duration });
  };

  handlePurposeChange = (purpose) => {
    this.setState({ purpose });
  };

  handlePeopleCountChange = (count) => {
    this.setState({ peopleCount: count });
  };

  handleDisciplineChange = (discipline) => {
    this.setState({ discipline });
  };

  handleEquipmentChange = (type) => {
    this.setState(prev => ({
      equipment: {
        ...prev.equipment,
        [type]: !prev.equipment[type]
      }
    }));
  };

  handleCommentChange = (comment) => {
    this.setState({ comment });
  };

  handleSubmit = () => {
    this.setState({ showSuccess: true });
    // Здесь будет API-запрос для сохранения брони
  };

  handleCloseModal = () => {
    this.setState({ showSuccess: false });
  };

  getEndTime = () => {
    const start = this.state.timeSlot;
    const duration = this.state.duration;
    // Простая логика (можно расширить)
    const [hour, minute] = start.split(':').map(Number);
    let endHour = hour;
    
    if (duration === '30 мин') endHour = hour + 0.5;
    else if (duration === '1 час') endHour = hour + 1;
    else if (duration === '1.5 часа') endHour = hour + 1.5;
    else if (duration === '2 часа') endHour = hour + 2;
    else if (duration === '3 часа') endHour = hour + 3;
    
    const endHourInt = Math.floor(endHour);
    const endMinute = (endHour % 1) * 60;
    return `${String(endHourInt).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
  };

  render() {
    const { room, date, timeSlot, duration, purpose, peopleCount, discipline, equipment, comment, showSuccess } = this.state;
    const endTime = this.getEndTime();

    return (
      <>
        <Header />
        
        <div className="breadcrumb">
          <div className="breadcrumb-inner">
            <a href="#">НГТУ</a> <span>›</span>
            <a href="/">Кампус-Бронь</a> <span>›</span>
            <a href="/">Аудитория {room.number}</a> <span>›</span>
            Бронирование
          </div>
        </div>

        <div className="page-title-bar">
          <div className="page-title-bar-inner">
            <div>
              <h1>Бронирование аудитории</h1>
              <p>Выберите время и подтвердите — это займёт меньше минуты</p>
            </div>
          </div>
        </div>

        <main>
          <div className="container">
            <StepsBar currentStep={2} />

            <div className="booking-layout">
              <div>
                <DateSelector 
                  date={date} 
                  onDateChange={this.handleDateChange}
                />
                
                <TimeSelector 
                  timeSlot={timeSlot}
                  duration={duration}
                  onTimeChange={this.handleTimeChange}
                  onDurationChange={this.handleDurationChange}
                />
                
                <BookingDetails 
                  purpose={purpose}
                  peopleCount={peopleCount}
                  discipline={discipline}
                  equipment={equipment}
                  comment={comment}
                  onPurposeChange={this.handlePurposeChange}
                  onPeopleCountChange={this.handlePeopleCountChange}
                  onDisciplineChange={this.handleDisciplineChange}
                  onEquipmentChange={this.handleEquipmentChange}
                  onCommentChange={this.handleCommentChange}
                />
              </div>

              <div>
                <BookingSummary 
                  room={room}
                  date={date}
                  timeSlot={timeSlot}
                  endTime={endTime}
                  duration={duration}
                  purpose={purpose}
                  onSubmit={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <SuccessModal 
          isOpen={showSuccess} 
          onClose={this.handleCloseModal}
          room={room}
          date={date}
          timeSlot={timeSlot}
          endTime={endTime}
        />
      </>
    );
  }
}