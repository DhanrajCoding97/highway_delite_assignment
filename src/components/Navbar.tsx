import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SearchInput from './searchInput';
const Navbar = () => {
  // const navigate = useNavigate();
  return (
    <div className="px-[124px] py-1 w-full flex items-center justify-between bg-primary-bg [box-shadow:0px_2px_16px_rgba(0,0,0,0.1)]">
      <img src="/HDlogo.svg" alt="highway delite logo" />
      <SearchInput />
    </div>
  );
};

export default Navbar;
