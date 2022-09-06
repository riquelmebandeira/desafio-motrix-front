import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import './styles.scss'

interface LocationState {
  title: string
  body: string
}

const ContentDetails = () => {
  const location = useLocation()
  const { title, body } = location.state as LocationState

  return (
    <>
      <Header />
      <main className='content-details'>
        <div className="content-details__header">
          <h1 className="content-details__title">{title}</h1>
        </div>
        <p className="content-details__body">{body}</p>
      </main>
    </>
  )
}

export default ContentDetails
