<template>
  <div class="container">
    <div class="card">
        <form action="" class="form-group">
            <div class="card-header">
                <h1 class="text-center text-uppercase">TodoList-Firebase</h1>
            </div>
            <div class="card-body">
                <label for="" class="form-label">Enter your plan</label>
                <input type="text" name="plan" id="plan" v-model="plan" class="form-control" required>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-primary" type="button" @click="addValue()">Add Tasks</button>
            </div>
        </form>
    </div>
  </div>
  <table class="table container mt-5">
    <thead>
        <tr>
            <th>Task Name</th>
            <th>Time</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="items in plans" :key="items.tasks">
            <td>{{ items.tasks }}</td>
            <td>{{ items.time }}</td>
            <td>
                <button class="btn btn-warning">Edit</button>
                <button class="btn btn-danger ms-3">Delete</button>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import {db} from '../main'
import {doc, setDoc, getDocs, collection, onSnapshot} from 'firebase/firestore'
import Swal from 'sweetalert2'
import {onMounted, ref} from 'vue';
export default {
name: 'TodoList',
data() {
    return {
        plan: '',
    }
},
setup() {
    const plans = ref([]);

    onMounted(()=>{
        const plansCollection = collection(db, 'tasks');
        onSnapshot(plansCollection, (snapshot) => {
            plans.value = snapshot.docs.map(doc => doc.data());
        })
    });

    return { plans };
},
methods: {
    async addValue () {
        const docRef = doc(db, "tasks", this.plan.trim());
        try {
            await setDoc(docRef, {
                tasks: this.plan,
                time: new Date().toLocaleString()
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: 3000,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            Toast.fire({
                icon: 'success',
                title: 'Add Tasks Successfully'
            })
            this.plan = '';
        }catch { 
            console.log('error');
        }
    },
    async getTasksData () {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        this.plans = querySnapshot.docs.map(doc=>doc.data());
    },
    editTask () {
        
    }
},
mounted () {
    this.getTasksData();
}
}
</script>

<style>

</style>