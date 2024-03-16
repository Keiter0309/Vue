<template>
  <div class="container mt-5">
    <div class="card">
        <form action="" class="form-group" @submit.prevent="addValue">
            <div class="card-header">
                <h1 class="text-center text-uppercase">Todo-List</h1>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="" class="form-label">Your Plan</label>
                    <input type="text" name="" id="" class="form-control" v-model="plan">
                </div>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>

    <div class="container mt-5">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>SL</th>
                    <th>Plan</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(plan, i) in plans" :key="i">
                    <td>{{ i+1 }}</td>
                    <td>{{ plan }}</td>
                    <td>
                        <button class="btn btn-danger" @click="deleteValue(i)">Delete</button>
                        <button class="btn btn-warning" @click="editValue(i)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

// import Swal from 'sweetalert2'

export default {
name: 'Todo-List',
    data () {
        return {
            plan: '',
            plans: [],
            editIndex: null
        }
    },
    methods: {
        addValue() {
            if(this.plan) {
                if(this.editIndex !== null) {
                    this.plans[this.editIndex] = this.plan;
                    this.editIndex = null;
                    this.plan = '';
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        icon: 'success',
                        title: 'Updated Successfully',
                        timer: 3000,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Updated Successfully'
                    });
                }else {
                this.plans.push(this.plan);
                this.plan = ''
                Swal.fire({
                    title:"Added Successfully",
                });
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Added Successfully'
                });
            }
        }
        },
        editValue(index) {
            this.plan = this.plans[index];
            this.editIndex = index;
        },
        deleteValue(index) {
            this.plans.splice(index, 1);
            Swal.fire({
                icon: 'warning',
                title: 'You have deleted the plan',
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        icon: 'success',
                        title: 'Deleted Successfully',
                        timer: 3000,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Deleted Successfully'
                    })
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    }
}
</script>

<style>

</style>