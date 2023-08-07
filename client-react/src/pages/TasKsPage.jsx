import {useEffect} from 'react'
import TaskCard from '../components/TaskCard'
import { useTasks } from '../context/TaskContext'

function TaskPage() {

 const {tasks, loadTasks} = useTasks()

    useEffect(() => {

        loadTasks();
    },[])

    function renderMain(){

        if(tasks.length == 0) return (<h1>No task yet</h1>)
        return  tasks.map(task => <TaskCard task={task} key={task.id}></TaskCard>)      
        
    }
    
    return(
        <div>
            <h1 className='text-5xl text-white text-center'>Task</h1>
            <div className='grid grid-cols-3 gap-2'>
            {
                renderMain()
            }   
            </div>
          
        </div>
    )

}

export default TaskPage;
