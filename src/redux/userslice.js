import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    orgdetail: {},
    industry: {},
    role: '',
    companyBusisness: {},
    appDetail: {},
  },
  reducers: {
    userdetail: (state, action) => {
      state.email = action.payload;
    },
    setuserOrg: (state, action) => {
      state.orgdetail = action.payload;
    },
    setIndustryDetail: (state, action) => {
      state.industry = action.payload;
    },
    setCompanyBusiness: (state, action) => {
      state.companyBusisness = action.payload;
    },
    setRoleRedux: (state, action) => {
      state.role = action.payload;
    },
    setApp: (state, action) => {
      state.appDetail = action.payload;
    },
  },
});

export const {
  userdetail,
  setuserOrg,
  setIndustryDetail,
  setRoleRedux,
  setCompanyBusiness,
  setApp,
} = userSlice.actions;
export default userSlice.reducer;
