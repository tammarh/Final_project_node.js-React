import { createSlice } from '@reduxjs/toolkit'
const i={
token:null,
user:{},
role:""

}
const tokenSlice = createSlice({
    name: 'token',
    initialState: i,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user , role } = action.payload;
            state.token = token;
            state.user = user;
            state.role = role;
            localStorage.setItem('token', token); // שומר בלוקאל
          },/*
        setToken(state, action) {
            state.token = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setRole(state, action) {
            state.role = action.payload
        },*/
        logOut(state, action) {
            state.token = null;
            state.user = null;
            state.role = null;

        }
    }
})

export const {  logOut, setCredentials } = tokenSlice.actions
export default tokenSlice.reducer

//export const { setToken, logOut,setUser,setRole } = tokenSlice.actions
