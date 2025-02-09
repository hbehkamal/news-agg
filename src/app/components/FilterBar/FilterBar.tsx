import { useState, useEffect } from 'react';
import type { DateRange } from 'react-day-picker';
import { SearchInput } from './SearchInput';
import { DateRangeFilter } from './DateRangeFilter';
import { CategoryFilter } from './CategoryFilter';
import { SourcesFilter } from './SourcesFilter';
import { AuthorInput } from './AuthorInput';
import { SaveFilterForm } from './SaveFilterForm';
import { SavedFiltersList } from './SavedFiltersList';

export interface FilterState {
  date: DateRange | undefined;
  selectedCategory: string;
  selectedSources: string[];
  authorInput: string;
  searchQuery: string;
}

interface SavedFilter extends FilterState {
  id: string;
  name: string;
}

export function FilterBar() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [authorInput, setAuthorInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const filters = localStorage.getItem('savedFilters');
    if (filters) {
      setSavedFilters(JSON.parse(filters));
    }
  }, []);

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const saveFilter = () => {
    if (filterName.trim() === '') return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: filterName,
      date,
      selectedCategory,
      selectedSources,
      authorInput,
      searchQuery,
    };

    const updatedFilters = [...savedFilters, newFilter];
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
    setFilterName('');
  };

  const loadFilter = (filter: SavedFilter) => {
    setDate(filter.date);
    setSelectedCategory(filter.selectedCategory);
    setSelectedSources(filter.selectedSources);
    setAuthorInput(filter.authorInput);
    setSearchQuery(filter.searchQuery);
  };

  const deleteFilter = (id: string) => {
    const updatedFilters = savedFilters.filter((filter) => filter.id !== id);
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <DateRangeFilter date={date} setDate={setDate} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <SourcesFilter
          selectedSources={selectedSources}
          toggleSource={toggleSource}
        />
        <AuthorInput value={authorInput} onChange={setAuthorInput} />
      </div>

      <SaveFilterForm
        filterName={filterName}
        setFilterName={setFilterName}
        saveFilter={saveFilter}
      />

      <SavedFiltersList
        filters={savedFilters}
        loadFilter={loadFilter}
        deleteFilter={deleteFilter}
      />
    </div>
  );
}
