const { VueperSlides, VueperSlide } = vueperslides;

export default {
    name: "songs",

    props: ['currentuser'],
  
    template: `
    <div class="container">

    <div class="col-12 media-info">
                <!-- genres for video -->
                <ul class="media-genres">
                    <li>
                         <a href="/">Home</a>
                    </li>
                    <li>
                         <a href="/">Movies</a>
                    </li>
                    <li>
                        <a href="#/songs">Songs</a>
                    </li>

                    <!-- <li>
                        <a href="#/shows">TV Shows</a>
                    </li> -->
                </ul>
            </div>

        <div class="row">
            <div class="col-12 order-2 order-md-1 col-md-3 media-container">
                <h4 class="media-title">{{currentMediaDetails.songs_title}}</h4>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-time">{{currentMediaDetails.songs_artist}}</span>
                <span class="media-year">Released in {{currentMediaDetails.songs_year}}</span>
                <br>
                <br>
                <span class="media-year">{{currentMediaDetails.songs_description}}</span>
            </div>

            <div class="col-12 order-1 order-md-2 col-md-9 media-container">
            <audio autoplay controls :src="'audio/' + currentMediaDetails.songs_audio" class=""></audio>
            </div>
        </div>

        <div class="row"> <!-- 2-up for nav and media info -->
            
            <div class="col-12 media-info">
                <!-- genres for video -->
                <ul class="media-genres">
                    <li>
                        <a @click.prevent="filteredMovies('1990')" href="">1990</a>
                    </li>
                    <li>
                        <a @click.prevent="filteredMovies('1980')" href="">1980</a>
                    </li>
                    <li>
                        <a @click.prevent="filteredMovies('1970')" href="">1970</a>
                    </li>

                    <li>
                        <a @click.prevent="filteredMovies('1960')" href="">1960</a>
                    </li>
                </ul>
              

                 <!-- testing -->
                <!-- <ul>           
                <li @click="navToHome()"><p>Home</p></li>
                <li @click="navToSong()"><p>Music</p></li>		
			</ul> -->
                <div class="thumb-wrapper clearfix">
                    <img v-for="media in retrievedMedia" :src="'images/' + media.songs_cover" alt="media thumb" class="img-thumbnail rounded float-left media-thumb" @click="switchCurrentMedia(media)">
                </div>

                <div>
                    <h2>All Songs</h2>
                <vueper-slides
                class="no-shadow"
                :visible-slides="6"
                :slide-ratio="1 / 4"
                :gap="3"
                :dragging-distance="70">
                    <vueper-slide v-for="media in retrievedMedia" :key="media.id" :image='"images/" + media.songs_cover' class="img-thumbnail rounded float-left media-thumb" @click.native="switchCurrentMedia(media)" />
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
                    <vueper-slide v-for="media in retrievedMedia" :key="media.id" :image='"images/" + media.songs_cover' class="img-thumbnail rounded float-left media-thumb" @click.native="switchCurrentMedia(media)" />
                </vueper-slides>
               </div>


              
			       
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
                { iconClass: "fas fa-headphones", description: "audio"  },
                { iconClass: "fas fa-film", description: "video" },
                { iconClass: "fas fa-tv", description: "television" }
            ],

            retrievedMedia: [],
        }
    },

    created: function() {
     this.loadMedia(null, 'songs');
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