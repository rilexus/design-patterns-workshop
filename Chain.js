/**
 * Task: Build a mechanism which allows to process a value by unknown number of functions.
 */

/**
 * Chain of Responsibility
 *
 * You have a value that needs to be "processed" in an async "pipeline".
 * Where the amount of functions is not known and the
 * current function processes the value and passes it to the next function.
 */

/**
 * Version: 1.0.0
 * Value is not being passed along.
 */
// class Chain {
//   tasks = [];
//
//   use(handler) {
//     this.tasks.push(handler);
//   }
//
//   exec(value) {
//     let index = -1;
//
//     const next = () => {
//       ++index;
//       const task = this.tasks[index];
//       if (task) {
//         task(value, next);
//       }
//     };
//     next();
//   }
// }
//
// const chain = new Chain();
// chain.use((value, next) => {
//   console.log("1: ", value);
//   next();
// });
// chain.use((value, next) => {
//   console.log("2: ", value);
//   setTimeout(() => {
//     next();
//   }, 2000);
// });
// chain.use((value, next) => {
//   console.log("3: ", value);
//   next();
// });
//
// chain.exec(0);

/**
 * Version: 2.0.0
 * Value needs to be passed along.
 */
// class Chain {
//   tasks = [];
//
//   use(handler) {
//     this.tasks.push(handler);
//   }
//
//   exec(value) {
//     let index = -1;
//     const next = (value) => {
//       ++index;
//       const task = this.tasks[index];
//       if (task) {
//         task(value, (valueFromPrev) => {
//           next(valueFromPrev);
//         });
//       }
//     };
//
//     next(value);
//   }
// }
//
// const chain = new Chain();
//
// chain.use((value, next) => {
//   console.log("1: ", value);
//   next(value + 1);
// });
// chain.use((value, next) => {
//   console.log("2: ", value);
//   setTimeout(() => {
//     next(value + 1);
//   }, 1000);
// });
// chain.use((value, next) => {
//   console.log("3: ", value);
//   next(value + 1);
// });
//
// chain.exec(1);

/**
 * Version: 3.0.0
 * The result is being "returned" to the "exec" function
 */

// class Chain {
//   tasks = [];
//
//   use(handler) {
//     this.tasks.push(handler);
//   }
//
//   exec(value, callback) {
//     let index = -1;
//     let result = null;
//
//     const next = (value) => {
//       ++index;
//       const task = this.tasks[index];
//       if (task) {
//         task(value, (valueFromPrev) => {
//           result = valueFromPrev;
//           next(valueFromPrev);
//         });
//       } else {
//         callback(result);
//       }
//     };
//
//     next(value);
//   }
// }
//
// const chain = new Chain();
//
// chain.use((value, next) => {
//   console.log("1: ", value);
//   next(value + 1);
// });
//
// chain.use((value, next) => {
//   console.log("2: ", value);
//   setTimeout(() => {
//     next(value + 1);
//   }, 1000);
// });
//
// chain.use((value, next) => {
//   console.log("3: ", value);
//   setTimeout(() => {
//     next(value + 1);
//   }, 1000);
// });
//
// chain.exec(0, (result) => {
//   console.log({ result });
// });
