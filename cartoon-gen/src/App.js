import React from "react";
import "../src/App.css"
import Gen from "../src/Gen"
import Result from "../src/Result"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gen/>}></Route>
        <Route path="/result" element={<Result/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;
