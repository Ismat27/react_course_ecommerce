import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type = ADD_TO_CART) {
    const { id, color, amount, product} = action.payload;
    const tempProd = state.cart.find(i => i.id == id + color)
    if (tempProd) {
      const tempItems = state.cart.map(item => {
        if (item.id === id + color) {
          let newAmount = amount + item.amount
          newAmount = newAmount > item.max? item.max : newAmount
          return {
            ...item,
            amount: newAmount
          }
        }
        else {
          return item
        }
      })
      return {
        ...state,
        cart: tempItems
      }
    }
    else {
      const newItem = {
        id: id + color,
        color,
        amount,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,

      }
      return {
        ...state,
        cart: [...state.cart, newItem ]
      }
    }
  }
  return state
}

export default cart_reducer
