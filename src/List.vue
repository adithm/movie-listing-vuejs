<template>
    <div class="container">
        <div :class="[{'movie-expanded' : movie.show}, 'movie-box']" v-for="(movie, key) in movies" :key="key">
             <a href="#" @click="movie.show = !movie.show"> {{key}}. {{movie.name}} </a>
            <div v-if="movie.show">
                <br>
                <p>{{movie.yearOfRelease}}</p>
                <p>Actors:</p>
                <p v-for="actor in movie.actors" :key="actor">{{ actors[actor].name }} </p>
                <p> Porducer : {{ producers[movie.producer].name }}</p>
                <b-button variant="warning" @click="editData(key)">Edit</b-button>&nbsp;
                <b-button variant="danger" @click="deleteData(key)">Delete</b-button>&nbsp;
            </div>
        </div>
    </div>
</template>

<script>
import  axios from 'axios';
import Vue from 'vue';

export default {
    data () {
        return {
            actors: {},
            producers: {},
            movies: {},
            getArr: ['actors', 'producers', 'movies']
        }
    },
    created () {
        for (let elm of this.getArr) {
            axios.get(`http://localhost:3000/${elm}`)
                .then(response => {
                    for (let val in response.data) {
                        let dat = response.data[val]
                        let key = dat.id
                        delete dat.id
                        Vue.set(this[elm], key, dat)
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
                Vue.delete(this.movies, key);
                axios.delete(`http://localhost:3000/movies/${key}`)
            }
        }
    }
}
</script>

<style scoped>
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
    a {
        color: #204E5F;
        font-weight: 700;
        font-size: 1.15rem;
    }
    p {
        font-weight: 450;

    }
</style>