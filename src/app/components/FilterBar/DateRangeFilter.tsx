import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  Button,
} from '../ui';

interface DateRangeFilterProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export function DateRangeFilter({ date, setDate }: DateRangeFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            'Filter by date range'
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
