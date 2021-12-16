import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element={<UserLogin/>}/>
        <Route path='/home' element = {<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
