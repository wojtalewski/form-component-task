import FormComponent from './components/Form/Form'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='App'>
      <FormComponent></FormComponent>
      <ToastContainer />
    </div>
  )
}

export default App
