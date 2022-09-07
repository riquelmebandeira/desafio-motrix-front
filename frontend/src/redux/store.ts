import { configureStore } from '@reduxjs/toolkit'
import operationReducer from './slices/operation'
import contentReducer from './slices/content'

export const store = configureStore({
  reducer: {
    operation: operationReducer,
    content: contentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
