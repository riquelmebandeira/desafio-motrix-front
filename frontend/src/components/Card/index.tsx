import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaRegClock, FaPen } from 'react-icons/fa'
import { switchOperation } from '../../redux/slices/operation'
import './styles.scss'
import { getContents } from '../../redux/slices/content'
import { deleteContent } from '../../services/api'

interface CardProps {
  id: string,
  title: string
  body: string
}

const Card: React.FC<CardProps> = ({ id, title, body }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleUpdate = () => {
    dispatch(switchOperation(
      { type: 'update', data: { id, title, body } }
    ))
  }

  const handleDelete = () => {
    deleteContent(id).then(() => dispatch(getContents()))
  }

  return (
    <div className="card">
      <ul className="card__operations">
        <li><FaRegClock /></li>
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
