import "./App.css";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import LinkedinAuth from "./Componets/LinkedinAuthorization";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<LinkedinAuth />}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
