const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoint: string, method = 'GET') {
    const ulr = API_URL + endpoint;
    const options = {
        method,
    };

    const name = '';

    return fetch(ulr, options)
        .then( response => response.ok ? response.json() : Promise.reject (Error('Failed to load data')))
        .catch(error => { throw error });
}

export { callApi }