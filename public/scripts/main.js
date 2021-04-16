import LoginComponent from './components/TheLoginComponent.js';
import AllUsers from './components/TheAllUsersComponents.js';
import HomeComponent from './components/TheHomeComponent.js';
import SongComponent from './components/TheSongComponent.js';

const router = new VueRouter({
    routes: [
        { path: '/', name: 'root', component: LoginComponent, beforeEnter: (to, from, next) =>{
            //if you're authenticated (set in localstorage), then go to the home page
            if (localStorage.getItem('cacheduser')) {
                let user = JSON.parse(localStorage.getItem('cacheduser'));
                next({name: 'home', params: {currentuser: user}});
            } else {
                next();
            }
        } },
        { path: '/users', name: 'users', component: AllUsers },
        { path: '/home', name: 'home', component: HomeComponent, props: true },
        { path: '/songs', name: 'songs', component: SongComponent, props: true}
    ]
});

(() =>{
    const vm = new Vue({
        data: {
            allMovies: [],
            authenticated: false,
            isAdmin: false,
            currentUser: undefined
        },

        created: function() {
            // fetch('/api/movies')
            //   .then(res => res.json())
            //   .then(data => {
            //     // show the data in table form
            //     console.table(data);
            //     this.allMovies = data;
            // })
            // .catch(err => console.error(err));
        },

        methods: {
            logout() {
                //remove the cached user from localSorage, if it exists
                if(localStorage.getItem('cacheduser')){
                    localStorage.removeItem('cacheduser')
                }
             this.$router.push({ name: "root"});
             this.currentUser = undefined;
         },

         authenticateuser(user) {
            this.currentUser = user;
        }
        },

        components: {
            // moviethumb: TheMovieThumbnail
        },

        router
    }).$mount("#app");
})();