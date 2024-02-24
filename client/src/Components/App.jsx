import Loginpage from '../Pages/Loginpage';
import NotesPages from '../Pages/NotesPages';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {

  return (

    <div>
      <BrowserRouter>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
          </ul>
          <Routes>
              <Route index element={<NotesPages/>}/>
              <Route path='/login' element={<Loginpage/>}/>
          </Routes>
      </BrowserRouter>
    </div>

  )
}
export default App
