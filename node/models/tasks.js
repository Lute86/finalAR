import mysql from 'mysql2/promise'
import 'dotenv/config'
import 'util'


const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})


export class TaskModel {
  static async getTasks(){
    try {
      const [tasks] = await conn.query(
        "SELECT * FROM tasks"
      )
      return tasks
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      throw error;
    }
  }
  static async getTask(id){
    try {
      const [tasks] = await conn.query(
        "SELECT name, completed FROM tasks WHERE id = ?", [id]
      )
      return tasks[0]
    } catch (error) {
      console.error('Error retrieving task:', error);
      throw error;
    }
  }
  static async addTask(body){
    try {
      const task = await conn.query(
        `INSERT INTO tasks (name) VALUE (?);`, [body]
      )
      return {task:body, message:"Successfully added"}
    } catch (error) {
      console.error('Error adding task:', error);
      return {action:"adding task", message:"Failed to add"}
    }
  }
  static async editTask(body, id){
    try {
      const task = await conn.query(
        `UPDATE tasks
        SET name = ?, completed = ?
        WHERE id = ?;
        `, [body.name, body.completed, id]
      )
      if (task[0].affectedRows === 0) {
        const notFoundError = new Error('Task not found');
        notFoundError.status = 404;
        throw notFoundError;
      }
    
      return {task:body, message:"Succesfully edited"};
    } catch (error) {
      console.error('Error editing task:', error.message);
    
      if (error.status === 404) {
        return { status: 404, message: error.message };
      } else {
        return { status: 500, message: 'Internal Server Error' };
      }
    }
  }
  static async deleteTask(id){
    try {
      const result = await conn.query(
        `DELETE FROM tasks WHERE id = ?;`,
        [id]
      );
    
      if (result[0].affectedRows === 0) {
        throw new Error()
      }
    
      // Task was successfully deleted, you can return any desired response
      return { message: 'Task deleted successfully' };
    } catch (error) {
      return {status:404, message:"Couldn't find the desired id"}
    }
  }
  
  static async deleteAllTasks(id){
    try {
      const result = await conn.query(
        `DELETE FROM tasks;`,
        [id]
      );
    
      if (result[0].affectedRows === 0) {
        throw new Error()
      }
    
      // Task was successfully deleted, you can return any desired response
      return { message: 'Task deleted successfully' };
    } catch (error) {
      return {status:404, message:"Couldn't find the desired id"}
    }
  }
  
}