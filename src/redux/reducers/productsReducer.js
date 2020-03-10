const productsReducer = (state=[], action) => {
  switch (action.type) {
    case 'FETCH_PROUCTS_PENDING': 
      return {
        ...state,
        pending: true,
      }
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        pending: false,
        products: action.products,
      }
    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
    }
}

export default productsReducer;