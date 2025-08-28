"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorProps {
  onPricingChange?: (pricing: {
    regularPrice: number;
    discount: number;
    numNights: number;
    cabinPrice: number;
    selectedRange: { from: Date | null; to: Date | null };
  }) => void;
}

const DateSelector = ({ onPricingChange }: DateSelectorProps) => {
  const [selectedRange, setSelectedRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data
  const regularPrice = 23;
  const discount = 23;
  const numNights = selectedRange.from && selectedRange.to 
    ? Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  // Notify parent of pricing changes
  React.useEffect(() => {
    if (onPricingChange) {
      onPricingChange({
        regularPrice,
        discount,
        numNights,
        cabinPrice,
        selectedRange
      });
    }
  }, [regularPrice, discount, numNights, cabinPrice, selectedRange, onPricingChange]);

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

    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: date, to: null });
    } else if (selectedRange.from && date < selectedRange.from) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ ...selectedRange, to: date });
    }
  };

  const isDateInRange = (date: Date | null) => {
    if (!date || !selectedRange.from || !selectedRange.to) return false;
    return date >= selectedRange.from && date <= selectedRange.to;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return (selectedRange.from && date.getTime() === selectedRange.from.getTime()) ||
           (selectedRange.to && date.getTime() === selectedRange.to.getTime());
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
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 && (
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-accent-400 hover:bg-primary-800 rounded"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h3 className="text-accent-400 font-semibold w-32 text-center">
            {months[displayDate.getMonth()]} {displayDate.getFullYear()}
          </h3>
          {monthOffset === 1 && (
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-accent-400 hover:bg-primary-800 rounded"
            >
              <ChevronRight size={20} />
            </button>
          )}
          {monthOffset === 0 && <div className="w-9"></div>}
          {monthOffset === 1 && <div className="w-9"></div>}
        </div>
        
        <div className="grid grid-cols-7 gap-0.5 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-primary-400 text-sm font-medium text-center py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isDateDisabled(date)}
              className={`
                h-9 w-9 rounded text-sm font-medium transition-colors
                ${!date ? 'invisible' : ''}
                ${isDateDisabled(date) 
                  ? 'text-primary-500 cursor-not-allowed' 
                  : 'text-primary-100 hover:bg-primary-700'
                }
                ${isDateSelected(date) 
                  ? 'bg-accent-500 text-primary-900' 
                  : ''
                }
                ${isDateInRange(date) && !isDateSelected(date)
                  ? 'bg-accent-500/20 text-primary-100'
                  : ''
                }
              `}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const resetRange = () => {
    setSelectedRange({ from: null, to: null });
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