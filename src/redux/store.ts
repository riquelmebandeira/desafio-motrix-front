import { configureStore } from '@reduxjs/toolkit'
import operationReducer from './operation.reducer'
import contentReducer from './content.slice'

export const store = configureStore({
  reducer: {
    operation: operationReducer,
    content: contentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
