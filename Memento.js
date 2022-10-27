/**
 * TODO: save a state of an object/class for later so it can be restored later: create a backup mechanism.
 * NOTE: a solution is below
 */

















































class Memento {
  hydrate(){
    return JSON.stringify(this);
  };

  dehydrate(memento){
    console.warn('Not implemented.');
  };
}

class Person extends Memento {
  name = null;
  constructor(name) {
    super();
    this.name = name
  }

  dehydrate(memento) {
    const json = JSON.parse(memento);
    this.name = json.name;
    return this
  }
}

class Store {
  values = {}

  add(key, value){
    this.values = {...this.values, [key]: value}
  }

  get(key){
    return this.values[key];
  }

  remove(key){
    const {[key]: value, ...rest} = this.values;
    this.values = rest;
    return value
  }
}


const frank = new Person('frank');
const store = new Store();

store.add('frank', frank.hydrate());

frank.name= 'some'

console.log(frank.dehydrate(store.get('frank')))


export {Memento, Store, Person}