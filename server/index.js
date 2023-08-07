import express from 'express'
import cors from 'cors'
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/task.routes.js'

const app = express();

app.use(cors())
app.use(express.json())

//Rutas
app.use(indexRoutes)
app.use(taskRoutes)

app.listen(PORT)
console.log(`Corriendo en el puerto ${PORT}`)