

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
	  'click a.playTrack': 'playTrack'
	},

	initialize: function(){

	},

	deleteTrack: function(){
		MyApp.trigger("track:deleteTrack", this.model);
		this.model.destroy();
	},

	//start playTrack
	playTrack: function(){
		soundManager.createSound({
			id: 'mySound',
			url:'/Downloads/soundmanagerv297a-20130512/demo/_mp3/walking.mp3'
		});
		soundManager.play('mySound');

	}
	// end playTrack
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

});