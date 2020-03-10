const authenticationReducer = (state=[], action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING': 
      return {
        ...state,
        pending: true,
      }
    case 'LOGIN_REQUEST_SUCCESS':
      return {
        ...state,
        pending: false,
        user: action.user,
      }
    case 'LOGIN_REQUEST_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
    }
}

export default authenticationReducer;