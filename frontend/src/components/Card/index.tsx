import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

interface CardProps {
  id: string,
  title: string
}

const Card: React.FC<CardProps> = ({ id, title }) => {
  return (
    <div className="card">
      <Link to={`/${id}`}>
        <div className="card__img"></div>
        <h3 className="card__title">{title}</h3>
      </Link>
    </div>
  )
}

export default Card
