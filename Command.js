/**
 * TODO: given the following call below
 */

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

class Executor {
  execute(command) {
    return command.execute(this);
  }
}

class Store extends Executor {
  state = null;

  constructor() {
    super();
  }
}

const store = new Store();

function initStateCommand(state) {
  return new Command((store) => {
    store.state = state;
  });
}

function changeNameCommand(name) {
  return new Command((store) => {
    store.state.name = name;
  });
}

store.execute(initStateCommand({ name: "Stan" }));
store.execute(changeNameCommand("denis"));

console.log(store);

// class State {
//   execute(exec) {
//     return exec(this);
//   }
// }
//
// const state = new State();
//
// function initStateCommand(value) {
//   return (state) => {
//     state.state = value;
//     return state;
//   };
// }
//
// function changeName(name) {
//   return (state) => {
//     state.state.name = name;
//     return state;
//   };
// }
//
// const compose = (...functions) => {
//   return (value) => functions.reduce((acc, func) => func(acc), value);
// };
//
// const initAndSetToPeter = compose(
//   initStateCommand({ name: "Stan" }),
//   changeName("peter")
// );
//
// state.execute(initAndSetToPeter);
