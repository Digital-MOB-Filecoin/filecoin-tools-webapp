import { useEffect, useMemo, useRef, useState } from 'react';

import { autoUpdate, offset, useFloating } from '@floating-ui/react';
import { Duration, Interval, format, intervalToDuration, isValid, sub, subMonths } from 'date-fns';

import { Button } from 'src/components/button';
import { useNetworks } from 'src/contexts/network-provider';

import { Calendar } from './Calendar';
import * as SC from './styles.ts';

const RANGES = {
  ONE_WEEK: 'one_week',
  TWO_WEEKS: 'two_week',
  THREE_WEEKS: 'three_week',
  MONTH: 'month',
  CUSTOM: 'custom',
};

export type CalendarInterval = {
  start: Date | string | number | undefined;
  end: Date | string | number | undefined;
};

type TDatepicker = {
  className?: string;
  dateInterval: Interval;
  onChange: (interval: Interval) => void;
};

export const Datepicker = ({ className, dateInterval, onChange }: TDatepicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
  const [calendarDateInterval, setCalendarDateInterval] = useState<CalendarInterval>(dateInterval);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { selectedNetwork } = useNetworks();
  const maxDate = useMemo(() => new Date(), [selectedNetwork.id]);
  const defaultMinDate = useMemo(() => subMonths(new Date(), 2), [selectedNetwork.id]);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(12)],
  });

  const activeRange = useMemo(() => {
    if (isCustomRangeOpen) return RANGES.CUSTOM;

    const isDiffIs = (duration: Duration): boolean => {
      const helperDuration: Duration = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      const inputDuration: Duration = { ...helperDuration, ...duration };
      const intervalDuration: Duration = {
        ...helperDuration,
        ...intervalToDuration(dateInterval),
      };

      return Object.keys(inputDuration).every(
        (key) =>
          inputDuration[key as keyof Duration['seconds']] ===
          intervalDuration[key as keyof Duration['seconds']]
      );
    };

    if (isDiffIs({ days: 7 })) {
      return RANGES.ONE_WEEK;
    }
    if (isDiffIs({ days: 14 })) {
      return RANGES.TWO_WEEKS;
    }
    if (isDiffIs({ months: 21 })) {
      return RANGES.THREE_WEEKS;
    }
    if (isDiffIs({ months: 1 })) {
      return RANGES.MONTH;
    }

    setIsCustomRangeOpen(true);
    return RANGES.CUSTOM;
  }, [isCustomRangeOpen, dateInterval]);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', clickHandler, { capture: true });
      document.addEventListener('keyup', keyboardHandler, { capture: true });
    }

    return () => {
      document.removeEventListener('click', clickHandler, { capture: true });
      document.removeEventListener('keyup', keyboardHandler, { capture: true });
    };
  }, [isOpen]);

  const handlerSetRange = (range: any) => {
    const newInterval: Interval = {
      start: calendarDateInterval.start || defaultMinDate,
      end: maxDate,
    };

    switch (range) {
      case RANGES.ONE_WEEK:
        newInterval.start = sub(maxDate, { days: 7 });
        break;
      case RANGES.TWO_WEEKS:
        newInterval.start = sub(maxDate, { days: 14 });
        break;
      case RANGES.THREE_WEEKS:
        newInterval.start = sub(maxDate, { days: 21 });
        break;
      case RANGES.MONTH:
        newInterval.start = sub(maxDate, { months: 1 });
        break;
      case RANGES.CUSTOM:
        newInterval.end = new Date(calendarDateInterval.end || maxDate);
        break;
      default:
        return;
    }

    setCalendarDateInterval(newInterval);
    onChange(newInterval);
    setIsCustomRangeOpen(false);
    setIsOpen(false);
  };

  const handlerClose = () => {
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={className}>
      <Button
        ref={refs.setReference}
        variation="secondary"
        className={isOpen ? 'active' : ''}
        icon={{ name: 'calendar', position: 'left' }}
        onClick={() => setIsOpen((prevState) => !prevState)}>
        {isValid(dateInterval.start) && isValid(dateInterval.end)
          ? `${format(dateInterval.start, 'LLL d, yyyy')} - ${format(dateInterval.end, 'LLL d, yyyy')}`
          : 'Start date range'}
      </Button>
      <SC.DatePickerWrap
        ref={refs.setFloating}
        style={floatingStyles}
        $active={isOpen}>
        <SC.RangeWrapper $customActive={isCustomRangeOpen}>
          <SC.RangeButton
            $active={activeRange === RANGES.ONE_WEEK}
            type="button"
            onClick={() => handlerSetRange(RANGES.ONE_WEEK)}>
            Last 7 days
          </SC.RangeButton>
          <SC.RangeButton
            $active={activeRange === RANGES.TWO_WEEKS}
            type="button"
            onClick={() => handlerSetRange(RANGES.TWO_WEEKS)}>
            Last 14 days
          </SC.RangeButton>
          <SC.RangeButton
            $active={activeRange === RANGES.THREE_WEEKS}
            type="button"
            onClick={() => handlerSetRange(RANGES.THREE_WEEKS)}>
            Last 21 days
          </SC.RangeButton>
          <SC.RangeButton
            $active={activeRange === RANGES.MONTH}
            type="button"
            onClick={() => handlerSetRange(RANGES.MONTH)}>
            Last month
          </SC.RangeButton>
          <SC.RangeButton
            $active={activeRange === RANGES.CUSTOM}
            type="button"
            onClick={() => setIsCustomRangeOpen(true)}>
            Custom range
          </SC.RangeButton>
        </SC.RangeWrapper>
        {isCustomRangeOpen ? (
          <SC.CalendarWrap>
            <Calendar interval={calendarDateInterval} onChange={setCalendarDateInterval} />

            <SC.Footer>
              <Button variation="secondary" onClick={handlerClose}>
                Close
              </Button>
              <Button
                variation="primary"
                onClick={() => handlerSetRange(RANGES.CUSTOM)}
                disabled={!calendarDateInterval.start || !calendarDateInterval.end}>
                Apply
              </Button>
            </SC.Footer>
          </SC.CalendarWrap>
        ) : null}
      </SC.DatePickerWrap>
    </div>
  );
};
