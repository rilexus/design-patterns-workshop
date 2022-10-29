/**
 * TODO: build a mechanism which produces an URL of this shape:
 * https://username:password@hostname:port/some/path?key=value/#hash
 * Example: https://stan:1234@goodle.com:8080/email?period=week/#monday
 */

class UrlBuilder {
  query = [];
  constructor() {}

  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  setAuthentication(username, password) {
    this.username = username;
    this.password = password;
    return this;
  }

  setHostname(hostname) {
    this.hostname = hostname;
    return this;
  }

  setQuery(key, value) {
    this.query.push([key, value]);
    return this;
  }

  setPath(path) {
    this.path = path;
  }

  setHash(hash) {
    this.hash = hash;
    return this;
  }

  setPort(port) {
    this.port = port;
  }

  build() {
    if (!this.protocol || !this.hostname) {
      throw new Error("Must specify a protocol and a hostname");
    }
    let url = "";
    url = `${this.protocol}://`;

    if (this.username && this.password) {
      url = `${url}${this.username}:${this.password}@`;
    }

    if (this.hostname) {
      url = `${url}${this.hostname}`;
    }

    if (this.port) {
      url = `${url}:${this.port}`;
    }

    if (this.path) {
      url = `${url}${this.path}`;
    }

    if (this.query.length) {
      url = this.query.reduce(
        (acc, [key, value]) => `${acc}${key}=${value}&`,
        `${url}?`
      );
      url = url.slice(0, -1);
    }

    if (this.hash) {
      url = `${url}#${this.hash}`;
    }

    return url;
  }
}

const urlBuilder = new UrlBuilder();
urlBuilder.setProtocol("https");
urlBuilder.setHostname("google.com");
urlBuilder.setPort(3000);
urlBuilder.setAuthentication("stan", "123456");
urlBuilder.setPath("/email");
urlBuilder.setHash("monday");
urlBuilder.setQuery("period", "week");

console.log(urlBuilder.build());
