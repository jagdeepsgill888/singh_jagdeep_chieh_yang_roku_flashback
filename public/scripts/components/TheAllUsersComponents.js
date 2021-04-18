import TheUserComponent from './TheUserComponent.js';
export default {
    name: "TheAllUsersComponent",

	template: `
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h1 class="user-message">{{ message }}</h1>
			</div>

			<user v-for="(user, index) in userList" :liveuser="user" :key="index"></user>
		</div>
		<div class="addUser"><img src="images/add_user.jpg" class="watchlistadd" alt="add  user"></div>	
		<div class="editUser"><img src="images/svgs/user_settings.svg" class="watchlistadd" alt="edit user"><p class="userNameText2">Edit User</p></div>	
	</div>
	`,

	created: function() {
        // get all users fron DB
        fetch(`/ums/admin/getusers`)
        .then(res => res.json())
        .then(data => this.userList = data)
       .catch((err) => console.error(err));
    },

	data() {
	  return (
          {	message: `Welcome to Flashback`, userList: [] }
      )
	},

	components: {
		user: TheUserComponent
	}
}