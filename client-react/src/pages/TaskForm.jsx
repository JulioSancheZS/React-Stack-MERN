import { Formik, Form } from "formik";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks(); //Context
  const params = useParams(); //para obtener el parametro

  //Hook State
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };

    loadTask();
  }, []);

  //Usando Formik
  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateTask(params.id, values);
            navigate("/")
          } else {
            await createTask(values); //Funcion agregar
            navigate("/")
          }
          //actions.resetForm();
          setTask({
            title: "",
            description: ""
          })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
              <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Edit Task" : "New Task"}</h1>

            <label className="block">Title</label>
            <input
              type="text"
              placeholder="Escriba el titulo"
              name="title"
              onChange={handleChange}
              className="px-2 py-1 rounded-sm w-full"
              value={values.title}
            />

            <label className="block">Description</label>
            <textarea
              name="description"
              rows="3"
              className="px-2 py-1 rounded-sm w-full"
              placeholder="Escriba la descripción"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button disabled={isSubmitting} type="submit" className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
              {isSubmitting ? "Guardando..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
