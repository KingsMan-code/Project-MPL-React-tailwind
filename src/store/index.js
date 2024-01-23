// import { createStore } from 'redux';
// import usuarioReducer from './usuarioReducer';
// import {persistReducer, persistStore} from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'siteeventos',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, usuarioReducer);

// const store = createStore(persistedReducer);
// const persistor = persistStore(store)

// export default { store, persistor };

import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './usuarioReducer';

const store = configureStore({
  reducer: usuarioReducer,
});

export default store;