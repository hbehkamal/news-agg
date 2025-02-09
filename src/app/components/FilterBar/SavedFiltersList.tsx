import { Trash2 } from 'lucide-react';

import { Button } from '../ui';
import { FilterState } from './FilterBar';

interface SavedFilter extends FilterState {
  id: string;
  name: string;
}

interface SavedFiltersListProps {
  filters: SavedFilter[];
  loadFilter: (filter: SavedFilter) => void;
  deleteFilter: (id: string) => void;
}

export function SavedFiltersList({
  filters,
  loadFilter,
  deleteFilter,
}: SavedFiltersListProps) {
  if (filters.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Saved Filters</h3>
      <div className="space-y-2">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span>{filter.name}</span>
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => loadFilter(filter)}
              >
                Load
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteFilter(filter.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
