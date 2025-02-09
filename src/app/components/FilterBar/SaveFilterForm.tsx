import { Save } from 'lucide-react';

import { Input, Button } from '../ui';

interface SaveFilterFormProps {
  filterName: string;
  setFilterName: (name: string) => void;
  saveFilter: () => void;
}

export function SaveFilterForm({
  filterName,
  setFilterName,
  saveFilter,
}: SaveFilterFormProps) {
  return (
    <div className="mt-4 flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Filter name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={saveFilter} className="flex items-center">
        <Save className="mr-2 h-4 w-4" />
        Save Filter
      </Button>
    </div>
  );
}
