export default {
    name: "TheLoginComponent",
    
    template: `
        <div class="container">
            <div class="loginPanel">
                <h1 class="display-4 Loginheading">Welcome to Flashback!</h1>
                <p class="lead">Please Login Below</p>
                <img  class="loginIcon"src="images/svgs/person_outline-24px.svg" alt="">
                <hr class="my-4">
                <form>
                    <div class="form-row align-items-center">
                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormInputName">Name</label>
                            <input v-model="input.username" type="text" class="form-design" id="inlineFormInputName" placeholder="username" required>
                        </div>

                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormPassword">Name</label>
                            <input v-model="input.password" type="password" class="form-design" id="inlineFormPassword" placeholder="password" required>
                        </div>

                        <div class="col-auto my-1">
                            <button v-on:click.prevent="login()" type="submit" class="btn btnLogin">Login!</button>
                        </div>
                    </div>
                </form>            
            </div>
        </div>
     `,
 
     data() {
         return {
             input: {
                 username: "",
                 password: ""
             },

         }
     },
 
     methods: {
         login() {
         // lets check for valid input
         if (this.input.username !="" && this.input.password !="") {
             // do our login
             let loginData = JSON.stringify({username: this.input.username, passoword: this.input.password});

             let url = `/ums/admin/login`;
             fetch(url, {
                 method: 'POST',
                 body: loginData,
                 headers: {
                     'Accept': 'application/json, text/plain, */*',
                     'Content-type': 'application/json'
                 }

             })
             .then(res => res.json())
             .then(data => {
                 if (data.message) {
                 console.warn("user doesn't exist, or something else broke");
                } else {
                    data.user_name = this.input.username;
                    this.$router.replace({ name: "users"});
                }
             })
             .catch((err) => console.error(err));
         } else {
             console.log("A username and password needs to be input");
         }
         }            
    }
 }