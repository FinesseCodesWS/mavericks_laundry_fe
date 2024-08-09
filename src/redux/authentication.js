// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'


const initialUser = () => {
  const item = window.localStorage.getItem('userPOSData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : null
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userPOSData: initialUser()
  },
  reducers: {

    handlePOSLogin: (state, action) => {
      state.userPOSData = action.payload['staff']
      state['auth_pos_token'] = action.payload['token']


     
      localStorage.setItem('userPOSData', JSON.stringify(action.payload['staff']))
      localStorage.setItem('auth_pos_token', JSON.stringify(action.payload.token))

      
    },


    handlePOSProfileUpdate: (state, action) => {
      state.userPOSData = action.payload
      localStorage.setItem('userPOSData', JSON.stringify(action.payload))
    },

    handlePOSLogout: state => {
      // console.log('here')
      state.userPOSData = {}
      state['auth_pos_token'] = null

      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('auth_pos_token')
      localStorage.removeItem('userPOSData')
    }
  }
})

export const { handlePOSLogin, handlePOSProfileUpdate,  handlePOSLogout} = authSlice.actions

export default authSlice.reducer
