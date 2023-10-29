import { TasksService } from "../services/task.js";


export class TasksController {
  static async getTasks(req, res){
    try {
      const tasks = await TasksService.getTasks()
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({action: "Get Tasks" , message:"Couldn't perform the petition"})
    }
  }
  static async getTask(req, res){
    const id = req.params.id
    try {
      const tasks = await TasksService.getTask(id)
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({action: "Get Task" ,message:"Couldn't perform the petition"})
    }
  } 
  static async addTask(req, res){
    try {
      const tasks = await TasksService.addTask(req.body.name)
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({action: "Post Task" ,message:"Couldn't perform the petition"})
    }
  } 
  static async editTask(req, res){
    try {
      const tasks = await TasksService.editTask(req.body, req.params.id)
      if(tasks.status ===404) return res.status(404).json(tasks)
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({action: "Modify Task" ,message:"Couldn't perform the petition"})
    }
  } 
  static async deleteTask(req, res){
    const id = req.params.id
    try {
      const tasks = await TasksService.deleteTask(id)
      if(tasks.status ===404) return res.status(404).json(tasks)
      return res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({action: "Erase Task" ,message:"Couldn't perform the petition"})
    }
  } 
  static async deleteAllTasks(req, res){
    try {
      const tasks = await TasksService.deleteAllTasks()
      if(tasks.status ===404) return res.status(404).json(tasks)
      return res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({action: "Erase all Tasks" ,message:"Couldn't perform the petition"})
    }
  } 
}