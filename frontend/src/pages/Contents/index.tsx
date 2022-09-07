import React, { useEffect } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import PopupForm from '../../components/PopupForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleOperation } from '../../redux/slices/operation'
import { getContents } from '../../redux/slices/content'
import './styles.scss'
import { AppDispatch, RootState } from '../../redux/store'

const Content: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.content)

  useEffect(() => {
    dispatch(getContents())
  }, [])

  return (
    <div>
      <Header />

      <button
        className='btn-create'
        onClick={() => dispatch(toggleOperation('create'))}
      >
        Novo conteúdo
      </button>

      <PopupForm />

      <section className="contents">
        {
          data.length > 0 && (
            data.map(({ _id: id, title, body }) => (
              <Card key={id} id={id} title={title} body={body} />
            ))
          )
        }
      </section>
    </div>
  )
}

export default Content
