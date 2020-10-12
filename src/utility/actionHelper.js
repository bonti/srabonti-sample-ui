import { isNullOrUndefined } from "util";
import { replaceNull, deleteKeysFromObject } from '../utility/generalFunctions';
require('isomorphic-fetch');


export function getDataApiOptions(requestOptions, requestBody) {
  let options = {
    method: requestOptions.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + requestOptions.authToken
    }
  }
  if (!isNullOrUndefined(requestBody)) {
    options.body = JSON.stringify(requestBody);
  }
  return options;
}

/*export function getFileApiOptions(requestOptions, requestBody) {
  let options = {
    method: requestOptions.method,
    headers: {
      'Authorization': 'Bearer ' + requestOptions.authToken,
    }
  }
}*/


export const fetchData = (url, options) => {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then(response => response.json().then(result => ({ result })))
    .catch(error => ({ error }));
};


export function fetchDataAndDispatch(url, options, dispatch, type, typeError) {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then(response => response.json().then(result => {
      result.responseStatus.statusDescription === "Success" ? dispatch(
        {
          type,
          payload: {
            data: result.pageSize ? replaceNull(deleteKeysFromObject(result, ["responseStatus"])) : (result.responseData[0] ? replaceNull(result.responseData[0]) : null),
            error: null,
            loaded: true
          }
        })
        : dispatch({
          type: type,
          payload: {
            data: null,
            error: result.responseStatus,
            loaded: true
          }
        });
    }))
    .catch(error => {
      console.log(error)
      dispatch({
        type: type,
        payload: {
          data: null,
          error: error.responseStatus ? error.responseStatus : {
            errorMessage: [{
              key: "generic.error",
              message: "Server is down"
            }],
            "httpStatusCode": 500,
            "httpSubStatusCode": 500,
            "statusDesc": "ServerFailure"
          },
          loaded: true
        }
      })
    });
}


// //TODO: account for multiple types in array
// export function fetchDataAndDispatchWithPromise(url, options, dispatch, type, typeError) {
//  try {
//     const responseData = await this.fetchDataAndDispatch(url, options, dispatch, type);  
//   }
//   catch (err) { 
//   }
//   return Promise.resolve();
// };


/**
 * returns object from clientconfig based on the key specified.
 * @param {object} configObject 
 * @param {string} key 
 */
export const getObjectFromClientConfig = (configObject, key, keyType, searchText) => {
  let searchValue = null;
  if (configObject && key && configObject[key]) {
    searchValue = configObject[key].find(function (configItem) {
      const type = `${keyType}Type`;
      if (configItem[type] === searchText) {
        return configItem;
      }
      return null;
    });
  }
  return searchValue;
}

/**
 * returns a value from clientconfig based on the key specified.
 * @param {object} configObject 
 * @param {string} key 
 */
export const getValueFromClientConfig = (configObject, key, keyType, searchText) => {
  let configValue = null;
  let clientData = getObjectFromClientConfig(configObject, key, keyType, searchText);
  if (clientData) {
    const value = `${keyType}Value`;
    configValue = clientData[value];
  }
  return configValue;
}

export function searchAndDispatch(url, options, dispatch, type, searchFilters) {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then(response => response.json().then(result => {
      result.responseStatus.statusDescription === "Success" ? dispatch(
        {
          type,
          payload: {
            data: result.pageSize ? replaceNull(deleteKeysFromObject(result, ["responseStatus"])) : replaceNull(result.responseData[0]),
            error: null,
            loaded: true
          },
          searchFilters: searchFilters
        })
        : dispatch({
          type: type,
          payload: {
            data: null,
            error: result.responseStatus,
            loaded: true
          },
          searchFilters: searchFilters
        });
    }))
    .catch(error => {
      console.log(error)
      dispatch({
        type: type,
        payload: {
          data: null,
          error: error.responseStatus ? error.responseStatus : {
            errorMessage: [{
              key: "generic.error",
              message: "Server is down"
            }],
            "httpStatusCode": 500,
            "httpSubStatusCode": 500,
            "statusDesc": "ServerFailure"
          },
          loaded: true
        },
        searchFilters: searchFilters
      })
    });
}

export function getDataApiOptionsNotAuthenticated(requestOptions, requestBody) {
  const options = {
    method: requestOptions.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Client-Name': requestOptions.clientName
    },
    body: JSON.stringify(requestBody)
  }
  return options;
}

export function fetchWithoutDispatch(url, options) {
  return async (dispatch) => {
    let response = undefined;
    let payload = undefined;
    try {
      response = await fetchData(url, options);
      let result = response.result;
      result.responseStatus.statusDescription === "Success" ?
        payload = {
          data: result.pageSize ? replaceNull(deleteKeysFromObject(result, ["responseStatus"])) : replaceNull(result.responseData[0]),
          status: result.responseStatus,
          loaded: true
        } :
        payload = {
          data: null,
          status: result.responseStatus,
          loaded: true
        }
    }
    catch (err) {
      console.error('error while fetchWithoutDispatch', err);
      payload = {
        data: null,
        status: err.responseStatus ? err.responseStatus : {
          errorMessage: [{
            key: "generic.error",
            message: "Server is down"
          }],
          "httpStatusCode": 500,
          "httpSubStatusCode": 500,
          "statusDesc": "ServerFailure"
        },
        loaded: true
      }
    }
    return Promise.resolve(payload);
  };
}