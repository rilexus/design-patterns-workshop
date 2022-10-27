/**
 * TODO: Write a mechanism which notifies me when certain conditions occur.
 * NOTE: a solution is at the bottom of the file.
 */














































class Observer {
  handlers = [];

  subscribe(handler){
    this.handlers.push(handler);
  }

  unsubscribe(handler){
    this.handlers = this.handlers.filter((h) => h !== handler)
  }

  notify(data){
    this.handlers.forEach((handler) => handler(data));
  }
}