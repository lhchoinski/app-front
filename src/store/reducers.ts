import { combineReducers  } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userSlice from './slices/index';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    user: userSlice,
});

export default rootReducer;
