import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../services/authService";
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

// Thunk for register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      return await register(userData);
    } catch (error) {
      if (!error.response) {
        return rejectWithValue({ message: 'No se pudo conectar con el servidor' });
      }
      const { status, data } = error.response;
      if (status === 400 && data.errors) {
        return rejectWithValue({ message: data.errorMessage || 'Validación fallida', errors: data.errors });
      }
      return rejectWithValue({ message: data.errorMessage || data.message || 'Error al registrarse' });
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

  registerLoading: false,
  registerError: null,
  registerFieldErrors: null,
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
    clearRegisterError: (state) => {
      state.registerError = null;
      state.registerFieldErrors = null;
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
      })
   
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerFieldErrors = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        if (action.payload?.errors) {
          state.registerFieldErrors = action.payload.errors;
          state.registerError = null;
        } else {
          state.registerError = action.payload?.message || 'Error al registrarse';
          state.registerFieldErrors = null;
        }
      });  
  },
});

export const { 
  logout, 
  clearError,
  clearRegisterError
 } = authSlice.actions;

export default authSlice.reducer;