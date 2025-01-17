import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticatedUser } from '../../types/IUser';

const initialState = {
    userData: null as IAuthenticatedUser | null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IAuthenticatedUser>) {
            state.userData = action.payload;
        },
        clearUser(state) {
            state.userData = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
