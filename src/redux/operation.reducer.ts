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

export const createOperation = createAction('operation/create')
export const updateOperation = createAction<IContent>('operation/update')
export const deleteOperation = createAction('operation/delete')
export const addContentToDelete = createAction<string>('operation/addContentToDelete')
export const readLogsOperation = createAction<string>('operation/readLogs')
export const clearOperation = createAction('operation/clear')

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
    .addCase(deleteOperation, (state, _action) => {
      state.current = OPERATIONS.DELETE
    })
    .addCase(addContentToDelete, (state, action) => {
      state.contentsToDelete.push(action.payload)
    })
    .addCase(readLogsOperation, (state, action) => {
      state.current = OPERATIONS.READ_LOGS
      state.content.id = action.payload
    })
    .addCase(clearOperation, (_state, _action) => {
      return { ...initialState }
    })
})

export default operationReducer
