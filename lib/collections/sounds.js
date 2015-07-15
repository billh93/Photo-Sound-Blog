if (Meteor.isServer) {
	// Creates a folder in Mixgif called 'sounds' in amazon s3
	var soundStore = new FS.Store.S3("sounds", {
		/* REQUIRED */
		accessKeyId: Meteor.settings.private.AWSAccessKeyId,
		secretAccessKey: Meteor.settings.private.AWSSecretAccessKey,
		bucket: Meteor.settings.private.AWSBucket
	});

	Sounds = new FS.Collection("sounds", {
		stores: [soundStore],
		filter: {
			allow: {
				contentTypes: ['audio/*']
			}
		}
	});
}
// On the client just create a generic FS Store as don't have access (or want access) to S3 settings on client
if (Meteor.isClient) {
	var soundStore = new FS.Store.S3("sounds");
	Sounds = new FS.Collection("sounds", {
		stores: [soundStore],
		filter: {
			allow: {
				contentTypes: ['audio/*']
			},
			onInvalid: function(message) {
				toastr.error(message);
			}
		}
	});
}

// Allow rules
Sounds.allow({
	insert: function() { return true; },
	update: function() { return true; },
	download: function() { return true; }
});