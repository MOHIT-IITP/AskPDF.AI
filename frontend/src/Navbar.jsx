import React from 'react';

const Navbar = () => {
  return (
    <div className='flex justify-center items-center ' >
      <nav className=" fixed mt-20 bg-black/40 px-10 py-4 rounded-full w-[40%] flex justify-between items-center text-white">
        <div className="font-bold text-lg">AskPDF.AI</div>
        <ul className="list-none flex gap-4 m-0 p-0">
          <li className='flex gap-4'>
            <a href="/" className=" border-r-2 px-4 text-white no-underline">
              Home
            </a>
            <a href="/home" className="text-white no-underline">
               App 
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
