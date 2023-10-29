import { TaskModel } from "../models/tasks.js";

export class TasksService {
  static async getTasks(){
    try {
      const tasks = await TaskModel.getTasks();
      return tasks
    } catch (error) {
      return { message:"DB error" }
    }
  } 
  static async getTask(id){
    try {
      const tasks = await TaskModel.getTask(id);
      return tasks
    } catch (error) {
      return { message:"DB error" }
    }
  } 
  static async addTask(body){
    try {
      const tasks = await TaskModel.addTask(body);
      return tasks
    } catch (error) {
      return { message:"DB error" }
    }
  } 
  static async editTask(body, id){
    try {
      const tasks = await TaskModel.editTask(body, id);
      return tasks
    } catch (error) {
      return { message:"DB error" }
    }
  } 
  static async deleteTask(id){
    try {
      const tasks = await TaskModel.deleteTask(id);
      return tasks
    } catch (error) {
      return { message:"DB error" }
    }
  } 
  static async deleteAllTasks(id){
    try {
      const tasks = await TaskModel.deleteAllTasks();
      return tasks
    } catch (error) {
      return { message:"DB error" }
    }
  } 
}