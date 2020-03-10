export const fetchProductsPending = () => {
  return { type: 'FETCH_PRODUCTS_PENDING' }
}

export const fetchProductsSuccess = (products) => {
  return { type: 'FETCH_PRODUCTS_SUCCESS', products }
}

export const fetchProductsError = (error) => {
  return { type: 'FETCH_PRODUCTS_ERROR', error }
} 