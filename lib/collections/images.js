if (Meteor.isServer) {
	var resizeImg = function(fileObj, readStream, writeStream) {
		// Transform the image into a 10x10px thumbnail
		gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream);
	};

	// Creates a folder in Mixgif called 'images'
	var imageStore = new FS.Store.S3("images", {
		/* REQUIRED */
		accessKeyId: Meteor.settings.private.AWSAccessKeyId,
		secretAccessKey: Meteor.settings.private.AWSSecretAccessKey,
		bucket: Meteor.settings.private.AWSBucket,
		transformWrite: resizeImg
	});

	Images = new FS.Collection("images", {
		stores: [imageStore],
		filter: {
			allow: {
				contentTypes: ['image/*']
			}
		}
	});
}

// On the client just create a generic FS Store as don't have
// access (or want access) to S3 settings on client
if (Meteor.isClient) {
	var imageStore = new FS.Store.S3("images");
	Images = new FS.Collection("images", {
		stores: [imageStore],
		filter: {
			allow: {
				contentTypes: ['image/*']
			},
			onInvalid: function(message) {
				toastr.error(message);
			}
		}
	});
}

// Allow rules
Images.allow({
	insert: function() { return true; },
	update: function() { return true; },
	download: function() { return true; }
});