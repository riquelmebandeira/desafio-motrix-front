import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import PopupForm from '../../components/PopupForm'
import { useDispatch, useSelector } from 'react-redux'
import { getContents } from '../../redux/content.slice'
import { AppDispatch, RootState } from '../../redux/store'
import PopupLogs from '../../components/PopupLogs'
import { OPERATIONS, sortByTitle, sortByUpdatedAt } from '../../utils'
import { clearOperation, createOperation, deleteOperation } from '../../redux/operation.reducer'
import './styles.scss'
import { massDelete } from '../../services/api'
import Pagination from '../../components/Pagination'

const Content: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { contents, totalContents } = useSelector((state: RootState) => state.content.data)
  const operation = useSelector((state: RootState) => state.operation)
  const [orderBy, setOrderBy] = useState('createdAt')
  const [offset, setOffset] = useState(0)

  const limit = 6

  useEffect(() => {
    dispatch(getContents({ limit, offset }))
  }, [])

  useEffect(() => {
    dispatch(getContents({ limit, offset }))
  }, [offset])

  // Não é necessário ordenar o array para a opção 'createdAt', pois
  // os conteúdos já vem em ordem de criação originalmente
  const orderedContents = orderBy === 'updatedAt'
    ? sortByUpdatedAt(contents)
    : sortByTitle(contents)

  const handleMassDelete = () => {
    if (operation.contentsToDelete.length > 0) {
      massDelete(operation.contentsToDelete)
        .then(() => dispatch(clearOperation()))
        .then(() => dispatch(getContents({ limit: 6, offset: 0 }))
        )
    } else {
      dispatch(deleteOperation())
    }
  }

  return (
    <div>
      <Header />

      <section className="management">
        <form className="management__form">
          <label htmlFor="order">Ordene o conteúdo por:</label>
          <select name="order" id="order" onChange={(e) => setOrderBy(e.target.value)}>
            <option value="createdAt">Data de criação</option>
            <option value="updatedAt">Data de atualização</option>
            <option value="title">Título</option>
          </select>
        </form>

        {
          operation.current === OPERATIONS.DELETE &&
          <button
            className='management__btn'
            onClick={() => dispatch(clearOperation())}
          >Cancelar
          </button>
        }

        <button
        className='management__btn'
        onClick={() => handleMassDelete()}
        >Apagar Conteúdos
        </button>

        <button
          className='management__btn'
          onClick={() => dispatch(createOperation())}
        >Novo conteúdo
        </button>
      </section>

      {operation.current === OPERATIONS.CREATE && <PopupForm />}
      {operation.current === OPERATIONS.UPDATE && <PopupForm />}
      {operation.current === OPERATIONS.READ_LOGS && <PopupLogs />}

      <section className="contents">
        {
          orderBy !== 'createdAt'
            ? (
                orderedContents.map(({ _id: id, title, body }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    body={body}
                    offset={offset}
                  />
                ))
              )
            : (
                contents.map(({ _id: id, title, body }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    body={body}
                    offset={offset}
                  />
                ))
              )
        }
      </section>
      <Pagination
        total={totalContents}
        limit={limit}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  )
}

export default Content
