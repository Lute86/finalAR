import { Router } from 'express';
import { TasksController } from '../controllers/task.js';
import { validateInput, validateInputPut } from '../middleware/validator.js';

export const tasksRouter = Router();


tasksRouter.get('/', TasksController.getTasks)
tasksRouter.post('/', validateInput, TasksController.addTask)
tasksRouter.get('/:id', TasksController.getTask)
tasksRouter.put('/:id', validateInputPut, TasksController.editTask)
tasksRouter.delete('/:id', TasksController.deleteTask)
tasksRouter.delete('/', TasksController.deleteAllTasks)