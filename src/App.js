import logo from "./logo.svg";
import "./App.css";
import CanvasDrawing from "./pages/CanvasDrawing";
import { Routes, Route } from "react-router-dom";
import TamilNadu from "./pages/TamilNadu";
import { routes } from "./routes";

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} exact element={<route.element />} />
      ))}
      {/* // <Route path="/" exact element={<TamilNadu/>}/> */}
    </Routes>
  );
}

export default App;
