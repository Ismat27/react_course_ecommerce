import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-highest',
  filters: {
    text: '',
    company: 'all',
    color: 'all',
    category: 'all',
    price: 0,
    min_price: 0,
    max_price: 0,
    shipping: false,
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { products } = useProductsContext()

  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products})
  }, [products])

  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  }, [state.sort, products, state.filters])

  const set_grid_view = () => {
    dispatch({type: SET_GRIDVIEW})
  }

  const set_list_view = () => {
    dispatch({type: SET_LISTVIEW})
  }
  const updateSort = (event) => {
    const value = event.target.value
    dispatch({type: UPDATE_SORT, payload: value})
  }

  const clearFilters = () => {

  }
  const updateFilters = (event) => {
    const {name, value} = event.target
    dispatch({type: UPDATE_FILTERS, payload: {name, value}})
  }
  const data = {
    ...state,
    set_grid_view,
    set_list_view,
    updateSort,
    clearFilters,
    updateFilters
  }

  return (
    <FilterContext.Provider value={data}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
