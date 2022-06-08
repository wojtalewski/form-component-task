import { useState } from 'react'
import FormComponent from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='App'>
      <FormComponent setLoading={setLoading}></FormComponent>
    </div>
  )
}

export default App
