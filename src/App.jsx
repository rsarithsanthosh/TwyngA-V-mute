import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MeetingPage from "./Pages/MeetingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/meeting-page/:hostname/:guest?" element={<MeetingPage/>}/>
      </Routes>

  );
}

export default App;
