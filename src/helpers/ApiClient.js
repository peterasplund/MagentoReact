import superagent from 'superagent';
// import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

// const apiHost = __DEVELOPMENT__ ? config.apiHost.local : config.apiHost.live;
const apiHost = 'http://local.magento/';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return apiHost + '/API' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    // this.token = null;
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        // if (cookie.load('token')) {
        //   this.token = cookie.load('token');
        // }

        if (params) {
          request.query(params);
        }
/*
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (this.token !== null) {
          request.set('Authorization', this.token);
        }
*/

        if (data) {
          request.send(data);
        }

        request.withCredentials().end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  empty() {}
}
