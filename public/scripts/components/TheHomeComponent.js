const { VueperSlides, VueperSlide } = vueperslides;

export default {
    name: "TheHomeComponent",

    props: ['currentuser'],

    template: `
    <div class="container">
        <div class="row">
            <div class="col-12 order-2 order-md-1 col-md-3 media-container">
                <h4 class="media-title">{{currentMediaDetails.movies_title}}</h4>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-time">{{currentMediaDetails.movies_runtime}}</span>
                <span class="media-year">Released in {{currentMediaDetails.movies_year}}</span>
            </div>

            <div class="col-12 order-1 order-md-2 col-md-9 media-container">
                <video autoplay controls muted :src="'video/' + currentMediaDetails.movies_trailer" class="fs-video"></video>
            </div>
        </div>

        <div class="row"> <!-- 2-up for nav and media info -->
            <nav class="col-12 col-sm-3 side-nav">
                <ul class="media-type">
                    <li v-for="media in mediaTypes" :data-type="media.description">
                        <span>
                            <i v-bind:class="[media.iconClass]"></i>
                        </span>
                        
                        <span class="d-none d-md-block">{{ media.description }}</span>
                    </li>
                </ul>
            </nav>

            <div class="col-12 col-sm-9 media-info">
                <!-- genres for video -->
                <ul class="media-genres">
                    <li>
                         <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="#/songs">Songs</a>
                    </li>
                    <li>
                        <a href="family">Family</a>
                    </li>
                    <li>
                        <a href="fantasyr">Fantasy</a>
                    </li>
                    <li>
                        <a href="all">All</a>
                    </li>
                </ul>

                <ul>           
                <li @click="navToHome()"><p>Home</p></li>
                <li @click="navToSong()"><p>Music</p></li>		
			</ul>
              
                <div class="thumb-wrapper clearfix">
                    <img v-for="media in retrievedMedia" :src="'images/' + media.movies_cover" alt="media thumb" class="img-thumbnail rounded float-left media-thumb" @click="switchCurrentMedia(media)">
                </div>
                
                <div>
                    <h2>All Movies</h2>
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
                    <h2>Recently Added</h2>
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
                    <h2>Popular</h2>
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

        navToHome() {

            this.$router.push({ name: "home"});
        },
    
        navToSong() {
    
            this.$router.push({ name: "songs"});
        }
    }
}