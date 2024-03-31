/* eslint-disable react/prop-types */

import { useState } from "react";
import './SearchBar.scss';
const SearchBar = ({ onSearch }) => {

    const [location, setLocation] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== '') {
      onSearch(location);
    }
  };
    return (
        <div>
             <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Search</button>
      
    </form>
    <form className="c-form relative">
      <input
      
        className="c-form__input placeholder-current"
        placeholder="E-mail"
        type="email"
    
        required
      />
      <label className="c-form__buttonLabel relative" htmlFor="checkbox">
        <button className="c-form__button absolute inset-0 w-full h-full" type="button">
          Send
        </button>
      </label>
      <label className="c-form__toggle absolute top-0 flex items-center justify-center" htmlFor="checkbox" data-title="Notify me"></label>
    </form>
    
        </div>
    );
};

export default SearchBar;