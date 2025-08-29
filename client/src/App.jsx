
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ListItems from './components/ListItems'
import NotesItems from './components/NotesItems'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>

      <Route path='/signup' element={<Signup />}/>
      <Route path='/todo-items' element={<ListItems />}/>
      <Route path='/notes-items' element={<NotesItems />}/>
    </Routes>
    </>
  )
}

export default App
