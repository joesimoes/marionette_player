

MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
	mainRegion: "#content"
	
});

Playlist = Backbone.Model.extend({

});

Tracks = Backbone.Collection.extend({

	model: Playlist,
	initialize: function(tracks){
				
	}
});

Track = Backbone.Marionette.ItemView.extend({
	template: '#playlist_template',
	tagName: 'tr',
	className: 'playlist',
	
	events: {
	  'click a.deleteTrack': 'deleteTrack',
	  'click img.playTrack': 'playTrack'
	},

	initialize: function(){

	},

	deleteTrack: function(){
		MyApp.trigger("track:deleteTrack", this.model);
		this.model.destroy();
	},

	
    playTrack: function(){ 
    	
    	   soundManager.url = 'swf'; 
   		   soundManager.flashVersion = 8;  
           soundManager.onready(function() { 
             
           }); 

          soundManager.createSound({
			id: 'mySound',
		    url: 'mp3/test.mp3',
		    autoLoad: true,
			autoPlay: true
		  });
  		  
	
           console.log('hi');
    }

}); 



TracksComposite = Backbone.Marionette.CompositeView.extend({
	tagName: "table",
	id: "playlists",
	className: "table-striped table-bordered",
	template: "#playlists_template",
	itemView: Track,
	initialize: function(){

		this.model = new Playlist();

		var tracks = new Tracks();
		alert('tracks composite initialized');

		this.collection = tracks;

		this.collection.set([
			new Playlist({name: 'Wish You Were Here'}),
			new Playlist({name: 'Yellow Submarine'}),
			new Playlist({name: 'Thriller'})
			]);

	}


});

MyApp.addInitializer(function(options){
	var tracksComposite = new TracksComposite({

	});

	MyApp.mainRegion.show(tracksComposite);
});

$(document).ready(function(){


	MyApp.start();

   alert("Document Ready"); 

	
});