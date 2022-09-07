import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OperationState {
  type: string
  data?: {
    id: string,
    title: string,
    body: string
  }
}

const initialState: OperationState = {
  type: ''
}

const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    switchOperation: (state, action: PayloadAction<OperationState>) => {
      if (action.payload.type !== 'create') {
        return action.payload
      }

      return {
        type: action.payload.type
      }
    }
  }
})

export const { switchOperation } = operationSlice.actions

export default operationSlice.reducer
