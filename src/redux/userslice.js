import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    orgdetail: {},
    industry: '',
    role: '',
  },
  reducers: {
    userdetail: (state, action) => {
      state.email = action.payload;
    },
    setuserOrg: (state, action) => {
      state.orgdetail = action.payload;
    },
    setIndustry: (state, action) => {
      state.industry = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { userdetail, setuserOrg } = userSlice.actions;
export default userSlice.reducer;
