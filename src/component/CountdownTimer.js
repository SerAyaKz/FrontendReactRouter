import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ eventDate, format }) => {
  const [remainingTime, setRemainingTime] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const diff = eventDate.getTime() - currentTime.getTime();

    if (diff <= 0) return;

    let years = 0;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 364) {
      years = Math.floor(days / 365);
      days %= 365;
    }

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setRemainingTime({ years, days, hours, minutes, seconds });
  };

  const formatRemainingTime = () => {
    if (format === 'DD:MM:YY') {
      return `${remainingTime.years}Y : ${Math.floor(remainingTime.days / 30)}M : ${remainingTime.days % 30}D`;
    } else if (format === 'DD:Min:Sec') {
      return `${remainingTime.days}D : ${remainingTime.minutes}M : ${remainingTime.seconds}S`;
    }
  };

  useEffect(() => {
    calculateRemainingTime();
    const timerId = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <div>{formatRemainingTime()}</div>;
};

export default CountdownTimer;
