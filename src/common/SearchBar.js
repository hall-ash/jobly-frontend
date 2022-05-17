/**
 * Search bar for the companies page and jobs page.
 * 
 * Allows users to search companies by name and jobs by title.
 */
import React, { useState } from 'react';
import { Input, Button, Form } from 'reactstrap';
import './SearchBar.css';

const SearchBar = ({ submitSearch }) => {

  const [input, setInput] = useState('')

  const handleChange = evt => {
    setInput(evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    submitSearch(input);
    setInput('');
  }

  return (
    <div className="SearchBar mb-4 mt-4">
      <Form onSubmit={handleSubmit} className="form-inline">
          <Input className="form-control-lg"
                 placeholder="Enter a search term.."
                 type="text"
                 value={input}
                 onChange={handleChange}/>
       
        <Button className="btn-lg search-btn">Search</Button>
      </Form>
    </div>
    
  );
};

export default SearchBar;