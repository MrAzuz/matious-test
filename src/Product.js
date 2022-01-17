import React from "react";
import "./Product.css";

const Product = (props) => {
  return (
    <div className="product">
      <img src={props.item.image} alt={props.item.title} />
      <div className="mainProduct">
        <h3>
          {props.item.title} <span>Category:{props.item.category}</span>
        </h3>
        <p>{props.item.description}</p>
      </div>
      <div className="productRight">
        <h3>{props.item.price} $</h3>
        <h6>Rating</h6>
        <div className="stars">
          <p>{props.item.rating.rate} / 5</p>
        </div>
        <p>Ratings: {props.item.rating.count}</p>
      </div>
    </div>
  );
};

export default Product;
