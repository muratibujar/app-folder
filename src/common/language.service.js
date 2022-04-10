import axios from 'axios'

export default {


    postData(payload) {

        const url = `https://www.googleapis.com/oauth2/v4/token`;

        return axios.post(url,{grant_type:payload.grant_type,refresh_token:payload.refresh_token,redirect_uri:payload.redirect_uri,client_secret:payload.client_secret,client_id:payload.client_id,cache: false, 'Content-Type': 'application/x-www-form-urlencoded'});

    },

    postDataUp(payload,headers) {

        const url = `https://www.googleapis.com/upload/drive/v2/files`;
        var metadata = {
            name: 'backup-file-'+String(Math.random() * 10000).split('.')[0]+'.txt',
            mimeType: 'plain/text',
            parents: ['1O13BJEuR7VLGMNg9NYIOLE6OP5-ELcz1']
        };
        var formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
        formData.append("file", payload);

        return axios.post(url, formData,{
            params: formData,
            headers:headers,cache: false, 'Content-Type': 'application/json'});


    },
    createFolder(payload,access_token) {

        const url = `https://www.googleapis.com/drive/v2/files`;


        return axios.post(url, payload,{
            params: {
                'title': 'bujar',
                'mimeType': 'application/vnd.google-apps.folder'
            },
            headers: {
                authorization: `Bearer ${access_token}`
            }
        });


    }
}
