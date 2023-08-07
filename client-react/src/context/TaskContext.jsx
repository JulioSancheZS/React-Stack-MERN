// Importaciones necesarias desde React y el archivo de la API
import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest
} from "../api/tasks.api";

// Contexto
export const TaskContext = createContext(); // Permite comunicar con el context

// Hook personalizado para acceder al contexto
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    // Si el contexto no está presente, lanzar un error indicando que useTasks debe usarse dentro de un TaskContextProvider
    throw new Error("useTasks must be used with in a TaskContextProvider");
  }

  return context;
};

// Proveedor de Contexto TaskContextProvider
export const TaskContextProvider = ({ children }) => {
  // Estado local para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  // Función asincrónica para cargar las tareas desde la API
  async function loadTasks() {
    const response = await getTasksRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      setTasks(tasks.filter((task) => task.id !== id)); //Nueva tarea
      // loadTasks()
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      console.log(response);
      //actions.resetForm()
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, newTask) => {
    try {
      const response = await updateTaskRequest(id, newTask);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskDone=  async (id) =>{

    try{
      const taskFound = tasks.find((task) => task.id == id)

       await toggleTaskDoneRequest(id,taskFound.done == 0 ?  true: false )

       setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        )
       )
    }
    catch(error){
      console.error(error)
    }
   
  }
  // Devuelve el componente TaskContext.Provider, que envuelve a los children y proporciona el valor del contexto
  // En este caso, el valor del contexto es un objeto con las tareas y la función para cargar las tareas
  return (
    <TaskContext.Provider
      value={{ tasks, loadTasks, deleteTask, createTask, getTask, updateTask,toggleTaskDone }}
    >
      {children}
    </TaskContext.Provider>
  );
};
