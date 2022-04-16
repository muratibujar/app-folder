<template>
  <Loader v-if="loading"> Loading ...</Loader>
  <div class="wrapper-auk" v-else>

    <div class="body">

      <div class="header">
        <h1>Call for 2022 ATMAE Annual Conference Proposals!</h1>
        <p>The Association of Technology, Management, and Applied Engineering encourage members, professionals,<br> and
          other interested parties to submit conference proposals for the 2022 ATMAE Annual Conference,<br> to be held in
          Louisville, Kentucky on November 9-11, 2022.</p>
      </div>
      <el-form :model="model" status-icon :rules="rules" ref="documentForm" label-width="120px"
               class="demo-ruleForm">
        <div class="box-form">
          <div class="field">
            <span> Title:</span>
            <el-form-item label="" prop="title">

              <el-select class="input" name="title" v-model="model.title" placeholder="Title" style="width: 100%;">
                <el-option
                    v-for="item in titles"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="field">
            <span>Author Name :</span>
            <el-form-item label="" prop="name">
              <el-input placeholder="Author Name " name="name" v-model="model.name">
              </el-input>
            </el-form-item>
          </div>
          <div class="field">
            <span>Institution:</span>
            <el-form-item label="" prop="institution">
              <el-input placeholder="Institution" name="institution" v-model="model.institution">
              </el-input>
            </el-form-item>
          </div>
          <div class="field">
            <span>Author's email:</span>
            <el-form-item label="" prop="authors_email">
              <el-input placeholder="Author's email" name="authors_email" v-model="model.authors_email">
              </el-input>
            </el-form-item>
          </div>
          <div class="field">
            <span>Author's Phone:</span>
            <el-form-item label="" prop="authors_phone">
              <el-input placeholder="Author's Phone" name="authors_phone" v-model="model.authors_phone">
              </el-input>
            </el-form-item>
          </div>
          <div class="field">
            <span>Select one:</span>
            <el-form-item label="" prop="authors_phone">
              <el-radio v-model="model.select_one" label="Paper Presentation">Paper Presentation</el-radio>
              <el-radio v-model="model.select_one" label="Poster Presentation">Poster Presentation</el-radio>
              <el-radio v-model="model.select_one" label="Workshop">Workshop</el-radio>

            </el-form-item>
          </div>



          <div class="field">
            <span> Track:</span>
            <el-form-item label="" prop="track">

              <el-select class="input" name="track" v-model="model.track" placeholder="Track" style="width: 100%;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="field">
            <span>Message: </span>
            <el-form-item label="" prop="message">

              <el-input placeholder="Message" type="textarea" name="message"
                        :autosize="{ minRows: 2}" v-model="model.message">
              </el-input>
            </el-form-item>
          </div>
          <div class="field" style="align-items: center">
            <span> Attach Your File: </span>
            <el-button @click="merre()">Choose File</el-button>
            <span v-if="file === null"> No File Choosen </span>
            <span v-else> {{ this.file.name }} </span>
          </div>
          <div class="field" v-if="show_file_error">
            <p style="width: 200px"></p>
            <p style="color: #F56C6C;font-size: 12px;">File is required</p>
          </div>


<!--          <div class="field-btn">-->
<!--            <el-button type="primary" @click="save()">Submit</el-button>-->
<!--            <input type="file" id="myFile" name="filename" style="display:none" @change="checkFile()">-->
<!--            &lt;!&ndash;          <el-button @click="merre()">uploadFile</el-button>&ndash;&gt;-->

<!--          </div>-->
          <div class="field-btn">
            <div :class="{mx_recaptcha_failed: !recaptcha}">
              <vue-recaptcha
                  sitekey="6LeX_GwfAAAAANhIQaqntKl5ItP1s9kwbxtaT7aO"
                  @verify="mxVerify"

              ></vue-recaptcha>
<!--              <br />-->
              <small v-if="!recaptcha" style="    color: #F56C6C; font-size: 12px;">Doesn't complete!</small>

            </div>
          </div>

          <div class="field-btn" style=" margin: 0px 0px 100px 0px;">

            <div>
              <el-button type="primary" @click="save()">Submit</el-button>

              <input type="file"  id="customFile" style="display:none"   @change="checkFile()" />

            </div>



          </div>


        </div>



<!--        <el-button @click="createFolder()">create folder</el-button>-->


      </el-form>
    </div>

  </div>
</template>

<script>

import db from "@/Firebase/firebaseInit";
import moment from 'moment'
import {mapMutations, mapState} from "vuex";
import mutations from "@/store/mutations_types";
import {generateGeneralUUID} from "@/common/utilities.service";
import Loader from "@/components/Loader";
import VueEasyLightbox from 'vue-easy-lightbox'

