// this library is used to make and fetch/Use API.
// npm i axios.
import axios from 'axios';
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';

// this method is used to create an api.

// it takes baseurl on which the api runs.

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({   
    baseURL : API_URL,
    timeout : 10000,
    headers : {
        // "Accept": "application/json, form-data", 
        "Content-Type" : "application/json"
    }
})

// INTERCEPTORS ARE HELPFULL BECAUSE IN THIS WE CAN MAKE A SINGLE/COMMON API WHAT CAN BE USED FOR DIFFERENT TYPES OF REQUESTS.

// this function takes two callback functions one for success and one for faliure(error).
// this interceptor is strictly for request purposes.
axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

// this function is also an interceptor strictly for response purposes.

axiosInstance.interceptors.response.use(
    function (response){
        // stop global loader.
        return processResponse(response);
    },
    function (error){
        // stop global loader.
        return Promise.reject(processError(error));
    }
)

// if success -> return{ isSuccess: true, data: Object}.
// if fsil -> return{ isFaliure: true, status: string, msg: string, code: int}.

const processResponse = (response) =>{
    if(response?.status === 200 ){
        return { isSuccess: true, data: response.data};
    }
    else{
        return {
            isFaliure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

// if success -> return{ isSuccess: true, data: Object}.
// if fsil -> return{ isFaliure: true, status: string, msg: string, code: int}.

const processError = (error) =>{
    if (error.response){
        // this case will work if request was made successfully but the server responded with a status code
        // other then the range of 2._._ .
        console.log('ERROR IN RESPONSE: ',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFaliure,
            code: error.response.status
        };
    }
    else if (error.request){
        // this case will work only if the request was made successfully but there was no response.
        console.log('ERROR IN REQUEST: ',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFaliure,
            code: ''
        };
    }
    else{
        // something happened in setting up the request that triggered an error.
        console.log('ERROR IN NETWORK: ',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        };
    }
}

const API = {};

for( const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if(showUploadProgress) {
                    let percentageCompleted = Math.round(( progressEvent.loaded * 100 ) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if(showDownloadProgress) {
                    let percentageCompleted = Math.round(( progressEvent.loaded * 100 ) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }

        })
}

export {API};