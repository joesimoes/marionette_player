MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
	mainRegion: "#content"
	
});

TrackModel = Backbone.Model.extend({

});

Tracks = Backbone.Collection.extend({

	model: TrackModel,
	initialize: function(tracks){
				
	}
});

Track = Backbone.Marionette.ItemView.extend({
	template: '#playlist_template',
	tagName: 'tr',
	className: 'playlist',

	initialize: function(){
		this.model.on('change', this.render, this);

	},
	
	events: {
	  'click a.deleteTrack': 'deleteTrack',
	  'click img.playTrack': 'playTrack'
	
	},



	deleteTrack: function(){
		MyApp.trigger("track:deleteTrack", this.model);
		this.model.destroy();
	},

	
    playTrack: function(){ 
    	console.log('playing');
			
    }


}); 




AddTrack = Backbone.Marionette.ItemView.extend({

	el: '#addTrack',

	initialize:function() { 
	  
    },

    events: { 
    'submit': 'submit'
      
    },
    submit: function(e) {
    	e.preventDefault();
      	var newTrackTitle = $(e.currentTarget).find('input[type=text]').val();
      	var track = new TrackModel({ title: newTrackTitle });
      	this.collection.add(track);
      	
    }
});


TracksComposite = Backbone.Marionette.CompositeView.extend({
	tagName: "table",
	id: "playlists",
	className: "table-striped table-bordered",
	template: "#playlists_template",
	itemView: Track,
	initialize: function(){

		this.model = new TrackModel();

		var tracks = new Tracks();
		

		this.collection = tracks;

		this.collection.set([
			new TrackModel({name: 'Wish You Were Here'}),
			new TrackModel({name: 'Yellow Submarine'}),
			new TrackModel({name: 'Thriller'})
			]);
		var addTrack = new AddTrack({composite: TracksComposite});

		var tracksView = new Tracks({composite: TracksComposite});
		
	}


});

var tracksComposite = new TracksComposite({

	});



MyApp.addInitializer(function(options){
	

	MyApp.mainRegion.show(tracksComposite);
});

$(document).ready(function(){


	MyApp.start();
	
  
});

