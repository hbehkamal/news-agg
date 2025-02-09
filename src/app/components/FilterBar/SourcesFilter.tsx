import { Check, ChevronDown } from 'lucide-react';

import { NEWS_SOURCES } from '@/app/api/consts';

import { Popover, PopoverContent, PopoverTrigger, Button } from '../ui';

const sources = NEWS_SOURCES.map((source) => source.name);

interface SourcesFilterProps {
  selectedSources: string[];
  toggleSource: (source: string) => void;
}

export function SourcesFilter({
  selectedSources,
  toggleSource,
}: SourcesFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Sources
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          {sources.map((source) => (
            <Button
              key={source}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => toggleSource(source)}
            >
              {selectedSources.includes(source) && (
                <Check className="mr-2 h-4 w-4" />
              )}
              {source}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
