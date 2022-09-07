import React, { useEffect } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import PopupForm from '../../components/PopupForm'
import { useDispatch, useSelector } from 'react-redux'
import { switchOperation } from '../../redux/slices/operation'
import { getContents } from '../../redux/slices/content'
import './styles.scss'
import { AppDispatch, RootState } from '../../redux/store'
import PopupLogs from '../../components/PopupLogs'

const Content: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.content)
  const operation = useSelector((state: RootState) => state.operation)

  useEffect(() => {
    dispatch(getContents())
  }, [])

  return (
    <div>
      <Header />

      <section className="management">
        <button
          className='management__btn'
          onClick={() => dispatch(switchOperation({ type: 'create' }))}
        >
          Novo conteúdo
        </button>
      </section>

      {operation.type && <PopupForm />}
      {operation.type === 'query' && <PopupLogs />}

      <section className="contents">
        {
          data.length > 0 && (
            data.map(({ _id: id, title, body }) => (
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
