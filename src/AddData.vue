<template>
    <div class="container rounded-main">
        <b-form-input v-model="movie.name" placeholder="name"></b-form-input><br><br>
        <input type="date" v-model="movie.yearOfRelease" placeholder="Year Of Release"><br><br>
        <b-form-input v-model="movie.plot" placeholder="plot"></b-form-input><br><br>
        <b-form-input v-model="movie.poster" placeholder="poster"></b-form-input><br><br>

        <b-form-group label="Actors">
            <b-form-checkbox v-for="(actor, key) in actors" :key="key" :value="key" v-model="movie.actors">{{actor.name}}</b-form-checkbox>
            <b-button @click="aFlag = !aFlag">New actor</b-button>
        </b-form-group>

        <b-form-group label="Producers">
        <b-form-radio-group v-model="movie.producer">
            <b-form-radio v-for="(prod, key) in producers" :key="key" :value="key"> {{prod.name}} </b-form-radio>
            <b-button @click="pFlag = !pFlag">New producer</b-button>
        </b-form-radio-group>
        </b-form-group>


        <b-button variant="success" @click="submitData('movie')">Submit Movie</b-button>
 
        <template v-if="aFlag">
            <common-data :movies="movies" @flipFn="aFlag = !aFlag" @submitReturn="submitData('actor', $event)">Actor</common-data>
        </template>
        <template v-if="pFlag">
            <common-data :movies="movies" @flipFn="pFlag = !pFlag" @submitReturn="submitData('producer', $event)">Producer</common-data>
        </template>
    </div> 
</template>

<script>
import  axios from 'axios';
import commonData from './commonData.vue';

export default {
    props: ['movieId'],
    data () {
        return {
            movie: {
                name: '',
                yearOfRelease: '',
                plot: '',
                poster: '',
                actors: [],
                producer: '',
            },

            aFlag: false,
            pFlag: false,

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
                        this.$set(this[elm], key, dat)
                        if (elm === 'movies' && this.movieId != undefined)
                            this.movie = this.movies[this.movieId]
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    methods: {
        submitData(typ, rData = undefined) { // received data from commonData component
            if (typ === 'movie' && this.movieId != undefined) {
                axios.put(`http://localhost:3000/movies/${this.movieId}`, this.$data['movie'])
                    .then(res => { 
                        if (typ === 'movie') 
                            this.$router.push('/') 
                        })
            } else {
                let locData = rData
                if (rData != undefined) {
                    if (typ === 'actor')
                        this.movie.actors.push(Object.keys(this.actors).length + 1)
                    else if (typ === 'producer')
                        this.movie.producer = Object.keys(this.producers).length + 1
                    this.$data[typ[0]+'Flag'] = !this.$data[typ[0]+'Flag']
                } else {
                    locData = this.$data['movie']
                }
                this.$set(this[`${typ}s`], Object.keys(this[`${typ}s`]).length + 1, locData)

                axios.post(`http://localhost:3000/${typ}s`, locData)
                    .then(res => { 
                        if (typ === 'movie') 
                            this.$router.push('/') 
                        })
            }
        }
    },
    components: {
        'common-data': commonData
    }
}
</script>

<style scoped>
    .rounded-main {
        padding: 25px;
        border: 2px solid lightgreen;
        border-radius: 20px;
        box-shadow: 2px 4px 25px;
        margin: 10px 10px 50px 10px;
        background-color: white;
    }
    input[type="text"] {
        box-shadow: inset 0 2px 4px hsla(0, 0%, 0%, 0.1); 
    }
</style>
