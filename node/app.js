import express, { json } from 'express';
import { tasksRouter } from './routes/tasks.js';
import 'dotenv/config'
import { corsMiddleware } from './middleware/cors.js'

const app = express();
const PORT = process.env.PORT 

app.use(json())
app.disable('x-powered-by')
app.use(corsMiddleware())

app.use('/ping', (req, res)=>{
  return res.status(200).send('/pong')
})
app.use('/tasks', tasksRouter)
app.use('/', (req, res)=>{
  return res.status(404).json({message:'resource not found'})
})

app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`);
})