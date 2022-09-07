import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import api from '../../services/api'
import './styles.scss'

const ContentDetails = () => {
  const [data, setData] = useState<{title: string, body: string}>()

  const id = window.location.pathname

  useEffect(() => {
    api.get(`/contents/${id}`)
      .then(({ data }) => setData(data))
  }, [])

  return (
    <>
      <Header />
        {
          data && (
            <main className='content-details'>
              <div className="content-details__header">
                <h1 className="content-details__title">{data.title}</h1>
              </div>
              <p className="content-details__body">{data.body}</p>
            </main>
          )
        }
    </>
  )
}

export default ContentDetails
