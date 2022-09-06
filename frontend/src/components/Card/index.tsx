import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

interface CardProps {
  id: string,
  title: string
  body: string
}

const Card: React.FC<CardProps> = ({ id, title, body }) => {
  return (
    <div className="card">
      <Link to={`/${id}`} state={{ title, body }}>
        <div className="card__img"></div>
        <h3 className="card__title">{title}</h3>
      </Link>
    </div>
  )
}

export default Card
