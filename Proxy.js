const watch = (obj) => {
  const subscribers = [];
  return new Proxy(obj, {
    set(obj, prop, value) {
      // console.log(obj, prop);
      obj[prop] = value;
      subscribers.forEach((subscriber) => {
        subscriber(obj);
      });
    },

    get(obj, key) {
      if (key === "subscribe") {
        return (callback) => {
          subscribers.push(callback);
        };
      }

      return obj[key];
    },
  });
};

const user = watch({ name: "stan" });

user.subscribe((obj) => {
  console.log(obj);
});

user.name = "some";
user.name = "stan";
user.name = "some";
user.name = "stan";
user.name = "some";
user.name = "stan";
user.name = "some";
