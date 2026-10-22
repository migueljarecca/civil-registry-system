import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/authService";
import { decodeJwt } from "../../utils/jwt";

// Thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',

    async (credentials, { rejectWithValue }) => {

    try {
      const data = await login(credentials);
      const user = decodeJwt(data.token);

      localStorage.setItem('token', data.token);

      return { token: data.token, user };

    } catch (error) {
       
        if (!error.response) {
            return rejectWithValue('No se pudo conectar con el servidor');
        }
        const message = error.response.data?.message || 'Error al iniciar sesión';
        return rejectWithValue(message);
    }
  }
);


const token = localStorage.getItem('token');

const initialState = {
  user: token ? decodeJwt(token) : null,
  token: token || null,
  loading: false,
  error: null,
  isAuthenticated: Boolean(token),
};


const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;