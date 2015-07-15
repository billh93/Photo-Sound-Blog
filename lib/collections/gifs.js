Schemas = {};

Gifs = new Meteor.Collection('gifs');

Schemas.Gifs = new SimpleSchema({
	picture: {
		type: String,
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'images',
				label: 'Image File'
			}
		}
	},
	sound: {
		type: String,
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'sounds',
				label: 'Sound File'
			}
		}
	}
});

Gifs.attachSchema(Schemas.Gifs);

// Allow rules
Gifs.allow({
	insert: function() { return true; },
	update: function() { return true; }
});