import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaRegClock, FaPen } from 'react-icons/fa'
import { switchOperation } from '../../redux/slices/operation'
import './styles.scss'

interface CardProps {
  id: string,
  title: string
  body: string
}

const Card: React.FC<CardProps> = ({ id, title, body }) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="card">
      <ul className="card__operations">
        <li><FaRegClock /></li>

        <li onClick={() => dispatch(switchOperation({ type: 'update', data: { id, title, body } }))}>
          <FaPen />
        </li>

        <li><FaTrashAlt /></li>
      </ul>

      <Link to={`/${id}`} state={{ title, body }}>
        <div className="card__img"></div>
        <h3 className="card__title">{title}</h3>
      </Link>
    </div>
  )
}

export default Card
