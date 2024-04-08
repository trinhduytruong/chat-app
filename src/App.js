import "./App.css";
import AppProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthProvider";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddRoomModal from "./components/Modals/AddRoomModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
          <AddRoomModal/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