import apiServices from "@/common/language.service.js";
import { VueRecaptcha } from 'vue-recaptcha';

function x(){
  this.$notify({
    title: 'Success',
    message: 'Your Paper submitted successfully!',
    type: 'success'

  });
}

export default {
  name: "app-folder",
  components: {
    Loader,
    VueEasyLightbox,
    VueRecaptcha
  },
  data() {
    return {
      loading: false,
      show_file_error: null,
      recaptcha: null,
      model: {
        id: generateGeneralUUID(),
        title: null,
        name: null,
        institution: null,
        authors_email: null,
        authors_phone: null,
        track: null,
        message: null,
        select_one: 'Paper Presentation'

      },
      file: null,
      access_token: null,

      rules: {
        name: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
        title: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
        institution: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
        authors_email: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
        authors_phone: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
        track: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
        // message: [
        //   {required: true, message: 'Field is required', trigger: 'change'},
        // ],
      },


      titles: [
        {
          label: 'Dr.',
          value: 'Dr.'
        }, {
          label: 'Prof.',
          value: 'Prof.'
        }, {
          label: 'Mr',
          value: 'Mr'
        }, {
          label: 'Ms',
          value: 'Ms'
        }
      ],

      options: [
        {
          label: 'Program Administration and Accreditation',
          value: 'Program Administration and Accreditation'
        }, {
          label: 'Construction and Nanotechnology',
          value: 'Construction and Nanotechnology'
        }, {
          label: 'Teaching and Learning Innovations',
          value: 'Teaching and Learning Innovations'
        }, {
          label: 'Graphics',
          value: 'Graphics'
        }, {
          label: 'Automation, Electrical, and Computer Systems',
          value: 'Automation, Electrical, and Computer Systems'
        }, {
          label: 'Operational, Project, and Technology Management',
          value: 'Operational, Project, and Technology Management'
        }, {
          label: 'Manufacturing Systems',
          value: 'Manufacturing Systems'
        }, {
          label: 'Safety',
          value: 'Safety'
        }, {
          label: 'Other',
          value: 'Other'
        }
      ]
    }
  },


  mounted() {

    this.loginFirst();


  },
  methods: {
    ...mapMutations([
      mutations.SET_ORDERS,
      mutations.SET_POROSIA_EDIT,
    ]),
    mxVerify( response ) {

      this.recaptcha = response

      console.log("RESP",this.recaptcha)

    },


     save() {



      this.$refs['documentForm'].validate(async (valid) => {
        if (this.show_file_error === null) {
          this.show_file_error = true
        }
        if (valid && this.show_file_error === false && this.recaptcha) {
          this.loading = true;
          // this.uploadF();
          await this.guardarArchivo();

          await db.collection('/folder-app-1/data/data').add(this.model).then(docRef => {


            this.model = {
              id: null,
              title: null,
              name: null,
              institution: null,
              authors_email: null,
              authors_phone: null,
              track: null,
              message: null,
            }
            this.recaptcha = null;

          }).catch(error => console.log(error))

          // await  this.openNotif();

          setTimeout(() => {
            this.openNotif();
            this.loading = false;
          }, 3000);

        } else {
          return false;
        }
      })






    },

    uploadTest() {
      // const CLIENT_ID = '310096513581-mastvnr3mu95f0nsm50pt6q28mlc2pi8.apps.googleusercontent.com'
      // const CLIENT_SECRET = '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'
      // const RIDIRECT_URL = 'https://developers.google.com/oauthplayground'
      // const REFRESH_TOKEN = '1//04Wk4adMHShSCCgYIARAAGAQSNwF-L9Ir3asgxxN5XeMQsAy5HjuSfE6m7QtZ851F__IdbDc3byU8T-C6yHR9uOFIETrAjGgGA1E'
      var clientId = "310096513581-mastvnr3mu95f0nsm50pt6q28mlc2pi8.apps.googleusercontent.com";

      // redirect_uri of the project

      var redirect_uri = "https://developers.google.com/oauthplayground";

      // scope of the project

      var scope = "https://www.googleapis.com/auth/drive";

      // the url to which the user is redirected to

      var url = "";


      // this is event click listener for the button

      // $("#login").click(function(){

      // this is the method which will be invoked it takes four parameters

      // signIn(clientId,redirect_uri,scope,url);
      //
      // });
      //
      // function signIn(clientId,redirect_uri,scope,url){

      // the actual url to which the user is redirected to

      url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri
          + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope
          + "&access_type=offline";

      // this line ma kes the user redirected to the url

      window.location = url;


      // }
    },

    checkFile() {
      this.file = document.getElementById('customFile').files[0];
      this.show_file_error = false;
    },


    merre() {
      document.getElementById("customFile").click();
    },
    createFolder(){
      let headers = {
        Authorization: "Bearer" + " " + this.access_token
      }
      var body = {
        "title" : "Folder",
          "mimeType" : "application/vnd.google-apps.folder",
      }

      apiServices.createFolder(body,this.access_token).then(res => {

        this.$notify({
          title: 'Success',
          message: 'Your Paper submitted successfully!',
          type: 'success'

        });
      }).catch((error) => {
        console.log("error", error)

      }).finally(() => {
        this.file = null;
        this.loading = false
      })
    },
    uploadF() {

      this.loading = true
      const selectedFileS = document.getElementById('myFile').files[0];


      let headers = {
        Authorization: "Bearer" + " " + this.access_token
      }

      this.$set(selectedFileS, 'title', 'koso');
      var text ='KOSOVA'
      const blob = new Blob([text], {type: 'plain/text'});

      apiServices.postDataUp(blob, headers).then(res => {
        this.$notify({
          title: 'Success',
          message: 'Your Paper submitted successfully!',
          type: 'success'

        });
      }).catch((error) => {
        console.log("error", error)

      }).finally(() => {
        this.file = null;
        this.loading = false
      })


    },
    loginFirst() {
      this.loading = true;
      const redirect_uri = "https://developers.google.com/oauthplayground" // replace with your redirect_uri;
      const client_secret = "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"; // replace with your client secret
      var client_id = "310096513581-mastvnr3mu95f0nsm50pt6q28mlc2pi8.apps.googleusercontent.com"// replace it with your client id;

      let payload = {
        redirect_uri: redirect_uri,
        client_secret: client_secret,
        client_id: client_id,
        refresh_token: '1//04Wk4adMHShSCCgYIARAAGAQSNwF-L9Ir3asgxxN5XeMQsAy5HjuSfE6m7QtZ851F__IdbDc3byU8T-C6yHR9uOFIETrAjGgGA1E',
        grant_type: "refresh_token"
      }

      apiServices.postData(payload).then(res => {

        this.access_token = res.data.access_token


      }).catch((error) => {
        console.log("error", error)

      }).finally(() => {
        this.loading = false;
      })


    },

    openNotif(){
      this.file = null;
      this.$notify({
        title: 'Success',
        message: 'Your Paper submitted successfully!',
        type: 'success'

      });
    },

    guardarArchivo() {

      var folder;

      if(this.model.track === 'Administration'){
        folder= '1O13BJEuR7VLGMNg9NYIOLE6OP5-ELcz1'
      }
      if(this.model.track === 'Construction'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Distance Learning/Teaching Innovations'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Electricity'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Electronics'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Construction'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Computer Technology & Energy Issues'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Graphics'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Management'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'Micro/Nanotechnology'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }
      if(this.model.track === 'WITMAE'){
        folder= '19RVotz8Nzb3gNFXpUJte8LggUrKFB99a'
      }

      

         // const selectedFileS = document.getElementById('myFile').files[0];
        var file = document.getElementById('customFile').files[0]; //the file
        var fileName = file.name + "/&/&"+folder
        var reader = new FileReader() //this for convert to Base64
        reader.readAsDataURL(file) //start conversion...
        reader.onload = function (e) { //.. once finished..
          var rawLog = reader.result.split(',')[1] ; //extract only thee file data part
          var dataSend = { dataReq: { data: rawLog, name: fileName, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
          fetch('https://script.google.com/macros/s/AKfycbzWgkNMyquE2Lzh3L8Av5RyaaH56qeeV9ggdGvbVbhsOCTvGMk8pLECcXvVqJLwUb6agg/exec', //your AppsScript URL
              { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
              .then(res => res.json()).then((a) => {
          }).catch(e => console.log(e))
        }

    }
  }

}
</script>

<style scoped lang="scss">

.el-form-item {
  width: 100% !important;
  margin-bottom: 16px !important;
}
//.el-form-item {
//  margin-bottom: 16px;
//}
.wrapper-auk {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  background-color: white;

  .title-legend {
    width: 90%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #363435;
    margin-top: 5px;

    ::v-deep .el-button--primary {
      color: #FFF;
      background-color: #363435 !important;
      border-color: #363435 !important;
    }

  }

  .body {

    .header {
      margin-top: 20px;
      margin-bottom: 25px;
      text-align: left;
    }

    .box-form {
      text-align: left;
      width: 70%;

      .field {
        //max-width: 400px;
        display: flex;
        //align-items: center;
        gap: 10px;

        //margin-bottom: 10px;

        span {
          width: 200px
        }
      }

      .field-btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }


}
</style>

