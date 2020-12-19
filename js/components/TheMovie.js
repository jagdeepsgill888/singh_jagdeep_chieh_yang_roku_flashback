export default {
    name: "Themovie",

    props: ["movie"],

    // data needs to be a function inside a component
    data: function() {
        return {
            Name: this.movie.name,
            Type: this.movie.type,

        }
    },

    template: 
    `<li @click="logClicked">
        <img :src="'images/' + movie.avatar" :alt='movie.name + " image"'>
        <p>movie Name: {{ movie.name }}</p>

        <a href="" class="remove-movie">Show {{ movie.name }}'s info</a>                 
        <a href="" class="remove-movie">Remove {{ movie.name }}</a>
    </li>`,

    created: function () {
        console.log(`created ${this.movie.name}'s movie`);
    },

    methods: {
        logClicked() {
            console.log(`fired from inside ${this.movie.name}'s component!`);
        }
    }
}