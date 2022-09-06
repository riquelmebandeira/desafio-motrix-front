import React, { useState } from 'react'
import './styles.scss'

interface PopupProps {
  heading: string,
  show: boolean,
  setShow: Function,
  onClick: Function
}

const PopupForm: React.FC<PopupProps> = ({ heading, show, setShow, onClick }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div className={`popup-form ${show && 'on'}`}>
      <h1 className="popup-form__title">{heading}</h1>

      <button
        className="popup-form__btn-close"
        onClick={() => setShow(false)}
      >
        Fechar
      </button>

      <form className="popup-form__form">
        <input
          type="text"
          placeholder='Título do conteúdo'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <textarea
          cols={30}
          rows={10}
          placeholder='Corpo do conteúdo'
          value={body}
          onChange={({ target }) => setBody(target.value)}
        />
        <button
          disabled={!title || !body}
          onClick={(e) => { e.preventDefault(); onClick(title, body) }}
          >{heading}
        </button>
      </form>
    </div>
  )
}

export default PopupForm
