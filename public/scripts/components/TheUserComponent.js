export default {
    name: "TheUserComponent",

    props: ['liveuser'],

    template: `
   <section>
   <div class="col-xs-12 col-sm-6 col-md-4 mx-auto">
        <div @click="navToHome()">
            <div class="userNameText">
                <img :src="'images/' + liveuser.user_avatar" class="rounded-circle ">
                <p>{{ liveuser.user_name }}</p>
            </div>
        </div>
    </div>
    </section>`,

    created: function() {
        // check if there's an avatar. if not set it to a tem one
        // this.liveuser.user_avatar = (this.liveuser.user_avatar) ? this.liveuser.user_avatar : "temp_avatar.jpg";
        if (this.liveuser.user_avatar == null) {
            this.liveuser.user_avatar = "temp_avatar.jpg"
        }
    },

    methods: {
        navToHome() {
            // this should save the user to localStorge so that if they exist, they dont need to log in again
            window.localStorage.setItem('cacheduser', JSON.stringify(this.liveuser));

            // nav to home page
            this.$router.push({ name: "home", params: { currentuser: this.liveuser }})}
    }
}