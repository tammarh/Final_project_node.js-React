import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupervisorNavBar from './components/NavBar/SupervisorNavBar'
import  ToolBar  from './components/ToolBar';
import BasketStudentsTable from './components/students/student';
import TeacherList from './components/Teachers/Teachers';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


//import LoginForm from './features/auth/LoginForm'

function App() {
  return (
   <>
   {/* <LoginForm/> */}
  <Router>
    <ToolBar/>
    <SupervisorNavBar/>
    <Routes>
        <Route path="/Students" element={<BasketStudentsTable/>}></Route>
        <Route path="/Hours" element={<>Hours</>}></Route>
        <Route path="/Teachers" element={<TeacherList/>}></Route>
        <Route path="/SupportAllocation" element={<>SupportAllocation</>}></Route>
    </Routes>
    </Router> 
   </>
   )
  }

export default App;
