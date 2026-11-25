import { ReactElement, useMemo, useState } from 'react';

import {
  NormalizedInterval,
  add,
  addDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  format,
  getDate,
  getWeeksInMonth,
  isSameDay as isSameDayPure,
  isToday,
  isValid,
  isWithinInterval,
  set,
  startOfWeek,
  sub,
} from 'date-fns';

import { Button } from 'src/components/button';
import { CalendarInterval } from 'src/components/datepicker';
import { useNetworks } from 'src/contexts/network-provider';

import * as SC from './styles.ts';

enum EnumMONTH {
  CURRENT = 'current',
  PREV = 'prev',
  NEXT = 'next',
}

const getDayMonthType = (dayDate: Date, date: Date): EnumMONTH => {
  const diff = differenceInCalendarMonths(date, dayDate);

  if (diff < 0) return EnumMONTH.NEXT;
  if (diff > 0) return EnumMONTH.PREV;

  return EnumMONTH.CURRENT;
};

const isIntervalValid = (interval: CalendarInterval): boolean => {
  return isValid(interval.start) && isValid(interval.end);
};

const isDateInRange = (date: Date, interval: CalendarInterval): boolean => {
  if (!isValid(interval.start) || !isValid(interval.end) || !isValid(date)) {
    return false;
  }

  return isWithinInterval(date, interval as NormalizedInterval<Date>);
};

const isSameDay = (date1: any, date2: any): boolean => {
  if (!isValid(date1) || !isValid(date1)) {
    return false;
  }

  return isSameDayPure(date1, date2);
};

type TDateRangePicker = {
  interval: CalendarInterval;
  onChange: (interval: CalendarInterval) => void;
};

export const Calendar = ({ interval, onChange }: TDateRangePicker): ReactElement => {
  const [shownMonth, setShownMonth] = useState(interval.start || new Date());
  const { selectedNetwork } = useNetworks();

  const minDate = useMemo(() => selectedNetwork.epochStartDate, [selectedNetwork.id]);
  const maxDate = useMemo(() => new Date(), [selectedNetwork.id]);

  const calendarMonthDays = useMemo(() => {
    const calendarDaysInMonth = getWeeksInMonth(shownMonth) * 7;
    const firstDayInCalendarWeek = startOfWeek(set(shownMonth, { date: 1 }));

    return Array.from({ length: calendarDaysInMonth }).map((_, idx) => {
      const dayDate = addDays(firstDayInCalendarWeek, idx);
      return {
        date: dayDate,
        dayNumber: getDate(addDays(firstDayInCalendarWeek, idx)),
        monthType: getDayMonthType(dayDate, new Date(shownMonth)),
      };
    });
  }, [shownMonth]);

  const handlerChangeInterval = (dayDate: Date) => {
    onChange(
      isIntervalValid(interval)
        ? { start: dayDate, end: undefined }
        : { start: interval.start, end: dayDate }
    );
  };

  return (
    <SC.Wrapper>
      <SC.Header>
        <Button
          variation="secondary"
          onClick={() => setShownMonth((prevState) => sub(prevState, { years: 1 }))}
          disabled={differenceInCalendarYears(shownMonth, minDate) <= 0}
          icon={{ name: 'double-chevron-left', position: 'only', size: 16 }}>
          Prev year
        </Button>
        <Button
          variation="secondary"
          onClick={() => setShownMonth((prevState) => sub(prevState, { months: 1 }))}
          disabled={differenceInCalendarMonths(shownMonth, minDate) <= 0}
          icon={{ name: 'chevron-left', position: 'only', size: 16 }}>
          Prev month
        </Button>
        <SC.Title>{shownMonth ? format(shownMonth, 'MMMM yyyy') : '---'}</SC.Title>
        <Button
          variation="secondary"
          onClick={() => setShownMonth((prevState) => add(prevState, { months: 1 }))}
          disabled={differenceInCalendarMonths(shownMonth, maxDate) >= 0}
          icon={{ name: 'chevron-right', position: 'only', size: 16 }}>
          Next month
        </Button>
        <Button
          variation="secondary"
          onClick={() => setShownMonth((prevState) => add(prevState, { years: 1 }))}
          disabled={differenceInCalendarYears(shownMonth, maxDate) >= 0}
          icon={{ name: 'double-chevron-right', position: 'only', size: 16 }}>
          Next year
        </Button>
      </SC.Header>

      <SC.Calendar>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((weekDay, idx) => (
          <SC.Weekday key={idx}>{weekDay}</SC.Weekday>
        ))}

        {calendarMonthDays.map((day) => {
          if (!day) return null;
          const { date: dayDate, dayNumber, monthType } = day;
          const isDisabled = !isDateInRange(dayDate, {
            start: minDate,
            end: maxDate,
          });

          return (
            <SC.Day
              key={day.date.toJSON()}
              type="button"
              $isToday={isToday(dayDate)}
              $isPrevMonth={monthType === EnumMONTH.PREV}
              $isNextMonth={monthType === EnumMONTH.NEXT}
              $isInRange={isDateInRange(dayDate, interval)}
              $isStartOfRange={isSameDay(dayDate, interval.start)}
              $isEndOfRange={isSameDay(dayDate, interval.end)}
              $isDisabled={isDisabled}
              onClick={() => {
                !isDisabled && handlerChangeInterval(dayDate);
              }}>
              <SC.DayNumber>{dayNumber}</SC.DayNumber>
            </SC.Day>
          );
        })}
      </SC.Calendar>
    </SC.Wrapper>
  );
};
