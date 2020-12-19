(()=> {
	// stub - your code goes here 
		let vue_vm = new Vue({
			// link Vue to an element in our HTML
			// el: "#app",
	
			data: {
				message: "Hello from Vue!",
				anotherMessage: "more text, so simple! much winning",
				showLight: false,
			},
	
			// this is the "mounted" lifecycle hook. Vue is done creating itself, and has attached itself to the "app" div on the page
			mounted: function () {
				console.log("Vue is mounted!");
				// alert("Hey there! your vue instance is ready");
				 this.getData()
				// alert("you added Jarrod!")
			},
	
			// run a method when we change our view (update the DOM with Vue)
			updated: function () {
				console.log('Vue just updated the DOM');
			},
	
			methods: {
				getData () { // get all data
					this.list.forEach((element, index) => {
						fetchData(`./includes/index.php?id=${index+1}`).then(data => {
						   
							 if(data.code){
								 alert(data.msg);
							}else{
								this.initHtml(data[0]);
							} }).catch(err => {
								console.log(err);  alert(err); 
							}); //request data index.php
	
					});
				},
				initHtml (data) {
					this.carList.push(data);
					this.show = 0;
				},
				clickImg (index) {
					this.show = index;
	
					this.showLight = true;
				},
				changeVideo (index) {
					const videoTag = document.querySelector('.movie-box>video')
					if (index == 1) {
						videoTag.setAttribute('src', "video/header.mp4");
					} else {
						videoTag.setAttribute('src', "video/top-header-en.mp4");
					}
					for (let item in this.list) {
						document.querySelectorAll('.movie-box>ul>li')[item].classList.remove('show-lightbox');
					}
					document.querySelectorAll('.movie-box>ul>li')[index].classList.toggle('show-lightbox');
				},
			},
		}).$mount("#app"); // also connects Vue to your wrapper in HTML
	})();

