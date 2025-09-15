
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ListItems from './components/ListItems'
import NotesItems from './components/NotesItems'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>

      <Route path='/signup' element={<Signup />}/>
      <Route path='/todo-items' element={<ListItems />}/>
      <Route path='/notes-items' element={<NotesItems />}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
