import {useState} from 'react'
import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentOption, setPaymentOption] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const showSuccessText = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
    }, 3000)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              <Popup
                modal
                className="popup-container"
                trigger={
                  <button
                    type="button"
                    className="checkout-button d-block d-lg-none d-lg-block"
                  >
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div className="popup-content">
                    <button type="button" className="close" onClick={close}>
                      &times;
                    </button>

                    <h2>Choose Payment Method</h2>

                    <form className="payment-form">
                      <label htmlFor="card">
                        <input type="radio" id="card" name="payment" disabled />
                        Card
                      </label>
                      <label htmlFor="netbanking">
                        <input
                          type="radio"
                          id="netbanking"
                          name="payment"
                          disabled
                        />
                        Net Banking
                      </label>
                      <label htmlFor="upi">
                        <input type="radio" id="upi" name="payment" disabled />
                        UPI
                      </label>
                      <label htmlFor="wallet">
                        <input
                          type="radio"
                          id="wallet"
                          name="payment"
                          disabled
                        />
                        Wallet
                      </label>
                      <label htmlFor="cod">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          value="cod"
                          onChange={e => setPaymentOption(e.target.value)}
                          checked={paymentOption === 'cod'}
                        />
                        Cash on Delivery
                      </label>
                    </form>

                    <div className="summary">
                      <p>Items: {cartList.length}</p>
                      <p>Total: Rs {total}/-</p>
                    </div>

                    <button
                      type="button"
                      className="confirm-button"
                      disabled={paymentOption !== 'cod'}
                      onClick={showSuccessText}
                    >
                      Confirm Order
                    </button>

                    {orderPlaced && (
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
