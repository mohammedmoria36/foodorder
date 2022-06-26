import { configureStore } from '@reduxjs/toolkit';
import prodReducer from './features/products/produtsSlice';

const store = configureStore({
    reducer: {
        prods: prodReducer,
    }
})

export default store;