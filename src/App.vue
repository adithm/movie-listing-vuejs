<template>
<div id="app">
    <header>
        <nav class="container">
            <ul>
                <router-link to="/" tag="li" exact>
                    <a>View Movies</a>
                </router-link>
                <router-link to="/add" tag="li" exact>
                    <a>Create</a>
                </router-link>
            </ul>
        </nav>
    </header>
    <div class="container">
        <br><br><br><br>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
    header {
        background: hsl(210, 12%, 16%);
    }
    nav ul {
        list-style: none;
    }
    nav li {
        display: inline-block;
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        margin-right: 4rem;
        margin-left: 2rem;
        position: relative;
    }
    nav a {
        color: white;
        font-size: 1.4rem;
        font-weight: 600;
        text-decoration: none;
    }
    nav li:not(.router-link-exact-active) a:hover {
        color: #c8c9cb;
    }
    #app {
        background-color: #EDF7F5; 
        min-height: 100vh;
        min-width: 100%;
    }
    li.router-link-exact-active::before {
        content: '';
        display: block;
        height: 5px;
        background-color: #07b79a;

        position: relative;
        top: 5rem;
        width: 100%;
    }
</style>