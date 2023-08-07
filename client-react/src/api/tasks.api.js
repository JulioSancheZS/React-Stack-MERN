import axios from 'axios'

export const getTasksRequest = async () => {
 return await axios.get('http://localhost:4000/task')
}

export const createTaskRequest = async (task)=> {
   return await axios.post('http://localhost:4000/task', task)
}

export const deleteTaskRequest = async (id) => {
   return await axios.delete(`http://localhost:4000/task/${id}`)
}

export const getTaskRequest = async (id) => {
   return await axios.get(`http://localhost:4000/task/${id}`)
}

export const updateTaskRequest = async (id, newField) => {
   return await axios.put(`http://localhost:4000/task/${id}`, newField)
}

export const toggleTaskDoneRequest = async(id, done) => {
   await axios.put(`http://localhost:4000/task/${id}`, {
      done: done
   })
}