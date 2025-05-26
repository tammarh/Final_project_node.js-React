/*import axios from 'axios';

export const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },      };    }  };

// src/app/customAxiosBaseQuery.js
import axios from 'axios';

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }, api) => {
    const { getState } = api;

    // נניח שיש לך את הטוקן תחת state.auth.token
    const token = getState().auth?.token;

    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: token
          ? {
              Authorization: `Bearer ${token}` ,
            }
          : {},
      });

      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
*/


import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:2000",
        credentials:'include',
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token
           if(token){
              headers.set("authorization",`Bearer ${token}`)
           }
           console.log(headers)
           return headers
        }
    }),
    endpoints:()=>({})
})
export default apiSlice
