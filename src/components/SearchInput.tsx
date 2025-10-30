import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
const SearchInput = () => {
  return (
    <div className="flex items-center gap-4">
      <Input
        type="search"
        placeholder="Search Experience.."
        className="w-full lg:min-w-[340px] rounded bg-[#EDEDED]"
      />
      <Button variant="default" type="submit">
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
