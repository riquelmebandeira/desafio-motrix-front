import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface operationState {
  type: string
}

const initialState: operationState = {
  type: ''
}

const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    toggleOperation: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    }
  }
})

export const { toggleOperation } = operationSlice.actions

export default operationSlice.reducer
