import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaRegClock, FaPen } from 'react-icons/fa'
import { getContents } from '../../redux/content.slice'
import { deleteContent } from '../../services/api'
import { readLogsOperation, updateOperation } from '../../redux/operation.reducer'
import './styles.scss'

interface CardProps {
  id: string,
  title: string
  body: string
}

const Card: React.FC<CardProps> = ({ id, title, body }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleUpdate = () => { dispatch(updateOperation({ id, title, body })) }
  const handleDelete = () => { deleteContent(id).then(() => dispatch(getContents())) }
  const handleReadLogs = () => { dispatch(readLogsOperation(id)) }

  return (
    <div className="card">
      <ul className="card__operations">
        <li onClick={() => handleReadLogs()}><FaRegClock /></li>
        <li onClick={() => handleUpdate()}><FaPen /></li>
        <li onClick={() => handleDelete()}><FaTrashAlt /></li>
      </ul>

      <Link to={`/${id}`}>
        <div className="card__img"></div>
        <h3 className="card__title">{title}</h3>
      </Link>
    </div>
  )
}

export default Card
