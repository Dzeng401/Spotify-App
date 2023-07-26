import './App.css';
import Login from "./pages/Auth.js"
import Home from "./pages/Home.js"
import CallBack from "./pages/CallBack.js"
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path = "/auth" element = {<Login/>}/>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/callback" element = {<CallBack/>}/>
    </Routes>
  );
}

export default App;
