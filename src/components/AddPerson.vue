<template>
    <b-modal v-model="modalShow" hide-footer hide-header no-close-on-esc no-close-on-backdrop>
        <template>{{ toBottom() }}</template>
        <p>Add <slot></slot> </p>

        <b-form-input v-validate="'required|alpha_spaces'" name="name" v-model="person['name']" placeholder="name"></b-form-input><br>
        <p class="errors" v-if="errors.has('name')">{{ errors.first('name') }}</p>

        <b-form-radio-group v-validate="'required'" name="sex" v-model="person['sex']">
            <b-form-radio value="M"> M </b-form-radio>
            <b-form-radio value="F"> F </b-form-radio>
        </b-form-radio-group>
        <br>
        <p class="errors" v-if="errors.has('sex')">{{ errors.first('sex') }}</p>
        
        <input type="date" v-validate="'required'" name="date" v-model="person['dateOfBirth']" placeholder="dob"><br><br>
        <p class="errors" v-if="errors.has('date')">{{ errors.first('date') }}</p>

        <b-form-input v-validate="'required'" v-model="person['bio']" name="bio" placeholder="bio"></b-form-input><br>
        <p class="errors" v-if="errors.has('bio')">{{ errors.first('bio') }}</p>        

        <b-form-group label="Movies">
            <b-form-checkbox-group v-validate="'required'" name="movies" v-model="person['movies']">
                <b-form-checkbox v-for="(movie, key) in movies" :key="key" :value="key">{{movie.name}}</b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
        <p class="errors" v-if="errors.has('movies')">{{ errors.first('movies') }}</p>

        <b-button variant="success" @click="submitData()">Submit <slot></slot> </b-button>&nbsp;
        <b-button @click="$emit('cancel')">Cancel</b-button>
    </b-modal>
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
            modalShow: true,
            hide: true,
            person: {
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
            this.$validator.validateAll().then(res => {
                if (res) 
                    this.$emit('submitReturn', this.person)
            })
        },
    }
}
</script>

<style scoped>
    .rounded-box {
        position: relative;
        background: white;
        padding: 25px;
        border: 2px solid lightblue;
        border-radius: 20px;
        box-shadow: 4px 6px 35px;
        margin-top: 30px;
        z-index: 2;
    }
</style>