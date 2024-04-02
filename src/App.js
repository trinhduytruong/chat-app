import "./App.css";
import AuthProvider from "./Context/AuthProvider";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
