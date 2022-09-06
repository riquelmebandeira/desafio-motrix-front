import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import PopupForm from '../PopupForm'
import api from '../../services/api'
import './styles.scss'

const Content: React.FC = () => {
  const [contents, setContents] = useState<any[]>([])
  const [show, setShow] = useState(false)

  const getContents = () => {
    api.get('/contents')
      .then((response) => setContents(response.data))
      .catch((err) => console.log(err))
  }

  const postContent = (title: string, body: string) => {
    api.post('/contents', { title, body })
      .then(() => getContents())
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getContents()
  }, [])

  return (
    <div>
      <header className="header">
        <h1 className="header__text">Desafio Motrix</h1>
      </header>

      <button
        className='btn-create'
        onClick={() => setShow(true)}
      >
        Novo conteúdo
      </button>

      <PopupForm
        heading="Criar conteúdo"
        show={show}
        setShow={setShow}
        onClick={postContent}
       />

      <section className="contents">
        {
          contents && (
            contents.map(({ _id: id, title }) => (
              <Card key={id} id={id} title={title} />
            ))
          )
        }
      </section>
    </div>
  )
}

export default Content
