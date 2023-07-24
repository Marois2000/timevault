import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signInWithGoogle } from './firebase';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/home';
import { SignIn } from './pages/signin';
import { Edit } from './pages/edit';
import { WeeklyView } from './pages/view';



function App() {
  return (
    <div className="App"> 
      <Router>
          <Routes>
            <Route path='/timevault/' element={<SignIn />} />
            <Route path='/home' element={<Home />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/weekview' element={<WeeklyView />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
