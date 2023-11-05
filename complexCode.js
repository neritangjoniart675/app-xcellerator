Filename: complexCode.js

/**
 * This code demonstrates a complex implementation of a task scheduler.
 * It uses an object-oriented approach with various classes and extensive comments.
 * The scheduler can handle multiple tasks, prioritize them, and manage dependencies.
 * 
 * To execute the code, run the `main` function at the bottom of the file.
 */

// ##############################
// Task Class
// ##############################

class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
    this.dependencies = [];
  }

  /**
   * Adds another task as a dependency to this task.
   * @param {Task} task - The task object to add as a dependency.
   */
  addDependency(task) {
    this.dependencies.push(task);
  }

  /**
   * Calculates the total duration of this task, including all its dependencies.
   * @returns {number} - The total duration of the task.
   */
  getTotalDuration() {
    let totalDuration = this.duration;
    for (const dependency of this.dependencies) {
      totalDuration += dependency.getTotalDuration();
    }
    return totalDuration;
  }
}

// ##############################
// Scheduler Class
// ##############################

class Scheduler {
  constructor() {
    this.tasks = [];
  }

  /**
   * Adds a new task to the scheduler.
   * @param {Task} task - The task object to add.
   */
  addTask(task) {
    this.tasks.push(task);
  }

  /**
   * Sorts the tasks in the scheduler based on their total duration.
   */
  sortTasksByDuration() {
    this.tasks.sort((taskA, taskB) => {
      const durationA = taskA.getTotalDuration();
      const durationB = taskB.getTotalDuration();
      return durationB - durationA;
    });
  }

  /**
   * Schedules and executes all the tasks.
   */
  scheduleTasks() {
    this.sortTasksByDuration();
    console.log('Executing tasks:');
    for (const task of this.tasks) {
      console.log(`- Executing: ${task.name}`);
      this.executeTask(task);
      console.log(`- Completed : ${task.name}\n`);
    }
  }

  /**
   * Simulates the execution of a task.
   * @param {Task} task - The task object to execute.
   */
  executeTask(task) {
    // Simulating task execution
    const executionTime = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
    console.log(`  Executing ${task.name} for ${executionTime}ms`);
    // Simulating asynchronous completion of task
    return new Promise((resolve) => {
      setTimeout(resolve, executionTime);
    });
  }
}

// ##############################
// Main Function
// ##############################

function main() {
  const scheduler = new Scheduler();

  const taskA = new Task('Task A', 100);
  const taskB = new Task('Task B', 200);
  const taskC = new Task('Task C', 300);
  const taskD = new Task('Task D', 400);
  const taskE = new Task('Task E', 500);

  taskB.addDependency(taskA);
  taskC.addDependency(taskA);
  taskD.addDependency(taskB);
  taskD.addDependency(taskC);
  taskE.addDependency(taskD);

  scheduler.addTask(taskA);
  scheduler.addTask(taskB);
  scheduler.addTask(taskC);
  scheduler.addTask(taskD);
  scheduler.addTask(taskE);

  scheduler.scheduleTasks();
}

// Execute the main function
main();