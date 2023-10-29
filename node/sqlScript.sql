CREATE DATABASE todolist;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task TEXT
);

USE todolist;

DESCRIBE tasks;

INSERT INTO tasks (task) VALUES ('Task 1'), ('Task 2'), ('Task 3');
