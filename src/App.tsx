import { useMemo, useState } from 'react'
import { ClickData, MonthYear, Page, Resource } from '.'
import { resources } from './assets/data'
import { EventManager } from './components'
import { Pagination, TextField } from '@mui/material'

function App() {
  const pageSize = 10
  const [page, setPage] = useState<Page>({
    current: 1,
    size: pageSize,
    count: Math.ceil(resources.length / pageSize),
    total: resources.length,
  })
  const [data, setData] = useState<Resource[]>([])
  const [loading, setLoading] = useState(false)

  // This can be any async fetch function
  // This function is triggered my page change
  useMemo(() => {
    setLoading(true)
    setTimeout(() => {
      const data = resources.slice(
        (page.current - 1) * page.size,
        page.current * page.size,
      )
      setData(data)
      setLoading(false)
    }, 500)
  }, [page])

  const handleClick = (data: ClickData) => {
    console.log(data)
  }
  const handleUpdate = (date: MonthYear) => {
    console.log(date)
  }

  const handleSearch = (text: string) => {
    console.log(text)
  }

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage({ ...page, current: newPage })
  }

  return (
    <>
      <EventManager
        data={data}
        loading={loading}
        showTooltip
        showLegend
        search={
          <TextField
            variant='standard'
            label='Search'
            onChange={(e) => handleSearch(e.target.value)}
          />
        }
        pagination={
          <Pagination
            count={page.count}
            page={page.current}
            onChange={handleChangePage}
          />
        }
        onClick={handleClick}
        onUpdateDate={handleUpdate}
      />
    </>
  )
}

export default App
