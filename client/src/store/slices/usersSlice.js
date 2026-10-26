import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeMyPassword,
  resetUserPassword,
} from '../../services/usersService';

// Thunks
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllUsers();
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await getUserById(id);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const createUserThunk = createAsyncThunk(
  'users/create',
  async (userData, { rejectWithValue }) => {
    try {
      return await createUser(userData);
    } catch (error) {
      return rejectWithValue(extractErrorPayload(error));
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      return await updateUser(id, userData);
    } catch (error) {
      return rejectWithValue(extractErrorPayload(error));
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  'users/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      return await changeMyPassword(passwordData);
    } catch (error) {
      return rejectWithValue(extractErrorPayload(error));
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'users/resetPassword',
  async (id, { rejectWithValue }) => {
    try {
      return await resetUserPassword(id);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Helpers para extraer el mensaje de error
const extractErrorMessage = (error) => {
  if (!error.response) {
    return 'No se pudo conectar con el servidor';
  }
  const { data } = error.response;
  return data.errorMessage || data.message || 'Ocurrió un error';
};

const extractErrorPayload = (error) => {
  if (!error.response) {
    return { message: 'No se pudo conectar con el servidor' };
  }
  const { status, data } = error.response;

  if (status === 400 && data.errors) {
    return { message: data.errorMessage || 'Validación fallida', errors: data.errors };
  }
  return { message: data.errorMessage || data.message || 'Ocurrió un error' };
};


const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  fieldErrors: null,
  resetPasswordData: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    clearUsersError: (state) => {
      state.error = null;
      state.fieldErrors = null;
    },
    clearResetPasswordData: (state) => {
      state.resetPasswordData = null;
    },    
    clearFieldError: (state, action) => {
      if (state.fieldErrors) {
        state.fieldErrors = state.fieldErrors.filter(
          (e) => e.field !== action.payload
        );
      }
    },    
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createUserThunk
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUserThunk.rejected, (state, action) => {
          state.loading = false;
          if (action.payload?.errors) {
            state.fieldErrors = action.payload.errors;
            state.error = null;   // ← no hay error general
          } else {
            state.error = action.payload?.message || 'Error al crear usuario';
            state.fieldErrors = null;
          }
      })

      // updateUserThunk
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.errors) {
          state.fieldErrors = action.payload.errors;
          state.error = null;
        } else {
          state.error = action.payload?.message || 'Error al actualizar usuario';
          state.fieldErrors = null;
        }
      })

      // deleteUserThunk
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // changePasswordThunk
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.errors) {
          state.fieldErrors = action.payload.errors;
          state.error = null;
        } else {
          state.error = action.payload?.message || 'Error al cambiar contraseña';
          state.fieldErrors = null;
        }
      })

      // resetPasswordThunk
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordData = action.payload;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }); 
  },
});

export const { 
  clearUsersError, 
  clearFieldError, 
  clearCurrentUser,
  clearResetPasswordData, 
} = usersSlice.actions;

export default usersSlice.reducer;
