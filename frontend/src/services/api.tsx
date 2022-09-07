import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`
})

export const createContent = async (title: string, body: string) => {
  await api.post('/contents', { title, body })
}

export const updateContent = async (id: string, title: string, body: string) => {
  await api.put(`/contents/${id}`, { title, body })
}

export const deleteContent = async (id: string) => {
  await api.delete(`/contents/${id}`)
}

export default api
