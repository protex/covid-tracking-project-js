import axios from 'axios';

export default class CTPRequest {
  constructor() {
    this.request_url = 'https://covidtracking.com/api/v1';
    this.data = {};
    return this;
  }

  async get() {
    try {
      console.info(`Generating get request for: ${this.request_url}`);
      let res = await axios.get(this.request_url);
      let { data } = res;
      this.data = data;
      return this;
    } catch (err) {
      console.error(`Error on get request for: ${this.request_url}\n${err}`);
    }
  }

  states() {
    this.request_url += '/states';
    return this;
  }

  state(stateCode) {
    this.request_url += `/${stateCode.toUpperCase()}`
    return this;
  }

  us() {
    this.request_url += '/us';
    return this;
  }

  daily() {
    this.request_url += '/daily.json';
    return this;
  }

  current() {
    this.request_url += '/current.json';
    return this;
  }
}


