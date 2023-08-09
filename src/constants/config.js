// API NOTIFICATION MESSAGES.

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, please wait'
    },
    success: {
        title: 'Success',
        message: 'Data is successfully loaded'
    },
    responseFaliure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server. Please try again'
    },
    requestFaliure: {
        title: 'Error',
        message: 'An error occures while parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server. Please check internet connectivity and try again later'
    }
}

// this module will be imported in the api.js file.
// and will be used as errors and messages.

// API service call
// SAMPLE REQUEST
// NEED SERVICE CALL: {url: '/', method: 'POST/GET/PUT/DELETE' params: true/false, query: true/false }
export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/file/upload', method: 'POST' }
}