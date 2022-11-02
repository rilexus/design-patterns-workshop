/**
 * TODO: program a "traffic light"
 * We start with the "yellow" light.
 * After 2 sec, go to "red",
 * after 5 sec to "green" and after 5 to "yellow".
 * Repeat indefinitely.
 */

class GreenLight {
  constructor(trafficLight) {
    this.trafficLight = trafficLight;
  }

  activate() {
    console.log("Green active");
    setTimeout(() => {
      this.trafficLight.transition(new YellowLight(this.trafficLight));
    }, 2000);
  }
}

class RedLight {
  constructor(trafficLight) {
    this.trafficLight = trafficLight;
  }
  activate() {
    console.log("Red active");
    setTimeout(() => {
      this.trafficLight.transition(new GreenLight(this.trafficLight));
    }, 5000);
  }
}

class YellowLight {
  constructor(trafficLight) {
    this.trafficLight = trafficLight;
  }

  activate() {
    console.log("Yellow active");
    setTimeout(() => {
      this.trafficLight.transition(new RedLight(this.trafficLight));
    }, 2000);
  }
}

class TrafficLight {
  light = new RedLight(this);

  constructor() {
    this.light.activate();
  }

  transition(light) {
    this.light = light;
    this.light.activate();
  }
}

const trafficLight = new TrafficLight();
