import { useReducer, useCallback } from "react";

const USE_HTTP_STATUS = {
  SEND: "SEND",
  RESPONSE: "RESPONSE",
  ERROR: "ERROR",
  CLEAR: "CLEAR",
};

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case USE_HTTP_STATUS.SEND:
      return {
        ...initialState,
        loading: true,
        identifier: action.identifier,
      };
    case USE_HTTP_STATUS.RESPONSE:
      return {
        ...httpState,
        loading: false,
        data: action.data,
        extra: action.extra,
      };
    case USE_HTTP_STATUS.ERROR:
      return {
        loading: false,
        error: action.errorMessage,
      };
    case USE_HTTP_STATUS.CLEAR:
      return initialState;
    default:
      throw new Error("Should not reach here");
  }
};
const useHttp = () => {
  const [httpState, httpDispath] = useReducer(httpReducer, initialState);

  const clear = () => httpDispath({ type: USE_HTTP_STATUS.CLEAR });

  const sendRequest = useCallback(
    (url, method, body, customHeader, reqIdentifier, reqExtra) => {
      httpDispath({
        type: USE_HTTP_STATUS.SEND,
        identifier: reqIdentifier,
      });
      let header = {
        "Content-Type": "application/json",
      };
      if (
        customHeader &&
        customHeader instanceof Object &&
        Object.keys(customHeader).length
      ) {
        header = {
          ...header,
          ...customHeader,
        };
      }
      fetch(url, {
        method: method || "GET",
        body: body && JSON.stringify(body),
        headers: header,
      })
        .then((response) => {
          if (response.status === 401) {
            window.location = window.location;
          } else {
          }
          return response.json();
        })
        .then((responseData) => {
          if (responseData.status >= 400) {
            httpDispath({
              type: USE_HTTP_STATUS.ERROR,
              errorMessage: new Error(
                (responseData.data && responseData.data.message) ||
                  "Something went wrong"
              ),
            });
          } else {
            httpDispath({
              type: USE_HTTP_STATUS.RESPONSE,
              data: responseData,
              extra: reqExtra,
            });
          }
        })
        .catch((error) => {
          httpDispath({
            type: USE_HTTP_STATUS.ERROR,
            errorMessage: error,
          });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clearHttp: clear,
  };
};

export default useHttp;
