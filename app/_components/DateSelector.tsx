"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReservation } from '../_context/ReservationContext';

const DateSelector = () => {
  const { range, setRange } = useReservation();
  const [currentDate, setCurrentDate] = useState(new Date());
  


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date: Date | null) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!date || date < today) return;

    if (!range.from || (range.from && range.to)) {
      setRange({ from: date, to: null });
    } else if (range.from && date < range.from) {
      setRange({ from: date, to: range.from });
    } else {
      setRange({ ...range, to: date });
    }
  };

  const isDateInRange = (date: Date | null) => {
    if (!date || !range.from || !range.to) return false;
    return date >= range.from && date <= range.to;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return (range.from && date.getTime() === range.from.getTime()) ||
           (range.to && date.getTime() === range.to.getTime());
  };

  const isStartDate = (date: Date | null) => {
    if (!date || !range.from) return false;
    return date.getTime() === range.from.getTime();
  };

  const isEndDate = (date: Date | null) => {
    if (!date || !range.to) return false;
    return date.getTime() === range.to.getTime();
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderMonth = (monthOffset = 0) => {
    const displayDate = new Date(currentDate);
    displayDate.setMonth(currentDate.getMonth() + monthOffset);
    const days = getDaysInMonth(displayDate);

    return (
      <div className="flex-1">
        <div className="relative flex items-center mb-4 border-b border-primary-800">
          {monthOffset === 0 && (
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-accent-400 hover:bg-primary-800 rounded z-10"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h3 className="absolute left-1/2 transform -translate-x-1/2 text-accent-400 font-semibold text-center">
            {months[displayDate.getMonth()]} {displayDate.getFullYear()}
          </h3>
          {monthOffset === 1 && (
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-accent-400 hover:bg-primary-800 rounded z-10 ml-auto"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-7 gap-0 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-primary-400 text-sm font-medium text-center py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-0">
          {days.map((date, index) => {
            const dayOfWeek = index % 7;
            const isFirstInRow = dayOfWeek === 0;
            const isLastInRow = dayOfWeek === 6;
            
            return (
              <div key={index} className="relative">
                {/* Background highlight for range */}
                {isDateInRange(date) && !isDateSelected(date) && (
                  <div 
                    className={`
                      absolute h-9 w-9 bg-accent-500/20
                      ${isFirstInRow ? 'rounded-l-full' : ''}
                      ${isLastInRow ? 'rounded-r-full' : ''}
                    `}
                  />
                )}
                
                {/* Continuous background for start/end dates */}
                {isStartDate(date) && range.to && (
                  <div className="absolute h-9 w-9 bg-accent-500/20 rounded-l-full z-10" />
                )}
                {isEndDate(date) && range.from && (
                  <div className="absolute h-9 w-9 bg-accent-500/20 rounded-r-full z-10" />
                )}
                
                <button
                  onClick={() => handleDateClick(date)}
                  disabled={isDateDisabled(date)}
                  className={`
                    relative h-9 w-9 text-sm font-medium transition-colors z-10
                    ${!date ? 'invisible' : ''}
                    ${isDateDisabled(date) 
                      ? 'text-primary-500 cursor-not-allowed' 
                      : 'text-primary-100 hover:bg-primary-700'
                    }
                    ${isDateSelected(date) 
                      ? 'bg-accent-500 text-primary-900 rounded-full' 
                      : ''
                    }
                  `}
                >
                  {date ? date.getDate() : ''}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };



  return (
    <div className="bg-primary-900 text-primary-100 h-full">
      <div className="p-8 h-full">
        <div className="flex gap-8 justify-center">
          {renderMonth(0)}
          {renderMonth(1)}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;