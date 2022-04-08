import axios from 'axios'

export default {


    postData(payload) {

        const url = `https://www.googleapis.com/oauth2/v4/token`;

        return axios.post(url,{grant_type:payload.grant_type,refresh_token:payload.refresh_token,redirect_uri:payload.redirect_uri,client_secret:payload.client_secret,client_id:payload.client_id,cache: false, 'Content-Type': 'application/x-www-form-urlencoded'});

    },

    postDataUp(payload,headers) {

        const url = `https://www.googleapis.com/upload/drive/v2/files`;


        return axios.post(url, payload,{headers:headers,cache: false, 'Content-Type': 'application/json'});


    }
}
