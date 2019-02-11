<template>
    <div class="container">
        <div :class="[{'movie-expanded' : movie.show}, 'movie-box']" v-for="(movie, key) in movies" :key="key">
            <a href="#" @click="movie.show = !movie.show"> {{key}}. {{movie.name}} </a>
            <div v-if="movie.show">
                <br>
                <div class="flexbox">
                    <div> <img :src="movie.poster"> </div>
                    <div>
                        <p>{{movie.yearOfRelease}}</p>
                        <p>Actors:</p>
                        <p v-for="actor in movie.actors" :key="actor">{{ actors[actor].name }} </p>
                        <p> Porducer : {{ producers[movie.producer].name }}</p>
                    </div>
                </div>
                <b-button variant="warning" @click="editData(key)">Edit</b-button>&nbsp;
                <b-button variant="danger" @click="deleteData(key)">Delete</b-button>&nbsp;
            </div>
        </div>
        <br>
        <div v-show="notifyMsg !== undefined" class="notify" :key="notifyMsg">
            {{notifyMsg}}
        </div>
    </div>
</template>

<script>
import  axios from 'axios';
import Vue from 'vue';

export default {
    props: {
        propNotifyMsg: String
    },
    data () {
        return {
            actors: {},
            producers: {},
            movies: {},
            notifyMsg: this.propNotifyMsg,
            getArr: ['actors', 'producers', 'movies']
        }
    },
    created () {
        for (let elm of this.getArr) {
            axios.get(`http://localhost:3000/${elm}`)
                .then(response => {
                    for (let val in response.data) {
                        let data = response.data[val]
                        let key = data.id
                        delete data.id
                        Vue.set(this[elm], key, data)
                    }
                })
        }
        let vm = this
        setTimeout(function() {
            for (let key in vm.movies) {
                Vue.set(vm.movies[key], 'show', false)
            }
        }, 500);
    },
    methods : {
        editData(key) {
            this.$router.push({
                name: 'AddData',
                params: {
                    movieId: key
                }
            })
        },
        deleteData(key) {
            if (confirm('Are you sure you want to delete?')) {
                this.notifyMsg = `${this.movies[key].name} Deleted`
                Vue.delete(this.movies, key);
                axios.delete(`http://localhost:3000/movies/${key}`)
            }
        }
    }
}
</script>

<style scoped>
    img {
        width: 100px;
        height: 100px;
        background-size: contain;
        background-repeat: no-repeat;
        border: 1px solid #ccc;
        margin-right: 1rem;
    }
    .movie-box {
        text-align: center;
        padding: 20px;
    }
    .movie-box:nth-child(even) {
        background-color:  hsla(182, 30%, 78%, 0.5);
    }
    .movie-box:nth-child(odd) {
        background-color: #EDF7F5;
    }
    .movie-expanded {
        box-shadow: 0 0 4px 1px hsla(349, 100%, 2%, 0.12);
        /* border: 1px solid #b00020; */
    }
    .flexbox {
        display: flex;
        justify-content: center;
    }
    .notify {
        position: fixed;
        top: 7rem;
        left: calc(50% - 12rem);
        width: 24rem;
        height: 4.5rem;
        line-height: 4.5rem;
        background-color: hsl(50, 100%, 82%);
        border-left: 4px solid #FFB03B;
        text-align: center;
        font-weight: 450;
        box-shadow: 0 2px 4px;
        animation: fadeinout 3.5s linear 1 forwards;
    }
    @keyframes fadeinout {
        0% { opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }
    a {
        color: #204E5F;
        font-weight: 700;
        font-size: 1.15rem;
    }
    p {
        font-weight: 450;
    }
</style>