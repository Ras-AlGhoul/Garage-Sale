import React, { useState } from 'react'
import ImageUpload from './ImageUpload';
import axios from "axios";

const Form = () => {
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');


  const handleImageUpload = ({ target: { value } }) => {
    setImageUrl(value);
  };

  const handleClick = () => {
    setToggle(show => !show);
  }
  const handlechangeItem = ({target: { value }}) => {
    setItem(value);
  };
  const handlechangePrice = ({target: { value }}) => {
    setPrice(value);
  };
  const handlechangeDescription = ({target: { value }}) => {
    setDescription(value);
  };
  const handlechangeLocation = ({target: { value }}) => {
    setLocation(value);
  };
  const handlechangeContact = ({target: { value }}) => {
    setContact(value);
  };
  const handlechangeCategory = ({target: { value }}) => {
    setCategory(value);
  };
  
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
  };

  return (
    <div>
      <button className='form__btn' onClick={handleClick}>Sell Item</button>
      {toggle &&(
       <form onSubmit={handleSubmit}>
       <label>Item:</label>
       <input placeholder='ex:Iphone-6' value={item} onChange={handlechangeItem} />
       <label>price:</label>
       <input placeholder='ex:1000kr' value={price} onChange={handlechangePrice} />
       <label>Description:</label>
       <input placeholder='ex:used like new' value={description} onChange={handlechangeDescription} />
       <label>Location:</label>
       <input placeholder='ex:Stockholm' value={location} onChange={handlechangeLocation} />
       <label>Contact:</label>
       <input placeholder='ex:07777222' value={contact} onChange={handlechangeContact} />
       <label>category:</label>
       <input placeholder='ex:Electronics' value={category} onChange={handlechangeCategory} />
      <ImageUpload uploadImg={handleImageUpload}/>
      <img src={imageUrl}/>
      <button className='form__btn' type='submit' >Add Item</button>
      </form>
      )
     }
    </div>
  )
}

export default Form
