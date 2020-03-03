/* 1. Search */ 

var UI = {};

UI.enterPress = function() {

	document.querySelector(".js-submit").addEventListener('click', function() {
	
	var userInput = document.querySelector('.js-search').value;
	//alert(userInput);
	//This is passing the value into the soundCloudAPI.getTrack() function
	SoundCloudAPI.getTrack(userInput);

	});	
}

UI.enterClick = function() {
	document.querySelector('.js-search').addEventListener('keyup', function(e) {

	if(e.which === 13) {
		var userInput = document.querySelector('.js-search').value;
		//alert(userInput);
		SoundCloudAPI.getTrack(userInput);
		
		}

	});

}

UI.enterClick();
UI.enterPress();


/* 2. Query Soundcloud API */

var SoundCloudAPI = {};

SoundCloudAPI.init = function() {

	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});

}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {

	// find all sounds of buskers licensed under 'creative commons share alike' 
	SC.get('/tracks', {
	  q: inputValue
	  //then is a "promise"
	}).then(function(tracks) {
	  console.log(tracks);


	var searchResults = document.querySelector('.js-search-results');
		searchResults.innerHTML = "";


	  SoundCloudAPI.renderTracks(tracks);
	});

}

/* 3. Display the cards */

SoundCloudAPI.renderTracks = function(tracks) {

	tracks.forEach(function(track){

		// CREATE CARD: We are creating a new div and assigning it a class of "card" 
		var card = document.createElement('div');
		card.classList.add('card')

		//CREATE IMAGE: 
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || "http://lorempixel.com/100/100";

		//Adding the image into the imageDiv div. We put this in the "card" div below. 
		imageDiv.appendChild(image_img);


		//CREATE CONTENT
		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>'; 


		//CREATE BUTTON
		var button = document.createElement('div');
		button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add your shizzle here';

		//APPEND CHILD

		//We are targeting the .js-search-results div and then adding the new div "card" into the div ".js-search-results"
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){			
			SoundCloudAPI.getEmbed(track.permalink_url);
		})

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);

		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);

		});

}

/* 4. Add a card to the playlist and play */

SoundCloudAPI.getEmbed = function(trackURL) {

	SC.oEmbed(trackURL, {
	auto_play: true
	}).then(function(embed){
	console.log('oEmbed response: ', embed);

	var sidebar = document.querySelector('.js-playlist');

	var box = document.createElement('div');
	box.classList.add('.inner')
	box.innerHTML = embed.html;

	sidebar.insertBefore(box, sidebar.firstChild);
	localStorage.setItem('key', sidebar.innerHTML)

});

}

//This will store the playlist locally
var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem('key')
	

//This will clear or reset the local data and refresh the page
document.querySelector('.js-reset').addEventListener('click',function(){

	localStorage.clear();
	location.reload(); 	

	//This method removes HTML elements to achieve the same outcome
	/*localStorage.clear();
	var parent = document.querySelector('.js-playlist');
	var child = document.querySelector('.inner');
	parent.removeChild(child);*/
	
})





