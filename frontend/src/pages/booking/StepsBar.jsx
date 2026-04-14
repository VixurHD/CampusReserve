import React from 'react';

const StepsBar = ({ currentStep = 2 }) => {
  const steps = [
    { number: 1, title: 'Выбор аудитории', done: true },
    { number: 2, title: 'Время и детали', done: false },
    { number: 3, title: 'Подтверждение', done: false }
  ];

  return (
    <div className="steps-bar" style={{ marginTop: '24px' }}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {index > 0 && <div className={`step-line ${step.done ? 'done' : ''}`}></div>}
          <div className="step-item">
            <div className={`step-circle ${step.done ? 'done' : currentStep === step.number ? 'active' : ''}`}>
              {step.done ? '✓' : step.number}
            </div>
            <div className="step-info">
              <div className="step-label">Шаг {step.number}</div>
              <div className={`step-title ${currentStep === step.number ? 'active' : step.done ? 'done' : ''}`}>
                {step.title}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepsBar;