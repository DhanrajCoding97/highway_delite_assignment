import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}
const SearchInput = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search Experience.."
        className="w-full lg:min-w-[340px] rounded bg-[#EDEDED]"
      />
      <Button variant="default" type="submit" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
