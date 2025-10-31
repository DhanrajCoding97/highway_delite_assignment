import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';

interface NavbarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const Navbar = ({ value, onChange, onSearch }: NavbarProps) => {
  // const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-6 lg:px-8 2xl:px-[124px] py-1 w-full flex items-center justify-between bg-primary-bg [box-shadow:0px_2px_16px_rgba(0,0,0,0.1)]">
      <a href="/">
        {' '}
        <img src="/HDlogo.svg" alt="highway delite logo" />
      </a>
      <SearchInput value={value} onChange={onChange} onSearch={onSearch} />
    </div>
  );
};

export default Navbar;
