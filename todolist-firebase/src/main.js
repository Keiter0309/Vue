import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjNWRYg9fvdni57j72UxXlAjhB0AaV-XU",
  authDomain: "todo-list-9de96.firebaseapp.com",
  projectId: "todo-list-9de96",
  storageBucket: "todo-list-9de96.appspot.com",
  messagingSenderId: "610306276639",
  appId: "1:610306276639:web:5678f078bc0d0c3b8c842a",
  measurementId: "G-H2EDFHWZQB"
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'UserLogin',
      component: () => import('./components/UserLogin.vue'),
    },
    {
      path: '/todo-list',
      name: 'TodoList',
      component: () => import('./components/TodoList.vue'),
    }
  ]
})


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
getAnalytics(app);
createApp(App).use(router).mount('#app')
export { db }