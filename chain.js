/**
 * Task: Build a mechanism which allows to process a value by unknown number of functions.
 */


/**
 * Simple object oriented chain, sync chain
 */
class Chain {
  value = null
  handlers = [];
  constructor(value) {
    this.value = value
  }

  use(executor){
    this.handlers.push(executor);
    return this
  }

  exec(callback){
    this.handlers.forEach((handler) => {
      this.value = handler(this.value)
    })
    callback(this.value)
  }
}

const chain = new Chain(0);

chain
  .use((value) => value + 1)
  .use((value) => value + 1)
  .use((value) => value + 1)
  .exec((result) => {
    console.log({result})
  })


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
const createChain = () => {
  const handlers = []

  const use = (handler) => {
    handlers.push(handler);
  }

  const exec = (value) => {
    let index = -1;

    const next = () => {
      ++index;
      const handler = handlers[index];
      if (handler){
        handler(value, next)
      }
    }

    next();
  }

  return {
    use,
    exec,
  }
}
//
// const chain = createChain();
// chain.use((value, next) => {
//   console.log('1: ', value);
//   next();
// })
// chain.use((value, next) => {
//   console.log('2: ', value);
//   setTimeout(() => {
//     next();
//   }, 2000)
// })
// chain.use((value, next) => {
//   console.log('3: ', value);
//   next();
// })
//
// chain.exec(0);


/**
 * Version: 2.0.0
 * Value needs to be passed along.
 */
// const createChain = () => {
//   const handlers = []
//
//   const use = (handler) => {
//     handlers.push(handler);
//   }
//
//   const exec = (value) => {
//     let index = -1;
//
//     const next = (value) => {
//       ++index;
//       const handler = handlers[index];
//       if (handler){
//         handler(value, (valueFromPrev) => {
//           next(valueFromPrev)
//         })
//       }
//     }
//
//     next(value);
//   }
//
//   return {
//     use,
//     exec,
//   }
// }
//
// const chain = createChain();
// chain.use((value, next) => {
//   console.log('1: ', value);
//   next(value + 1);
// })
// chain.use((value, next) => {
//   console.log('2: ', value);
//   next(value + 1);
// })
// chain.use((value, next) => {
//   console.log('3: ', value);
//   next(value + 1);
// })
//
// chain.exec(1);


/**
 * Version: 3.0.0
 * The result is being "returned" to the "exec" function
 */

// const createChain = () => {
//   const handlers = []
//
//   const use = (handler) => {
//     handlers.push(handler);
//   }
//
//   const exec = (value, callback) => {
//     let index = -1;
//     let result = null;
//
//     const next = (value) => {
//       ++index;
//       const handler = handlers[index];
//       if (handler) {
//         handler(value, (valueFromPrev) => {
//           result = valueFromPrev;
//           next(valueFromPrev);
//         })
//       } else {
//         callback(result)
//       }
//     }
//
//     next(value);
//   }
//
//   return {
//     use,
//     exec,
//   }
// }
//
// const chain = createChain();
// chain.use((value, next) => {
//   console.log('1: ', value);
//   next(value + 1);
// })
// chain.use((value, next) => {
//   console.log('2: ', value);
//   next(value + 1);
// })
// chain.use((value, next) => {
//   console.log('3: ', value);
//   next(value + 1);
// })
//
// chain.exec(0, (result) => {
//   console.log({result})
// });



export default createChain