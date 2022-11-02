/**
 * TODO: Write a sorting mechanism. It should be able to sort numbers, strings and dates.
 *
 */

// class SortStrategy {
//   constructor(sortFunction) {
//     this.fn = sortFunction;
//   }
//
//   sort(v1, v2) {
//     return this.fn(v1, v2);
//   }
// }
//
// class Sorter {
//   sort(...args) {
//     return this.strategy.sort(...args);
//   }
//   use(strategy) {
//     this.strategy = strategy;
//   }
// }
//
// const sort = (array) => {
//   const stringSort = new SortStrategy((v1, v2) => v1.localeCompare(v2));
//   const numberSort = new SortStrategy((v1, v2) => v1 - v2);
//   const dateSort = new SortStrategy((v1, v2) => v1.getTime() - v2.getTime());
//
//   const sorter = new Sorter();
//
//   const type = typeof array[0];
//
//   if (type === "string") {
//     sorter.use(stringSort);
//   } else if (type === "number") {
//     sorter.use(numberSort);
//   } else if (array[0] instanceof Date) {
//     sorter.use(dateSort);
//   } else {
//     sorter.use(Array.prototype.sort.bind(Array));
//   }
//   return [...array].sort((v1, v2) => sorter.sort(v1, v2));
// };
//
// console.log("Numbers: ", sort([5, 4, 3, 2, 1]));
// console.log("Chars: ", sort(["d", "c", "b", "a"]));
// console.log(
//   "Dates: ",
//   sort([new Date().setTime(3), new Date().setTime(2), new Date().setTime(1)])
// );

class PasswordStrategy {
  async canActivate({ username, password }) {
    // make a call to the backend
    return false;
  }
}

class JWTStrategy {
  async canActivate({ jwt }) {
    // make a call to the backend
    return false;
  }
}

// TODO: [Passport]<https://www.npmjs.com/package/passport>
class Authenticate {
  strategy = null;

  use(strategy) {
    this.strategy = strategy;
  }

  async canActivate(...args) {
    return this.strategy.canActivate(...args);
  }
}

const authenticate = new Authenticate();
const passport = new PasswordStrategy();
const jwt = new JWTStrategy();

authenticate.use(passport);
authenticate.use(jwt);
