import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/Users';
import { authService } from '../services/authService';

export interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  hasError: false,
  errorMessage: '',
};

export const register = createAsyncThunk(
	'user/register',
	async (user: User, { rejectWithValue }) => {
		try {
			const response = await authService.register(user);
			return response;
		} catch (error) {
			console.error('Error creating user:', error);
            return rejectWithValue({
                message: (error instanceof Error ? error.message : 'Failed to save user data'),
            });
		}
	}
);

export const signin = createAsyncThunk(
	'user/signin',
	async (user: User, { rejectWithValue }) => {
		try {
			const response = await authService.signin(user);
            if(response && response.error) {
                console.error('Error signing in first:', response.message);
                throw new Error(response.message);
            }
            
            if (!response || !response.data || !response.data.token) {
                throw new Error('Invalid response structure');
            }

            // Save user token in localStorage or state
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', user.email || '');

            return {
                user,
                token: response?.data?.token
            };
		} catch (error) {
            return rejectWithValue({
                message: (error instanceof Error ? error.message : 'Failed sign in'),
            });
		}
	}
);

export const signout = createAsyncThunk('user/signout', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState() as { user: UserState };
        const token = state.user.token;

        // TODO: LLamar a backend para invalidar el token

        if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        } else {
            console.warn('No hay token activo.');
        }
        return { message: 'Sesión finalizada correctamente.' };
    } catch (error) {
        console.error('Error durante signout:', error);
        return rejectWithValue({
            message: (error instanceof Error ? error.message : 'No se pudo cerrar sesión'),
        });
    }
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
    })
    .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
    })
    .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.error.message || '';
    })
    .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
    })
    .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {...action.payload.user };
        state.token = action.payload.token;
    })
    .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = (action.payload as { message: string }).message || '';
    }
    )
    .addCase(signout.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
    })
    .addCase(signout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
    })
    .addCase(signout.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.error.message || '';
    });
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
