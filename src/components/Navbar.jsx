import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return <nav className='bg-red-400'>
    <ul className='flex w-full justify-between my-3'>
      <li>Logo</li>
      <li>Logo2</li>
      <li>Logo3</li>
      <li>Logo4</li>
      <li className='px-3'>
        <Link to='/login'>
        <button className='bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
           Inicia 
           </button>
        </Link>
      </li>
    </ul>
  </nav>;
};

export default Navbar;
