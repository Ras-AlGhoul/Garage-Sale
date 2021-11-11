import React from 'react'

const Card = ({ item, imageUrl, description, contact, location, price, category }) => {
  return (
    <div className='items'>
      <div className='items__card'>
        <img className='card__img' src={imageUrl} />
        <h3>{item}</h3>
        <h4>Price: {price} sek</h4>
        <h4>{description}</h4>
        <p>Contact: {contact}</p>
        <p>Location: {location}</p>
        <p>Category: {category}</p>
      </div>
    </div>
  )
}

export default Card
