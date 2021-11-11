import React from 'react';
import Card from './Card';

const Products = ({ items }) => {
    return (
        <div>
            {items.map((i, index) => 
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
};

export default Products;
