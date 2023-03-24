import { configureStore } from '@reduxjs/toolkit'
import products from './slices/productsSlice'
import warehouse from './slices/warehouseSlice'
import operation from './slices/operationSlice'

export const store = configureStore({
    reducer: {
        products: products,
        warehouse: warehouse,
        operation: operation
    },
    devTools: process.env.NODE_ENV !== 'production'
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch