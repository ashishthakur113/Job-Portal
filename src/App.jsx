import './App.css'
import  {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import Header from './Main/Header'
import Home from './Components/Home'
import AboutUs from './Components/AboutUs'
import BrowserJob from './Components/BrowserJob'
import Card from './Components/Card'
import Footer from './Main/Footer'
import JobDetail from './Components/JobDetail'
import UploadJob from './Components/UploadJob'
import SignUp from './Components/SignUp'
import LogIn from './Components/LogIn'
import UserProfile from './Components/UserProfile'
import Layout from './Components/layout'
function App() {
  
  
  return (
    
    <Router>
       <Header/>
       <Layout>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/browserjob' element={<BrowserJob/>}></Route>
        <Route path='/card' element={<Card/>}></Route>
        <Route path='/job/:id' element={<JobDetail/>}></Route>
        <Route path='/uploadjob' element={<UploadJob/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/logIn' element={<LogIn/>}></Route>
        <Route path='/profile' element={<UserProfile/>}></Route>
      </Routes>
      </Layout>
      <Footer/>
    </Router>
     
    
  )
}

export default App
