import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../redux/userslice';

const userstore = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default userstore;
