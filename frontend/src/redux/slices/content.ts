import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const getContents = createAsyncThunk(
  'content/getContents',
  async () => {
    const reponse = await api.get('/contents')
    return reponse.data
  }
)

export interface IContent {
  _id: string,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string
}

interface ContentState {
  data: IContent[]
}

const initialState: ContentState = {
  data: []
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContents.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default contentSlice.reducer
