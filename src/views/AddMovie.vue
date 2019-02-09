<template>
    <div class="container rounded-main">
        <b-form-input v-validate="'required'" name="name" v-model="movie.name" placeholder="name"></b-form-input><br>
        <p class="errors" v-if="errors.has('name')">{{ errors.first('name') }}</p>

        <input type="date" v-validate="'required'" name="date" v-model="movie.yearOfRelease" placeholder="Year Of Release"><br><br>
        <p class="errors" v-if="errors.has('date')">{{ errors.first('date') }}</p>

        <b-form-input v-validate="'required'" name="plot" v-model="movie.plot" placeholder="plot"></b-form-input><br>
        <p class="errors" v-if="errors.has('plot')">{{ errors.first('plot') }}</p>

        <b-form-input v-validate="'required'" name="poster" v-model="movie.poster" placeholder="poster"></b-form-input><br>
        <p class="errors" v-if="errors.has('poster')">{{ errors.first('poster') }}</p>

        <b-form-group label="Actors">
            <b-form-checkbox-group v-validate="'required'" name="actors" v-model="movie.actors">
                <b-form-checkbox v-for="(actor, key) in actors" :key="key" :value="key">{{actor.name}}</b-form-checkbox>
                <b-button @click="actorShow = !actorShow">New actor</b-button>
            </b-form-checkbox-group>
        </b-form-group>
        <p class="errors" v-if="errors.has('actors')">{{ errors.first('actors') }}</p>

        <b-form-group label="Producers">
            <b-form-radio-group v-validate="'required'" name="producer" v-model="movie.producer">
                <b-form-radio v-for="(prod, key) in producers" :key="key" :value="key"> {{prod.name}} </b-form-radio>
                <b-button @click="producerShow = !producerShow">New producer</b-button>
            </b-form-radio-group>
        </b-form-group>
        <p class="errors" v-if="errors.has('producer')">{{ errors.first('producer') }}</p>
        <br>

        <b-button variant="success" @click="submitData('movie')">Submit Movie</b-button>
        <router-link to="/"> <button class="clear">Cancel</button> </router-link>
 
        <common-data v-if="actorShow" :movies="movies" @cancel="actorShow = !actorShow" @submitReturn="submitData('actor', $event)">Actor</common-data>
        <common-data v-if="producerShow" :movies="movies" @cancel="producerShow = !producerShow" @submitReturn="submitData('producer', $event)">Producer</common-data>
    </div> 
</template>

<script>
import  axios from 'axios';
import commonData from '../components/AddPerson.vue';

export default {
    props: {
        movieId: String
    },
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

            actorShow: false,
            producerShow: false,

            actors: {},
            producers: {},
            movies: {},
        }
    },
    created () {
        for (let elm of ['actors', 'producers', 'movies']) {
            axios.get(`http://localhost:3000/${elm}`)
                .then(response => {
                    for (let key in response.data) {
                        let data = response.data[key]
                        let id = data.id
                        delete data.id
                        this.$set(this[elm], id, data)
                    }
                    if (elm === 'movies' && this.movieId != undefined) {
                        this.movie = this.formatMovie(this.movies[this.movieId])
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    methods: {
        updateMovie() {
            let data = this.formatMovie(this.$data['movie'])
            axios.put(`http://localhost:3000/movies/${this.movieId}`, data)
                .then(res => { 
                        this.$router.push({
                            name: 'ListView',
                            params: {
                                propNotifyMsg: `${this.$data['movie'].name} Edited`
                            }
                        }) 
                    })
        },
        submitPerson(typ, personData) {
            personData.dateOfBirth = this.formatDate(personData.dateOfBirth)
            if (typ === 'actor')
                this.movie.actors.push(Object.keys(this.actors).length + 1)
            else
                this.movie.producer = Object.keys(this.producers).length + 1

            this.$data[typ + 'Show'] = !this.$data[typ + 'Show']
            this.$set(this[`${typ}s`], Object.keys(this[`${typ}s`]).length + 1, personData)

            axios.post(`http://localhost:3000/${typ}s`, personData)
        },
        submitMovie() {
            let data = this.formatMovie(this.$data['movie'])
            this.$set(this.movies, Object.keys(this.movies).length + 1, data)

            axios.post(`http://localhost:3000/movies`, data)
                .then(res => { 
                        this.$router.push({
                            name: 'ListView',
                            params: {
                                propNotifyMsg: `${data.name} Added`
                            }
                        })
                    })
        },
        submitData(typ, personData = undefined) {            
            if (typ === 'movie' && this.movieId != undefined) {
                this.$validator.validateAll().then(res => {
                    if (res)
                        this.updateMovie()
                })
            } 
            else if (personData != undefined) {
                this.submitPerson(typ, personData)
            }
            else {
                this.$validator.validateAll().then(res => {
                    if (res)
                        this.submitMovie()
                })
            }
        },
        formatMovie (movie) {
            let movieCopy = JSON.parse(JSON.stringify(movie))
            movieCopy.yearOfRelease = this.formatDate(movieCopy.yearOfRelease)
            return movieCopy
        },
        formatDate (date) { // dd/mm/yyyy <=> yyyy-MM-dd
            if (date.indexOf("/") !== -1)
                return date.split("/").reverse().join("-")
            else
                return date.split("-").reverse().join("/")
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
    .clear {
        color: hsl(0, 0%, 45%);
        font-weight: 600;
        background-color: Transparent;
        border: none;
        cursor:pointer;
        outline:none;
        margin-left: 1.2rem;
    }
    /deep/ input[type="text"] {
        box-shadow: inset 0 2px 4px hsla(0, 0%, 0%, 0.1); 
    }
    /deep/ .errors {
        color:  #cb2431;
        font-size: 0.8rem;
        margin-top: -0.8rem;
        margin-bottom: 1.6rem;
    }
</style>
