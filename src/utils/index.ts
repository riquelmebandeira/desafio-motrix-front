import { IContent } from '../redux/content.slice'

export const sortByTitle = (contents: IContent[]) => (
  [...contents].sort((a, b) => a.title.localeCompare(b.title))
)

export const sortByUpdatedAt = (contents: IContent[]) => (
  [...contents].sort((a, b) =>
    b.updatedAt > a.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
  )
)

export const OPERATIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  READ_LOGS: 'READ_LOGS',
  NONE: 'NONE'
}
