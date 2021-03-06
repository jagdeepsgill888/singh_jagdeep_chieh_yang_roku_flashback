const { VueperSlides, VueperSlide } = vueperslides;

export default {
    name: "TheHomeComponent",

    props: ['currentuser'],

    template: `
    <div class="container">
   
        <div class="row">
            <div class="media-container">
                <video autoplay controls muted :src="'video/' + currentMediaDetails.movies_trailer" class="fs-video"></video>
            </div>

            <div class="info-container">
                <h4 class="media-title">{{currentMediaDetails.movies_title}}</h4>
                <span class="media-genre"><strong>{{currentMediaDetails.movies_genre}}</strong></span>
                <span class="media-year">{{currentMediaDetails.movies_year}}</span>
                <span class="media-time">{{currentMediaDetails.movies_runtime}}</span>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-playlist"><img src="images/svgs/watchlist_add.svg" class="watchlistadd" alt="add watchlist button"></span>
                <span class="media-thumbs"><img src="images/svgs/thumb_up-24px.svg" class="watchlistadd" alt="add watchlist button"></span>
                
            </div>
        </div>

        <div class="row"> <!-- 2-up for nav and media info -->
            <!-- <nav class="col-12 col-sm-3 side-nav">
                <ul class="media-type">
                    <li v-for="media in mediaTypes" :data-type="media.description">
                        <span>
                            <i v-bind:class="[media.iconClass]"></i>
                        </span>
                        
                        <span class="d-none d-md-block">{{ media.description }}</span>
                    </li>
                </ul>
            </nav> -->

            <div class="col-12 media-info">
                <!-- genres for video -->
                <!-- <ul class="media-genres">
                    <li>
                        <a @click.prevent="filteredMovies('Family')" href="">Family</a>
                    </li>
                    <li>
                        <a @click.prevent="filteredMovies('Thriller')" href="">Thriller</a>
                    </li>
                    <li>
                        <a @click.prevent="filteredMovies('All')" href="">All</a>
                    </li>
                </ul> -->

                <!-- <ul>           
                <li @click="navToHome()"><p>Home</p></li>
                <li @click="navToSong()"><p>Music</p></li>		
			</ul> -->
              
                <!-- <div class="thumb-wrapper clearfix">
                    <img v-for="media in retrievedMedia" :src="'images/' + media.movies_cover" alt="media thumb" class="img-thumbnail rounded float-left media-thumb" @click="switchCurrentMedia(media)">
                </div> -->
                
                <div>
                    <h2 class="adultCat">Movies</h2>
                <vueper-slides
                class="no-shadow"
                :visible-slides="6"
                :slide-ratio="1 / 4"
                :gap="3"
                :dragging-distance="70">
                    <vueper-slide v-for="media in retrievedMedia" :key="media.id" :image='"images/" + media.movies_cover' class="img-thumbnail rounded float-left media-thumb" @click.native="switchCurrentMedia(media)" />
                </vueper-slides>
               </div>


               <div>
                    <h2 class="adultCat">Recently Added</h2>
                <vueper-slides
                class="no-shadow"
                :visible-slides="6"
                :slide-ratio="1 / 4"
                :gap="3"
                :dragging-distance="70">
                    <vueper-slide v-for="media in retrievedMedia" :key="media.id" :image='"images/" + media.movies_cover' class="img-thumbnail rounded float-left media-thumb" @click.native="switchCurrentMedia(media)" />
                </vueper-slides>
               </div>

               <div>
                    <h2 class="adultCat">Popular</h2>
                <vueper-slides
                class="no-shadow"
                :visible-slides="6"
                :slide-ratio="1 / 4"
                :gap="3"
                :dragging-distance="70">
                    <vueper-slide v-for="media in retrievedMedia" :key="media.id" :image='"images/" + media.movies_cover' class="img-thumbnail rounded float-left media-thumb" @click.native="switchCurrentMedia(media)" />
                </vueper-slides>
               </div>

                

              
			        <!-- <ul class="splide__list">
                        <li class="splide__slide"><video controls src="video/goonies.mp4"></video></li>
                        <li class="splide__slide"><video controls src="video/lion_king.mp4"></video></li>
                        <li class="splide__slide"><video controls src="video/jungle_book.mp4"></video></li>
                    </ul> -->
		             
</div>  
        </div> <!-- end 2-up for media info -->
    </div>
    `,
    components: {
        VueperSlides,
        VueperSlide
    },
    data() {
        return {
            // push first (or random) media object here (selected / filtered on create)
            currentMediaDetails: {},

            // could add more media types here in future
            mediaTypes: [
                { iconClass: "fas fa-headphones", description: "audio" },
                { iconClass: "fas fa-film", description: "video" },
                { iconClass: "fas fa-tv", description: "television" }
            ],

            retrievedMedia: [],
            filteredMovies: []
        }
    },

    created: function() {
     this.loadMedia(null, 'movies');
     this.$emit('setuser', this.currentuser)
    },

    methods: {
        loadMedia(filter, mediaType) {
        // fetch data here

        let url = (filter == null) ? `/api/${mediaType}` : `/api/${mediaType}/${filter}`;

        fetch(url) 
          .then(res => res.json())
          .then(data => {
            this.retrievedMedia = data;
            
            // pick a random media object from the array
            this.currentMediaDetails = data[Math.floor(Math.random() * data.length)];
        })
        .catch((err) => console.error(err));
        },


        switchCurrentMedia(media) {
            this.currentMediaDetails = media;
        },

        // filteredMovies(genre) {
        //  this.filteredMovies = movies.filter( movie => movie.movies_genre.includes(genre));
        //  debugger;
        // },

        navToHome() {

            this.$router.push({ name: "home"});
        },
    
        navToSong() {
    
            this.$router.push({ name: "songs"});
        }
    }
}