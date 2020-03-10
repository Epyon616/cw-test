export const loginRequestPending = () => {
  return { type: 'LOGIN_REQUEST_PENDING' }
}

export const loginRequestSuccess = (user) => {
  return { type: 'LOGIN_REQUEST_SUCCESS', user }
}

export const loginRequestError = (error) => {
  return { type: 'LOGIN_REQUEST_ERROR', error }
} 