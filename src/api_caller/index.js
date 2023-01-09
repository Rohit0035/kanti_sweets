const default_header_option = {
  "Content-Type": "application/json",
};
const setBodyByHeader = (
  headers = { ...default_header_option },
  body = null
) => {
  if (body) {
    if (headers["Content-Type"] === "application/json") {
      return JSON.stringify(body);
    }
    return body;
  } else {
    return null;
  }
};

export const useApi = () => ({
  call: ({ url, method = "get", data, headers }) => {
    let options = {
      method: method,
      headers: { ...default_header_option },
    };
    if (headers && Object.keys(headers).length > 0) {
      options.headers = {
        ...options.headers,
        ...headers,
      };
    }
    switch (method.toLowerCase()) {
      case "post":
      case "put": {
        options.body = setBodyByHeader(options.headers, data);
        break;
      }
      default: {
        delete options.body;
      }
    }

    return fetch(url, options)
      .then((resp) => resp.json())
      .then((json) => json)
      .catch((err) => {
        throw err;
      });
  },
});
