import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import Schedule from './components/Teachers/Schedule';
import SupportAllocation from './components/students/SupportAllocation';
import ToolBar from './components/ToolBar';
import Users from './components/Users/Users'
import { useSelector } from 'react-redux';
import HomePaageHours from './components/hours/HomePageHours'
import TeacherList from './components/Teachers/TeachersList';
import BasketStudentsTable from './components/students/StudentsList';
 


function App() {
  const {token} = useSelector((state)=>state.token)
  return (
    <>
      {/* <LoginForm/> */}
      <Router>
        <ToolBar />
        {token ? <NavBar />:<h1>Institution</h1>}
        <Routes>
        <Route path="/Students" element={<BasketStudentsTable/>}></Route>
          <Route path="/Hours" element={<HomePaageHours/>}></Route>
        <Route path="/Teachers" element={<TeacherList/>}></Route>
          <Route path="/SupportAllocation" element={<SupportAllocation />}></Route>
          <Route path="/Institution" element={<>Institution</>}></Route>
           <Route path="/Users" element={<Users/>}></Route> 
          <Route path="/TeacherHours" element={<Schedule/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
