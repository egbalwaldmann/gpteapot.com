import "./App.css";
import Main from "./Componets/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Componets/Footer/Footer";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
