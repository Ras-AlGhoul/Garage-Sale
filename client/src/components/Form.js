import React, { useState } from 'react'
import ImageUpload from './ImageUpload';

const Form = () => {
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = ({ target: { value } }) => {
    setImageUrl(value);
    console.log('ddas', imageUrl)
  };

  const handleClick = () => {
    setToggle(show => !show);
  }
  const handlechangeItem = ({targe: { value }}) => {
    setItem(value);
  };
  const handlechangePrice = ({targe: { value }}) => {
    setPrice(value);
  };
  const handlechangeDescription = ({targe: { value }}) => {
    setDescription(value);
  };
  const handlechangeLocation = ({targe: { value }}) => {
    setLocation(value);
  };
  const handlechangeContact = ({targe: { value }}) => {
    setContact(value);
  };
  const handlechangeImageUrl = ({targe: { value }}) => {
    setImageUrl(value)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <button className='formbtn' onClick={handleClick}>Sell Item</button>
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
      <ImageUpload uploadImg={handleImageUpload}/>
      <img src={imageUrl}/>
      <button className='formbtn' type='submit' >Add Item</button>
      </form>
      )
     }
    </div>
  )
}

export default Form
