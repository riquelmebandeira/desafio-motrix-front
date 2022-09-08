import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import PopupForm from '../../components/PopupForm'
import { useDispatch, useSelector } from 'react-redux'
import { switchOperation } from '../../redux/slices/operation'
import { getContents } from '../../redux/slices/content'
import './styles.scss'
import { AppDispatch, RootState } from '../../redux/store'
import PopupLogs from '../../components/PopupLogs'
import { sortByTitle, sortByUpdatedAt } from '../../utils'

const Content: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: contents } = useSelector((state: RootState) => state.content)
  const operation = useSelector((state: RootState) => state.operation)
  const [orderBy, setOrderBy] = useState('createdAt')

  useEffect(() => {
    dispatch(getContents())
  }, [])

  // Não é necessário ordenar o array para a opção 'createdAt', pois
  // os conteúdos já vem em ordem de criação originalmente
  const orderedContents = orderBy === 'updatedAt' ? sortByUpdatedAt(contents) : sortByTitle(contents)

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

        <button
          className='management__create-btn'
          onClick={() => dispatch(switchOperation({ type: 'create' }))}
        >
        Novo conteúdo
        </button>
      </section>

      {operation.type && <PopupForm />}
      {operation.type === 'query' && <PopupLogs />}

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
                  />
                ))
              )
        }
      </section>
    </div>
  )
}

export default Content
