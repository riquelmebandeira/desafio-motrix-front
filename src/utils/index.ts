import { IContent } from '../redux/slices/content'

export const sortByTitle = (contents: IContent[]) => (
  [...contents].sort((a, b) => a.title.localeCompare(b.title))
)

export const sortByUpdatedAt = (contents: IContent[]) => (
  [...contents].sort((a, b) =>
    b.updatedAt > a.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
  )
)
