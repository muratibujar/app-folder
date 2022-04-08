<template>
  <Loader v-if="loading"></Loader>
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
            <span>Name:</span>
            <el-form-item label="" prop="name">
              <el-input placeholder="Name" name="name" v-model="model.name">
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
                        :autosize="{ minRows: 4}" v-model="model.message">
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


          <div class="field-btn">
            <el-button type="primary" @click="save()">Submit</el-button>
            <input type="file" id="myFile" name="filename" style="display:none" @change="checkFile()">
            <!--          <el-button @click="merre()">uploadFile</el-button>-->

          </div>


        </div>

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

export default {
  name: "app-folder",
  components: {
    Loader,
    VueEasyLightbox
  },
  data() {
    return {
      loading: false,
      show_file_error: null,
      model: {
        id: generateGeneralUUID(),
        title: null,
        name: null,
        institution: null,
        authors_email: null,
        authors_phone: null,
        track: null,
        message: null,

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
        message: [
          {required: true, message: 'Field is required', trigger: 'change'},
        ],
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
          label: 'Administration',
          value: 'Administration'
        }, {
          label: 'Construction',
          value: 'Construction'
        }, {
          label: 'Distance Learning/Teaching Innovations',
          value: 'Distance Learning/Teaching Innovations'
        }, {
          label: 'Electricity',
          value: 'Electricity'
        }, {
          label: 'Electronics',
          value: 'Electronics'
        }, {
          label: 'Computer Technology & Energy Issues',
          value: 'Computer Technology & Energy Issues'
        }, {
          label: 'Graphics',
          value: 'Graphics'
        }, {
          label: 'Management',
          value: 'Management'
        }, {
          label: 'Micro/Nanotechnology',
          value: 'Micro/Nanotechnology'
        }, {
          label: 'WITMAE (Women in Technology, Management and Applied Engineering\n' +
              '    Workshops)',
          value: 'WITMAE (Women in Technology, Management and Applied Engineering\n' +
              '    Workshops)'
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


    save() {


      this.$refs['documentForm'].validate((valid) => {
        if (this.show_file_error === null) {
          this.show_file_error = true
        }
        if (valid && this.show_file_error === false) {
          this.uploadF();
          db.collection('/folder-app-1/data/data').add(this.model).then(docRef => {

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

          }).catch(error => console.log(error))

        } else {
          return false;
        }
      });


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
      this.file = document.getElementById('myFile').files[0];
      this.show_file_error = false;
    },


    merre() {
      document.getElementById("myFile").click();
    },

    uploadF() {

      this.loading = true
      const selectedFileS = document.getElementById('myFile').files[0];


      let headers = {
        Authorization: "Bearer" + " " + this.access_token
      }

      this.$set(selectedFileS, 'title', 'koso');


      apiServices.postDataUp(selectedFileS, headers).then(res => {
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


    }
  }

}
</script>

<style scoped lang="scss">

.el-form-item {
  width: 100% !important;
}

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
        margin-top: 20px;
      }
    }
  }


}
</style>

