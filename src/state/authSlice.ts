import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authRequest from "../services/requests/authRequest";
import { AuthState } from "../typings";

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null
};

export const loginUser = createAsyncThunk("auth/loginUserStatus", async ([username,password]:string[], thunkApi)=>{
    const response = await authRequest.loginUser(username, password);
    if (response.status === "200"){
        localStorage.setItem("token", response.data["access_token"])
        localStorage.setItem("refreshToken", response.data["refresh_token"])
        return response.data
    }

})

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthState(state: AuthState, action: PayloadAction<{refresToken:string, token:string}>){
            state.refreshToken = action.payload.refresToken
            state.token = action.payload.token
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(loginUser.fulfilled, (state, action) => {
            
            state.token = action?.payload?.token
            state.refreshToken = action?.payload?.refreshToken
        });
    }
});


export const  {setAuthState} = authSlice.actions;

export default authSlice.reducer;