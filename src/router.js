import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';



import AppFolder from '@/views/app-folder/app-folder'




Vue.use(Router)

let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'app-folder',
            component: AppFolder,

        },
        {
            path: '/*',
            redirect: '/',
        },
    ]
})

// export default router;

router.beforeEach((to,from,next) =>{
    if(to.matched.some(record => record.meta.requiresAuth)){

        // kotrolloje nese eshte loguar
        if(!firebase.auth().currentUser){

            next({
                path:'/',
                query: {
                    redirect: to.fullPath
                }
            })
        }else{
            next();
        }
    }else if(to.matched.some(record => record.meta.requiresGuest)){
        if(firebase.auth().currentUser){

            next({
                path:'/home',
                query: {
                    redirect: to.fullPath
                }
            })
        }else{
            next();
        }
    }else {
        next();
    }
})

export default router;
