import type React from 'react'; // Added import for React

import { Input } from '../ui';

interface AuthorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function AuthorInput({ value, onChange }: AuthorInputProps) {
  return (
    <div className="flex-grow">
      <Input
        type="text"
        placeholder="Add authors (press Enter)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
