import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaRegClock, FaPen } from 'react-icons/fa'
import { getContents } from '../../redux/content.slice'
import { deleteContent } from '../../services/api'
import { addContentToDelete, readLogsOperation, updateOperation } from '../../redux/operation.reducer'
import './styles.scss'
import { OPERATIONS } from '../../utils'

interface CardProps {
  id: string,
  title: string
  body: string
}

const Card: React.FC<CardProps> = ({ id, title, body }) => {
  const dispatch = useDispatch<AppDispatch>()
  const operation = useSelector((state: RootState) => state.operation)

  const handleUpdate = () => { dispatch(updateOperation({ id, title, body })) }
  const handleDelete = () => {
    deleteContent(id).then(() => dispatch(getContents({ limit: 6, offset: 0 }))
    )
  }
  const handleReadLogs = () => { dispatch(readLogsOperation(id)) }

  return (
    <div className="card">
      {
        operation.current === OPERATIONS.DELETE
          ? <input
            type="checkbox"
            className="card__delete-checkbox"
            onClick={() => dispatch(addContentToDelete(id))}
            />
          : (
            <ul className="card__operations">
              <li onClick={() => handleReadLogs()}><FaRegClock /></li>
              <li onClick={() => handleUpdate()}><FaPen /></li>
              <li onClick={() => handleDelete()}><FaTrashAlt /></li>
            </ul>
            )
      }

      <Link to={`/${id}`}>
        <div className="card__img"></div>
        <h3 className="card__title">{title}</h3>
      </Link>
    </div>
  )
}

export default Card
