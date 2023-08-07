import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasKsPage";
import TaskForm from "./pages/TaskForm";
import Navbar from "./components/Navbar";

import { TaskContextProvider } from "./context/TaskContext";

function App() {
  //Rutas
  return (
    <div className="bg-zinc-900 h-screen">
        <Navbar></Navbar>
      <div className="container mx-auto py-4 px-2">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage></TasksPage>}></Route>
            <Route path="/new" element={<TaskForm />}></Route>
            <Route path="/edit/:id" element={<TaskForm />}></Route>
            <Route path="*" element={<TasksPage></TasksPage>}></Route>
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default App;
