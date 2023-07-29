import React, { useEffect, useState } from "react";

export default function DisplayCartAndOrder() {
  let cartItems = JSON.parse(localStorage.getItem("cart"));
  let orderDetails = JSON.parse(localStorage.getItem("currentOrder"));

  const totalBillAmount = (itemArray) => {
    let bill = 0;
    itemArray.map((item) => {
      bill += item.itemTotal;
      return bill;
    });
    return bill;
  };

  const cartBill = totalBillAmount(cartItems);
  const orderBill = totalBillAmount(orderDetails);

  const handleClick = () => {
    localStorage.setItem("cart", JSON.stringify([])),
      localStorage.setItem("currentOrder", JSON.stringify([]));
    window.location.reload();
  };

  return (
    <div>
      <div className="displayStore">
        <h2>Cart Details</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Item Quantity</th>
              <th>Item Price</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length == 0 && (
              <tr>
                <td colSpan="5">
                  <h3>Your Cart is Empty</h3>
                </td>
              </tr>
            )}

            {cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemQty}</td>
                  <td>{item.itemPrice}/-</td>
                  <td>{item.itemTotal}/-</td>
                </tr>
              ))}
            <tr>
              <td colSpan="4">Total Amount</td>
              <td>{cartBill} /-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="displayStore">
        <h2>Order Details</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Item Quantity</th>
              <th>Item Price</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.length == 0 && (
              <tr>
                <td colSpan="5">
                  <h3>No Order Placed yet</h3>
                </td>
              </tr>
            )}

            {orderDetails.length > 0 &&
              orderDetails.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemQty}</td>
                  <td>{item.itemPrice}/-</td>
                  <td>{item.itemTotal}/-</td>
                </tr>
              ))}
            <tr>
              <td colSpan="4">Total Order Bill</td>
              <td>{orderBill}/-</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleClick} className="clearBtn">
          Clear Data
        </button>
        <h2>Hit Tony to Play Around With him...👽</h2>
      </div>
    </div>
  );
}
