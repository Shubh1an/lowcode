import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../redux/userslice';

const userstore = configureStore({
  reducer: {
    modules: userSlice,
  },
});
export default userstore;
