import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { userData } = useSelector((state) => state.user);
const navigate =  useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchParam = urlParams.toString()
    // window.history.replaceState({}, "", `${window.location.pathname}?${searchParam}`);
    navigate(`search?${searchParam}`)
  }
  useEffect(() => {
    // When the component mounts, read the initial search term from the URL
    const params = new URLSearchParams(window.location.search);
    const initialSearchTerm = params.get("search");
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md h-20 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap gap-2">
            <span className="text-slate-500 font-serif">Khpal</span>
            <span className="text-slate-700 font-serif">Kor</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-6 items-center ">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          {userData && (
            <Link to="/create-listing">
              <li className="sm:inline text-slate-700 hover:underline">
                Create listing
              </li>
            </Link>
          )}
          {userData && (
            <Link to="/listing">
              <li className="sm:inline text-slate-700 hover:underline">
                Show listing
              </li>
            </Link>
          )}

          <Link to="/profile">
            {(userData && (
              <img
                src={userData.avatar}
                alt="image missing"
                className="w-10 h-10 rounded-full border-2 border-white "
              />
            )) || (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
          {/* <Link to='/profile'>
          
        </Link> */}
        </ul>
      </div>
    </header>
  );
}

export default Header;
