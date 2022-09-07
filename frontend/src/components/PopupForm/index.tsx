import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContents } from '../../redux/slices/content'
import { toggleOperation } from '../../redux/slices/operation'
import { AppDispatch, RootState } from '../../redux/store'
import api from '../../services/api'
import './styles.scss'

const PopupForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const operation = useSelector((state: RootState) => state.operation)
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()
    await api.post('/contents', { title, body })
    dispatch(getContents())
    dispatch(toggleOperation(''))
    setTitle('')
    setBody('')
  }

  if (operation.type) {
    return (
    <div className='popup-form'>
      <h1 className="popup-form__title">Criar conteúdo</h1>

      <button
        className="popup-form__btn-close"
        onClick={() => dispatch(toggleOperation(''))}
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
          onClick={(event) => handleClick(event)}
          >Criar conteúdo
        </button>
      </form>
    </div>
    )
  } else return null
}

export default PopupForm
