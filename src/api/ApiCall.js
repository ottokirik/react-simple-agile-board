import { stringify } from 'query-string';

const DOMAIN = 'http://localhost:3001';

class ApiCall {
  constructor(domain) {
    this.domain = domain;
  }

  async perform({ url, data, config }) {
    const request = await fetch(`${this.domain}/${url}`, {
      ...config,
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });

    return await request.json();
  }

  async get(path, searchParams = {}) {
    return await this.perform({ url: `${path}/?${stringify(searchParams)}` });
  }

  async post(path, payload) {
    return await this.perform({
      url: path,
      data: payload,
      config: { method: 'POST' },
    });
  }

  async put(path, payload) {
    return await this.perform({
      url: path,
      data: payload,
      config: { method: 'PATCH' },
    });
  }

  async delete(path) {
    return await this.perform({
      url: path,
      config: { method: 'DELETE' },
    });
  }
}

export default new ApiCall(DOMAIN);
