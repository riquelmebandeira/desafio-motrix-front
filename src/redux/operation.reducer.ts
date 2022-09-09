import { createAction, createReducer } from '@reduxjs/toolkit'
import { OPERATIONS } from '../utils'

interface IContent {
  id: string,
  title: string,
  body: string
}

interface operationState {
  current: string,
  content: {
    id: string,
    title: string,
    body: string
  },
  contentsToDelete: string[]
}

export const deleteOperation = createAction<string>('operation/delete')
export const clearOperation = createAction('operation/clear')
export const createOperation = createAction('operation/create')
export const updateOperation = createAction<IContent>('operation/update')
export const readLogsOperation = createAction<string>('operation/read_logs')

const initialState = {
  current: '',
  content: {
    id: '',
    title: '',
    body: ''
  },
  contentsToDelete: []
} as operationState

const operationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createOperation, (state, _action) => {
      state.current = OPERATIONS.CREATE
    })
    .addCase(updateOperation, (state, action) => {
      state.current = OPERATIONS.UPDATE
      state.content = { ...action.payload }
    })
    .addCase(deleteOperation, (state, action) => {
      state.current = OPERATIONS.DELETE
      state.contentsToDelete = [...state.contentsToDelete, action.payload]
    })
    .addCase(readLogsOperation, (state, action) => {
      state.current = OPERATIONS.READ_LOGS
      state.content = { id: action.payload, title: '', body: '' }
    })
    .addCase(clearOperation, (_state, _action) => {
      return { ...initialState }
    })
})

export default operationReducer
