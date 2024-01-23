import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './usuarioReducer';

const store = configureStore({
  reducer: usuarioReducer,
});

export default store;