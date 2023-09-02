import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAsync = createAsyncThunk(
    "user/login",
    async (formValues, {dispatch}) => {
        dispatch(login(formValues));
        dispatch(setErrors(''));

        try {
            const resp = await axios({
                method: 'post',
                url: '/api/v1/auth/login',
                data: formValues,
            })

            if(resp.status === 201) {
                localStorage.setItem('token', resp.data.token);
                dispatch(login(resp.data));
            } else {
                throw new Error(resp.data.message);
            }
        } catch (error) {
            dispatch(setErrors(error));
        }
    }
);

export const regAsync = createAsyncThunk(
    "user/reg",
    async (formValues, { dispatch}) => {
        dispatch(reg(formValues));
        dispatch(setErrors(''));

        try {
            const resp = await axios({
                method: "post",
                url: "/api/v1/auth/reg",
                data: formValues,
            });

            if (resp.status === 201) {
                localStorage.setItem("token", resp.data.token);
                dispatch(reg(resp.data));
            } else {
                throw new Error(resp.data.message);
            }
        } catch (error) {
            dispatch(setErrors(error));
        }
    }
);

export const logOutAsync = createAsyncThunk(
    "user/logOut",
    async (formValues, { dispatch}) => {
        dispatch(logOut());
        // try {
        //     const resp = await axios({
        //         method: "post",
        //         url: "/api/v1/auth/logout",
        //     })

        //     if(resp.status === 200) {
        //         dispatch(logOut());
        //     } else {
        //         throw new Error(resp.data.message);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
)

const initialState = {
    current_user: {},
    token: null,
    isAuth: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            // state.current_user = payload.user;
            // state.token = payload.token;

            state.current_user = payload;
            state.isAuth = true;
        },
        reg: (state, { payload }) => {
            // state.current_user = payload.user;
            // state.token = payload.token;

            state.current_user = payload;
            state.isAuth = true;
        },
        logOut: (state) => {
            state.isAuth = false;
            state.token = null;
            state.current_user = {};
        },
        setErrors: (state, { payload }) => {
            state.error = payload;
        },
    },
});

export const getCurrentUser = (state) => state.user.current_user;
export const getIsAuth = (state) => state.user.isAuth;
export const getError = (state) => state.user.error;
export const getRespStatus = (state) => state.user.resp_status;
export default userSlice.reducer;
export const { login, reg, setErrors, logOut } = userSlice.actions;
