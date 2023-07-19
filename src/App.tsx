import { ClickData, MonthYear } from '.'
import { resources } from './assets/data'
import { EventManager } from './components'

function App() {
  const handleClick = (data: ClickData) => {
    console.log(data)
  }
  const handleUpdate = (date: MonthYear) => {
    console.log(date)
  }

  return (
    <>
      <EventManager
        data={resources}
        showTooltip
        showLegend
        onClick={handleClick}
        onUpdateDate={handleUpdate}
      />
    </>
  )
}

export default App
