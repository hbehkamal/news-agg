import { Search } from 'lucide-react';

import { Input } from '../ui';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex-grow">
      <Input
        type="text"
        placeholder="Search articles..."
        className="pl-10 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
}
