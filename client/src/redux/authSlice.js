import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInStart: (state, action) => {
            state.loading = false;
            // state.userData = action.payload.userData;
            // console.log('action.payload.userData: ', action.payload.userData);
        },
        signInSuccess: (state, action) => {
            state.loading = true;
            state.userData = action.payload.userData;
        },
        signInFailure: (state, action) => {
            state.loading = true;
            state.userData = action.payload.userData;
        }
    },
})

export const { signInStart, signInSuccess, signInFailure } = authSlice.actions
export default authSlice.reducer