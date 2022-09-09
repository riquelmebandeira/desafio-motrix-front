import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContents } from '../../redux/slices/content'
import { switchOperation } from '../../redux/slices/operation'
import { AppDispatch, RootState } from '../../redux/store'
import { createContent, updateContent } from '../../services/api'
import { OPERATIONS } from '../../utils'
import './styles.scss'

const PopupForm: React.FC = () => {
  const { type, data } = useSelector((state: RootState) => state.operation)
  const dispatch = useDispatch<AppDispatch>()
  const [id] = useState(data?.id)
  const [title, setTitle] = useState(data?.title)
  const [body, setBody] = useState(data?.body)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()

    type === OPERATIONS.CREATE
      ? await createContent(title!, body!)
      : await updateContent(id!, title!, body!)

    dispatch(getContents())
    dispatch(switchOperation({ type: '' }))
  }

  return (
    <div className='popup'>
      <h1 className="popup__title">Criar/Editar conteúdo</h1>

      <button
        className="popup__btn-close"
        onClick={() => dispatch(switchOperation({ type: '' }))}
      >
        Fechar
      </button>

      <form className="popup__form">
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
          >Salvar
        </button>
      </form>
    </div>
  )
}

export default PopupForm
