import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
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
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(item => item.id !== action.payload)
    return {
      ...state,
      cart: tempCart
    }
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: []
    }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, value} = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount
        if (value === 'inc') {
           newAmount = newAmount + 1
           newAmount = newAmount > item.max? item.max : newAmount
        }
        if (value === 'dec') {
          newAmount = newAmount - 1
          newAmount = newAmount < 1? 1 : newAmount
        }
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
      cart: tempCart
    }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const {total_amount, total_items} = state.cart.reduce((total, cartItem) => {
      const {price, amount} = cartItem
      total.total_amount += price * amount
      total.total_items += amount
      return total
    }, {
      total_amount: 0,
      total_items: 0
    })
    return {
      ...state,
      total_amount,
      total_items
    }
  }
}

export default cart_reducer
