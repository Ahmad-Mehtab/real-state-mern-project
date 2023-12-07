import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    loading: false
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            // state.userData = action.payload.userData;
            // console.log('action.payload.userData: ', action.payload.userData);
        },
        signInSuccess: (state, action) => {
           
            state.loading = false;
            state.userData = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        }
    },
})

export const { signInStart, signInSuccess, signInFailure } = authSlice.actions
export default authSlice.reducer