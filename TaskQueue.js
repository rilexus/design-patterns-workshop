const { EventEmitter } = require("events");
const sleep = (time) => new Promise((res) => setTimeout(res, time));

// class TaskQueue {
//   constructor(concurrency) {
//     this.concurrency = concurrency;
//     this.running = 0;
//     this.tasks = [];
//   }
//
//   pushTask(task) {
//     this.tasks.push(task);
//     const _next = this.next.bind(this);
//     process.nextTick(_next);
//     return this;
//   }
//
//   next() {
//     while (this.running < this.concurrency && this.tasks.length) {
//       const task = this.tasks.shift();
//       /**
//        * Run tasks until concurrency limit is reached.
//        */
//       task(() => {
//         this.running--;
//         const _next = this.next.bind(this);
//         process.nextTick(_next);
//       });
//       this.running++;
//     }
//   }
// }
//
// const queue = new TaskQueue(1);
//
// queue.pushTask((next) => {
//   console.log(1);
//   setTimeout(next, 1000);
// });
//
// queue.pushTask((next) => {
//   console.log(2);
//   setTimeout(next, 1000);
// });
// queue.pushTask((next) => {
//   console.log(3);
//   setTimeout(next, 1000);
// });

// class TaskQueue extends EventEmitter {
//   constructor(concurrency) {
//     super();
//     this.concurrency = concurrency;
//     this.running = 0;
//     this.queue = [];
//   }
//
//   pushTask(task) {
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
// const queue = new TaskQueue(5);
//
// let counter = 0;
// queue.on("empty", () => {
//   console.log("empty event");
//   while (queue.queue.length < queue.concurrency) {
//     queue.pushTask((next) => {
//       console.log(++counter);
//       setTimeout(() => {
//         next();
//       }, 1000);
//     });
//   }
// });
//
// queue.pushTask((next) => {
//   next(/* kickstart */);
// });

/**
 * Promise based task queue
 */
class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    const _next = this.next.bind(this);
    process.nextTick(_next);
    return this;
  }

  next() {
    if (this.running === 0 && this.queue.length === 0) {
      return this.emit("empty");
    }
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task().finally(() => {
        this.running--;
        this.next();
      });
      this.running++;
    }
  }
}

const queue = new TaskQueue(2);

let counter = 0;
queue.on("empty", () => {
  console.log("empty event");
  while (queue.queue.length < queue.concurrency) {
    queue.pushTask(async () => {
      console.log(++counter);
      await sleep(1000);
    });
  }
});

queue.next();
