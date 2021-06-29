import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';
import { clearItem, addItem, removeCartItem } from '../../redux/cart/cart.action';

const CheckoutItem = ({ cartItem, clearCartItem, addItem, removeCartItem }) => {
    const { name, imageUrl, price, quantity} = cartItem;

    return (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow"  onClick={() => removeCartItem(cartItem)}>&#10094;</div>    
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => clearCartItem(cartItem)}>&#10005;</div>
    </div>
    )
} 

const mapDispatchToProps = dispatch => ({
    clearCartItem: item => dispatch(clearItem(item)),
    addItem: item => dispatch(addItem(item)),
    removeCartItem: item => dispatch(removeCartItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);