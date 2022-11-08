import logo from './logo.svg';
import './App.css';
import CanvasDrawing from './pages/CanvasDrawing';
import {Routes,Route} from "react-router-dom"
import TamilNadu from './pages/TamilNadu';



function App() {


  return (
      <Routes>
     <Route path="/" exact element={<TamilNadu/>}/>
     </Routes>
  );
}

export default App;
