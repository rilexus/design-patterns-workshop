const { EventEmitter } = require("events");
const sleep = (time) => new Promise((res) => setTimeout(res, time));

// /**
//  * TODO: write a Task queue.
//  * Queue n amount of functions. Execute them in FIFO order.
//  * Each function kicks of the execution of the next function.
//  * Extend the code below
//  */
// class TaskQueue {
//   constructor() {
//     this.tasks = [];
//   }
//
//   exec(task) {}
//   next() {}
// }

// /**
//  * NOTE: Solution
//  */
//
// class TaskQueue {
//   constructor() {
//     this.tasks = [];
//   }
//
//   exec(task) {
//     this.tasks.push(task);
//     return this;
//   }
//
//   next() {
//     if (this.tasks.length) {
//       const task = this.tasks.shift();
//       const _next = this.next.bind(this);
//       task(() => {
//          _next()
//       });
//     }
//   }
// }
//
// const queue = new TaskQueue();
// queue.exec((next) => {
//   console.log(1);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(2);
//   next();
// });
// queue.exec((next) => {
//   console.log(3);
//   next();
// });
// queue.next();

// /**
//  * TODO: extend the Queue so it runs the next 2 functions at once
//  */
// class TaskQueue {
//   constructor() {
//     this.tasks = [];
//     this.running = 0;
//   }
//
//   exec(task) {
//     this.tasks.push(task);
//     return this;
//   }
//
//   next() {
//     while (this.running < 2 && this.tasks.length) {
//       const task = this.tasks.shift();
//       ++this.running;
//       task(() => {
//         --this.running;
//         const _next = this.next.bind(this);
//         _next();
//       });
//     }
//   }
// }
//
// const queue = new TaskQueue();
// queue.exec((next) => {
//   console.log(1);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(2);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(3);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(4);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.next();

// /**
//  * TODO: extend the Queue so it runs the next n functions
//  */
// class TaskQueue {
//   constructor(concurrency) {
//     this.concurrency = concurrency;
//     this.tasks = [];
//     this.running = 0;
//   }
//
//   exec(task) {
//     this.tasks.push(task);
//     return this;
//   }
//
//   next() {
//     while (this.running < this.concurrency && this.tasks.length) {
//       const task = this.tasks.shift();
//       ++this.running;
//       task(() => {
//         --this.running;
//         const _next = this.next.bind(this);
//         _next();
//       });
//     }
//   }
// }
//
// const queue = new TaskQueue(3);
// queue.exec((next) => {
//   console.log(1);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(2);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(3);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.exec((next) => {
//   console.log(4);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// queue.next();

// /**
//  * TODO: kick of the execution as soon as you call the exec function.
//  */
// class TaskQueue {
//   constructor(concurrency) {
//     this.concurrency = concurrency;
//     this.tasks = [];
//     this.running = 0;
//   }
//
//   exec(task) {
//     this.tasks.push(task);
//     const _next = this.next.bind(this);
//     _next();
//     return this;
//   }
//
//   next() {
//     while (this.running < this.concurrency && this.tasks.length) {
//       const task = this.tasks.shift();
//       ++this.running;
//       task(() => {
//         --this.running;
//         const _next = this.next.bind(this);
//         _next();
//       });
//     }
//   }
// }
//
// (() => {
//   const queue = new TaskQueue(2);
//   for (let i = 0; i <= 6; i++) {
//     queue.exec((next) => {
//       console.log(i);
//       setTimeout(() => {
//         next();
//       }, 1000);
//     });
//   }
// })();

// /**
//  * TODO: Extend the EventEmitter class and emit events:
//  * 1. when the task queue is empty
//  * 2. when the next task receives an error as an argument
//  */
// class TaskQueue extends EventEmitter {
//   constructor(concurrency) {
//     super();
//     this.concurrency = concurrency;
//     this.running = 0;
//     this.queue = [];
//   }
//
//   exec(task) {
//     this.queue.push(task);
//     const _next = this.next.bind(this);
//     process.nextTick(_next);
//     return this;
//   }
//
//   next() {
//     if (this.running === 0 && this.queue.length === 0) {
//       return this.emit("empty");
//     }
//     while (this.running < this.concurrency && this.queue.length) {
//       const task = this.queue.shift();
//       task((error) => {
//         if (error) {
//           this.emit("error", error);
//         }
//         this.running--;
//         const _next = this.next.bind(this);
//         process.nextTick(_next);
//       });
//       this.running++;
//     }
//   }
// }
//
// const queue = new TaskQueue(2);
//
// let counter = 0;
// queue.on("empty", () => {
//   console.log("empty event");
//   while (queue.queue.length < queue.concurrency) {
//     queue.exec((next) => {
//       console.log(++counter);
//       setTimeout(() => {
//         next();
//       }, 1000);
//     });
//   }
// });
//
// queue.exec((next) => {
//   next(/* kickstart */);
// });

/**
 * TODO: Convert the implementation from the callback based to the promise based
 */
// /**
//  * Promise based task queue
//  */
// class TaskQueue extends EventEmitter {
//   constructor(concurrency) {
//     super();
//     this.concurrency = concurrency;
//     this.running = 0;
//     this.queue = [];
//   }
//
//   exec(task) {
//     this.queue.push(task);
//     const _next = this.next.bind(this);
//     process.nextTick(_next);
//     return this;
//   }
//
//   next() {
//     if (this.running === 0 && this.queue.length === 0) {
//       return this.emit("empty");
//     }
//     while (this.running < this.concurrency && this.queue.length) {
//       const task = this.queue.shift();
//       task().finally(() => {
//         this.running--;
//         this.next();
//       });
//       this.running++;
//     }
//   }
// }
//
// const queue = new TaskQueue(2);
//
// let counter = 0;
// queue.on("empty", () => {
//   console.log("empty event");
//   while (queue.queue.length < queue.concurrency) {
//     queue.exec(async () => {
//       console.log(++counter);
//       await sleep(1000);
//     });
//   }
// });
//
// queue.next();
