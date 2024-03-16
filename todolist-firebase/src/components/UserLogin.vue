<template>
    <div class="container mt-5">
        <div class="card">
            <form class="form-group">
                <div class="card-header">
                    <h1 class="text-center text-uppercase">Login</h1>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="username" class="form-label">Enter your name</label>
                        <input type="text" name="username" id="username" class="form-control" v-model="username">
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" type="button" @click="login">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../main';
import Swal from 'sweetalert2';
export default {
    name: 'UserLogin',
    data() {
        return {
            username: '',
        }
    },
    methods: {
        async login() {
            // Trim the username to remove leading and trailing spaces
            const trimmedUsername = this.username.trim();
            
            // Check if username is empty
            if (trimmedUsername === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter your name!'
                });
                return; // Exit the function if username is empty
            }

            // Construct the document reference
            const docRef = doc(db, "users", trimmedUsername);

            try {
                // Set document data
                await setDoc(docRef, {
                    username: trimmedUsername,
                    time: new Date().toLocaleString()
                });
                // Show success message
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: 3000,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Login Successfully'
                });
                this.$router.push('/todo-list');
            } catch (error) {
                console.error("Error saving user data:", error);
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error saving user data!',
                    text: error.message
                });
            }
        }
    }
}
</script>

<style>
/* Add your styles here if needed */
</style>
