import React, { useState, useEffect} from 'react';
import Card from '../components/Card';
import Nav from '../components/Nav';

const Search = () => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState([])
  const handleChange = ({target: {value}}) => {
    setInput(value)
  };

  const fetchItems = async() =>{
  await fetch(`http://localhost:4000/api/items/${input}`)
  .then(res => res.json())
  .then(res => setSearch(res));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchItems();
  };

  return (
    <div className='app'>
      <Nav />
      <form onSubmit={handleSubmit}>
        <input className='search' value={input} onChange={handleChange}/>
      </form>
      {search.map((i, index) => 
            <Card
            key={index}
            item={i.item}
            price={i.price}
            description={i.description}
            contact={i.contact}
            location={i.location}
            category={i.category}
            imageUrl={i.imageUrl} />)}
    </div>
  )
}

export default Search
