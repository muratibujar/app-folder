<template>
  <div class="upload-image">
    <el-upload
        :disabled="disabled"
               list-type="picture-card"
                :on-change="uploadCoverImage"
               v-model="imageUrl"
               :before-upload="onBeforeUpload"
               :show-file-list="false">
      <img v-show="imageUrl" height="100%" width="100%" :src="imageUrl" alt="">

      <i v-show="!imageUrl" class="el-icon-plus"></i>
    </el-upload>


    <div v-show="imageUrl" class="on-hover"  style="position: absolute;top: 1%;left:1%;">
      <i  class="el-icon-delete pointer" size="small" style="opacity: 1; color:white;"
          @click="remove"></i>
    </div>


  </div>
</template>

<script>
import firebase from 'firebase'
// import db from '@/Firebase/firebaseInit.js'
import {generateGeneralUUID} from "@/common/utilities.service";

export default {
  name: "upload-image",
  props: ['image', 'disabled'],
  mounted() {
    this.$nextTick(() => {
      this.imageUrl = this.image ? this.image : null;
    })

    // this.url = `${hkConfigEnvs.VUE_APP_BASE_URL_API}/${hkConfigEnvs.VUE_APP_CORE_API}/${hkConfigEnvs.VUE_APP_ENTERPRISE_IDENTIFIER}/images`;
    // this.headers = {
    //   'hk-token': tokenObj.token,
    //   'hk-info': tokenObj.info,
    // };
  },
  data() {
    return {
      url: null,
      headers: null,
      imageUrl: null,
      loading: false,
      show_button: false,
      imageData: null,
    }
  },
  methods: {
    onBeforeUpload(file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPGOrPNG) {
      //   this.$message.error('Image must be JPG or PNG format!');
      // }
      //
      // if (!isLt2M) {
      //   this.$message.error('Image size can not exceed 2MB!');
      // }

      return isJPGOrPNG;

    },
    remove() {
      this.imageUrl = null;
      this.$emit('imageUploaded', this.imageUrl)
    },

    uploadCoverImage(event,t){
      console.log("event",event);
      let type = event.raw.type.split("/")
      this.uploadValue=0;
      this.imageUrl = null;
      this.imageData =event.raw;

      this.imageUrl =null;
      const storageRef = firebase.storage().ref(`${generateGeneralUUID()}.${type[1]}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot =>{
            this.uploadValue =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.imageUrl = url;
              this.$emit('imageUploaded', this.imageUrl)
            });
          }
      )

    },
    // upload(){
    //   this.picture =null;
    //   const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
    //   storageRef.on(`state_changed`,snapshot =>{
    //         this.uploadValue =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    //       }, error=>{console.log(error.message)},
    //       ()=>{this.uploadValue = 100;
    //         storageRef.snapshot.ref.getDownloadURL().then((url)=>{
    //           this.picture = url;
    //         });
    //       }
    //   )
    // },



    // uploadCoverImage(param) {
    //   console.log("TESt",param);
      // this.loading = true;
      // let fileObj = param.file;
      // let form = new FormData();
      // param.data = param.data || [];
      // form.append("image", fileObj);
      //
      // // this.$log.debug('param ', param)
      //
      // axios.post(this.url,
      //     form, {
      //       headers: this.headers,
      //       onUploadProgress: (progressEvent => {
      //         const complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      //         param.onProgress({percent: complete})
      //       })
      //     })
      //     .then((res) => {
      //       // this.$log.debug("res ", res);
      //       this.imageUrl = res.data.image.image;
      //       this.$emit('imageUploaded', this.imageUrl)
      //
      //     }).catch((error) => {
      //   // this.$log.debug("Error ", error)
      // }).finally(() => {
      //   // this.loading = false;
      // })



    // },
  },
}
</script>

<style scoped lang="scss">
.upload-image {
  //width: 100px;
  position: relative;


  ::v-deep .el-upload--picture-card{
    width: 100% !important;
  }

  .on-hover {
    display: none;
    font-size: 20px;
  }

  &:hover {


    .on-hover {
      display: inline;
      width: 100%;
      //height: ;
      position: absolute;
      top: 0.1%;
      left: 0.1%;
      background-color: #080808;
      padding: 16.5% 44%;
      opacity: 0.5;
      border-radius:2px ;
    }
  }

}

@media only screen and (max-width: 820px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }

  .upload-image {


    ::v-deep .el-upload--picture-card{

    }

    .on-hover {

    }

    &:hover {


      .on-hover {

        padding: 20.5% 44%;

      }
    }

  }

}

</style>
