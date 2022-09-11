import React from 'react'
import './styles.scss'

interface IPagination {
  limit: number
  offset: number,
  setOffset: Function,
  total: number
}

const Pagination: React.FC<IPagination> = ({ total, limit, offset, setOffset }) => {
  const TOTAL_BUTTONS = 5
  const SIDE_BUTTONS = (TOTAL_BUTTONS - 1) / 2
  const CURRENT_PAGE = offset ? (offset / limit + 1) : 1
  const TOTAL_PAGES = total / limit

  const FIRST_PAGE = CURRENT_PAGE >= TOTAL_PAGES - SIDE_BUTTONS
    ? TOTAL_PAGES - TOTAL_BUTTONS + 1
    : Math.max(CURRENT_PAGE - SIDE_BUTTONS, 1)

  return (
    <ul className="pagination">
      <li>
        <button
          className='pagination__named-btn'
          onClick={() => setOffset(offset - limit)}
          disabled={CURRENT_PAGE === 1}
        >
          Anterior
        </button>
      </li>
      {
        Array.from({ length: Math.min(TOTAL_BUTTONS, TOTAL_PAGES) })
          .map((_, index) => (FIRST_PAGE + index))
          .map((page) => (
            <li key={page}>
              <button
                onClick={() => setOffset((page - 1) * limit)}
                className={CURRENT_PAGE === page
                  ? 'pagination__btn pagination__btn--active'
                  : 'pagination__btn'}
              >
                {page}
              </button>
          </li>
          ))
      }
      <li>
        <button
          className='pagination__named-btn'
          onClick={() => setOffset(offset + limit)}
          disabled={CURRENT_PAGE === TOTAL_PAGES}
        >
          Próxima
        </button>
      </li>
    </ul>
  )
}

export default Pagination
