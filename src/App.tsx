import { resources } from './assets/data'
import { EventManager } from './components'

function App() {
  return (
    <>
      <EventManager data={resources} />
    </>
  )
}

export default App
