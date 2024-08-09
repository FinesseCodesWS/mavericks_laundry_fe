import React from "react";
import { Image } from "react-bootstrap";
import "./Card.scss";
import  Currency  from 'react-currency-formatter';

const Product = ({productData, addoRUpdateProduct}) => {

// console.log(productData)


  const pickProduct= ()=>{
    addoRUpdateProduct(productData)
  }

 



  return (
    <div  style={{cursor: 'pointer'}} onClick={pickProduct}>
      <div className="card">
        {/* <span>Qty: {productData?.quantity}.00</span> */}
        <div className="images">
          <Image
            src={productData?.image || productData?.default_image}
            alt="product"
            className="mainImg"
          />
        </div>
        <h2>{productData?.itemName}</h2>
        <div className="prices">
          <h3>
          <Currency
              quantity={productData?.unitPrice}      
              currency="NGN"            
          />
           </h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
