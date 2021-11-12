import React, { useState } from 'react'
import ImageUpload from './ImageUpload';
import axios from "axios";

const Form = ({setRefresh}) => {
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      item,
      description,
      price,
      contact,
      category,
      imageUrl,
      location
    }
    await axios.post('http://localhost:4000/api/items', newItem);
    setToggle(show => !show);
    setRefresh(true);
  };

  return (
    <div>
      <button className='form__btn' onClick={()=> setToggle(show => !show)}>Sell Item</button>
      {toggle && (
        <form className='item__form' onSubmit={handleSubmit}>
          <label>Item:</label>
          <input placeholder='ex:Iphone-6' value={item} onChange={({ target: { value } })=> setItem(value)} />
          <label>price:</label>
          <input placeholder='ex:1000kr' value={price} onChange={({ target: { value } })=> setPrice(value)} />
          <label>Description:</label>
          <input placeholder='ex:used like new' value={description} onChange={({ target: { value } })=> setDescription(value)} />
          <label>Location:</label>
          <input placeholder='ex:Stockholm' value={location} onChange={({ target: { value } })=> setLocation(value)} />
          <label>Contact:</label>
          <input placeholder='ex:07777222' value={contact} onChange={({ target: { value } })=> setContact(value)} />
          <label>category:</label>
          <input placeholder='ex:Electronics' value={category} onChange={({ target: { value } })=> setCategory(value)} />
          <ImageUpload uploadImg={({ target: { value } })=> setImageUrl(value)} />
          <img  src={imageUrl} className='form__img' /><br/>
          <button className='form__btn'  type='submit' >Add Item</button>
        </form>
      )
      }
    </div>
  )
}

export default Form
