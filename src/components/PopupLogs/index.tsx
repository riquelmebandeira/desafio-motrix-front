import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { IContent } from '../../redux/content.slice'
import { Link } from 'react-router-dom'
import { clearOperation } from '../../redux/operation.reducer'

const PopupLogs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { content } = useSelector((state: RootState) => state.operation)
  const [logs, setLogs] = useState<IContent[]>([])

  useEffect(() => {
    api.get(`/contents/${content?.id}/logs`)
      .then((response) => setLogs(response.data))
  }, [])

  return (
    <div className="popup">
      <h1 className="popup__title">Histórico de modificações</h1>

      <button
        className="popup__btn-close"
        onClick={() => dispatch(clearOperation())}
      >
        Fechar
      </button>

      <ul className="popup__list">
        {
          logs.map((log, index) => (
            <Link to={log._id} key={index}>
              <li className="popup__item" >
                <span>{log.title}</span>
                <span>{log.updatedAt}</span>
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  )
}

export default PopupLogs
