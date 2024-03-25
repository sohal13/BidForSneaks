import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'


function App() {

  return (
    <>
      <div className='w-full h-screen'>
        <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>

        </Routes>
       </div>
    </>
  )
}

export default App
