import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'modules',
  initialState: {
    permissionapp: 'pipeline',
    module: [],
    entity: [],
    pages: [],
    filledData: [],
    newForm: {},
  },
  reducers: {
    userdetail: (state, action) => {
      state.permissionapp = action.payload;
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    setEntity: (state, action) => {
      state.entity = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setFilledData: (state, action) => {
      state.filledData = action.payload;
    },
    setNewform: (state, action) => {
      state.newForm = action.payload;
    },
  },
});
export const {
  setModule,
  userdetail,
  setEntity,
  setPages,
  setFilledData,
  setNewform,
} = userSlice.actions;
export default userSlice.reducer;
