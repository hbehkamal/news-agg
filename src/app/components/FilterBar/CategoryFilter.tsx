import { Check, ChevronDown } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger, Button } from '../ui';

const categories = [
  'All',
  'Technology',
  'Business',
  'Sports',
  'Entertainment',
  'Health',
];

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          {selectedCategory}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category === selectedCategory && (
                <Check className="mr-2 h-4 w-4" />
              )}
              {category}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
