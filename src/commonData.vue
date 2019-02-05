<template>
    <div class="rounded-box container">
        <template>{{toBottom()}}</template>
        <p>Add <slot></slot> </p>
        <b-form-input v-model="comObj['name']" placeholder="name"></b-form-input><br>
        <input type="radio" value="M" v-model="comObj['sex']">
        <label>M</label>
        <input type="radio" value="F" v-model="comObj['sex']">
        <label>F</label><br><br>
        <input type="date" v-model="comObj['dateOfBirth']" placeholder="dob"><br><br>
        <b-form-input v-model="comObj['bio']" placeholder="bio"></b-form-input><br>

        <b-form-group label="Movies">
            <b-form-checkbox v-for="(movie, key) in movies" :key="key" :value="key" v-model="comObj['movies']">{{movie.name}}</b-form-checkbox>
        </b-form-group>

        <b-button variant="success" @click="submitData()">Submit <slot></slot> </b-button>&nbsp;
        <b-button @click="$emit('flipFn')">Cancel</b-button>
    </div>
</template>

<script>
import  axios from 'axios';
import Vue from 'vue';

export default {
    props: {
        movies: Object,
    },
    data () {
        return {
            comObj: {
                name: '',
                sex: '',
                dateOfBirth: '',
                bio: '',
                movies: []
            }
        }
    },
    methods : {
        toBottom () {
            setTimeout(() => {
                window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
                });
            }, 125);
        },
        submitData () {
            this.$emit('submitReturn', this.comObj)
        },
    }
}
</script>

<style scoped>
    .rounded-box {
        padding: 25px;
        border: 2px solid lightblue;
        border-radius: 20px;
        box-shadow: 4px 6px 35px;
        margin-top: 30px;
    }
    input[type="text"] {
        box-shadow: inset 0 2px 4px hsla(0, 0%, 0%, 0.1); 
    }
</style>