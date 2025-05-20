import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupervisorNavBar from './components/NavBar/SupervisorNavBar'
//import LoginForm from './features/auth/LoginForm'

function App() {
  return (
   <>
   {/* <LoginForm/> */}
   <h1>hello</h1>
  <Router>
    <SupervisorNavBar/>
    <Routes>
        <Route path="/Students" element={<>Students</>}></Route>
        <Route path="/Hours" element={<>Hours</>}></Route>
        <Route path="/Teachers" element={<>Teachers</>}></Route>
        <Route path="/SupportAllocation" element={<>SupportAllocation</>}></Route>
    </Routes>
    </Router> 
   </>
   )
  }

export default App;
