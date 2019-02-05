<template>
<div id="app">
    <div class="container">
        <br>
        <ul class="nav nav-fill nav-tabs">
            <li class="nav-item">
                <router-link to="/">
                    <a :class="[{ active: active_el === 1 }, 'nav-link', 'mylink']" @click="activate(1)">View Movies</a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/add">
                    <a :class="[{ active: active_el === 2 }, 'nav-link', 'mylink']" @click="activate(2)">Create</a>
                </router-link>
            </li>
        </ul>
        <br><br><br><br>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            active_el : 1
        }
    },
    methods : {
        activate : function(el) {
            this.active_el = el;
        }
    }
}
</script>

<style scoped>
    .mylink {
        font-size: 1.4rem;
        font-weight: bold;
    }
    #app {
        background-color: #EDF7F5; 
        min-height: 100vh;
        min-width: 100%;
    }
    a {
        color: hsl(181, 21%, 47%);
    }
</style>
