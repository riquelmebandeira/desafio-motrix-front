import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

interface searchParams {
  offset: number,
  limit: number
}

export const getContents = createAsyncThunk(
  'content/getContents',
  async ({ offset = 0, limit = 6 }: searchParams, thunkAPI) => {
    const reponse = await api.get(`/contents?offset=${offset}&limit=${limit}`)
    return reponse.data
  }
)

export interface IContent {
  _id: string,
  id?: string,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string
}

interface ContentState {
  data: {
    totalContents: number,
    contents: IContent[]
  }
}

const initialState: ContentState = {
  data: {
    totalContents: 0,
    contents: []
  }
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
