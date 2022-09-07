import { switchOperation } from '../../redux/slices/operation'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { IContent } from '../../redux/slices/content'
import { Link } from 'react-router-dom'

const PopupLogs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.operation)
  const [logs, setLogs] = useState<IContent[]>([])

  console.log(data)

  useEffect(() => {
    api.get(`/contents/${data?.id}/logs`)
      .then(({ data }) => setLogs(data))
  }, [])

  return (
    <div className="popup">
      <h1 className="popup__title">Histórico de modificações</h1>

      <button
        className="popup__btn-close"
        onClick={() => dispatch(switchOperation({ type: '' }))}
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
