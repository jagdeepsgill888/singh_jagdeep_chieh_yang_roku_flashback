const { VueperSlides, VueperSlide } = vueperslides;

export default {
    name: "songs",

    props: ['currentuser'],
  
    template: `
    <div class="container">

    <div class="row">
            <div class="media-container">
            <audio autoplay controls :src="'audio/' + currentMediaDetails.songs_audio"></audio>
            </div>

            <div class="info-container">
                <h4 class="media-title">{{currentMediaDetails.songs_title}}</h4>
                <span class="media-year">{{currentMediaDetails.songs_year}}</span>
                <span class="media-time">{{currentMediaDetails.songs_artist}}</span>
                <br>
                <br>
                <span class="media-year">{{currentMediaDetails.songs_description}}</span>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-playlist"><img src="images/svgs/watchlist_add.svg" class="watchlistadd" alt="add watchlist button"></span>
                <span class="media-thumbs"><img src="images/svgs/thumb_up-24px.svg" class="watchlistadd" alt="add watchlist button"></span>
                
            </div>
        </div>
                <div>
                    <h2 class="adultCat">All Songs</h2>
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
                    <h2 class="adultCat">Popular</h2>
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