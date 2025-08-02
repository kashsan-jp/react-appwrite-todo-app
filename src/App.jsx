import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Notes from "./pages/Notes"
// import LoginRegister from "./pages/LoginRegister"
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider} from './utils/AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

 

function App() {

  return (
    // <div id="app">
    //   <div id="container">
    //     <BrowserRouter>
    //         <Routes>
    //           <Route element={<Notes/>} path="/note"/>
    //           <Route element={<LoginRegister/>} path="/login"/>
    //           <Route element={<Login/>} path="/"/>
    //         </Routes> 
    //       </BrowserRouter>
    //   </div>
    // </div>

    <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route element={<PrivateRoutes/>}>
              <Route path="/notes" element={<Notes/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Route>
          </Routes>
        </AuthProvider>
    </Router>
       
  )
}

export default App
