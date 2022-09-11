import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContents } from '../../redux/content.slice'
import { clearOperation } from '../../redux/operation.reducer'
import { AppDispatch, RootState } from '../../redux/store'
import { createContent, updateContent } from '../../services/api'
import { OPERATIONS } from '../../utils'
import './styles.scss'

const PopupForm: React.FC = () => {
  const { current, content } = useSelector((state: RootState) => state.operation)
  const dispatch = useDispatch<AppDispatch>()
  const [id] = useState(content?.id)
  const [title, setTitle] = useState(content?.title)
  const [body, setBody] = useState(content?.body)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()

    current === OPERATIONS.CREATE
      ? await createContent(title!, body!)
      : await updateContent(id!, title!, body!)

    dispatch(getContents({ limit: 6, offset: 0 }))
    dispatch(clearOperation())
  }

  return (
    <div className='popup'>
      <h1 className="popup__title">Criar/Editar conteúdo</h1>

      <button
        className="popup__btn-close"
        onClick={() => dispatch(clearOperation())}
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
