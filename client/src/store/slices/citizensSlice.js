import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllCitizens,
  getCitizenById,
  createCitizen,
  updateCitizen,
  deleteCitizen,
} from '../../services/citizenService';

// Helpers for extracting the error message
const extractErrorMessage = (error) => {
  if (!error.response) return 'No se pudo conectar con el servidor';
  const { data } = error.response;
  return data.errorMessage || data.message || 'Ocurrió un error';
};

const extractErrorPayload = (error) => {
  if (!error.response) return { message: 'No se pudo conectar con el servidor' };
  const { status, data } = error.response;
  if (status === 400 && data.errors) {
    return { message: data.errorMessage || 'Validación fallida', errors: data.errors };
  }
  return { message: data.errorMessage || data.message || 'Ocurrió un error' };
};

// Thunks
export const fetchAllCitizens = createAsyncThunk(
  'citizens/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCitizens();
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchCitizenById = createAsyncThunk(
  'citizens/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await getCitizenById(id);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createCitizenThunk = createAsyncThunk(
  'citizens/create',
  async (citizenData, { rejectWithValue }) => {
    try {
      return await createCitizen(citizenData);
    } catch (error) {
      return rejectWithValue(extractErrorPayload(error));
    }
  },
);

export const updateCitizenThunk = createAsyncThunk(
  'citizens/update',
  async ({ id, citizenData }, { rejectWithValue }) => {
    try {
      return await updateCitizen(id, citizenData);
    } catch (error) {
      return rejectWithValue(extractErrorPayload(error));
    }
  },
);

export const deleteCitizenThunk = createAsyncThunk(
  'citizens/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCitizen(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

const initialState = {
  citizens: [],
  currentCitizen: null,
  loading: false,
  error: null,
  fieldErrors: null,
};

const citizensSlice = createSlice({
  name: 'citizens',
  initialState,
  reducers: {
    clearCitizensError: (state) => {
      state.error = null;
      state.fieldErrors = null;
    },
    clearFieldError: (state, action) => {
      if (state.fieldErrors) {
        state.fieldErrors = state.fieldErrors.filter((e) => e.field !== action.payload);
      }
    },
    clearCurrentCitizen: (state) => {
      state.currentCitizen = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAllCitizens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCitizens.fulfilled, (state, action) => {
        state.loading = false;
        state.citizens = action.payload;
      })
      .addCase(fetchAllCitizens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchById
      .addCase(fetchCitizenById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitizenById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCitizen = action.payload;
      })
      .addCase(fetchCitizenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createCitizenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(createCitizenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.citizens.push(action.payload);
      })
      .addCase(createCitizenThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.errors) {
          state.fieldErrors = action.payload.errors;
          state.error = null;
        } else {
          state.error = action.payload?.message || 'Error al crear ciudadano';
          state.fieldErrors = null;
        }
      })

      // update
      .addCase(updateCitizenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(updateCitizenThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.citizens.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.citizens[index] = action.payload;
      })
      .addCase(updateCitizenThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.errors) {
          state.fieldErrors = action.payload.errors;
          state.error = null;
        } else {
          state.error = action.payload?.message || 'Error al actualizar ciudadano';
          state.fieldErrors = null;
        }
      })

      // delete
      .addCase(deleteCitizenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCitizenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.citizens = state.citizens.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCitizenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCitizensError, clearFieldError, clearCurrentCitizen } = citizensSlice.actions;

export default citizensSlice.reducer;
