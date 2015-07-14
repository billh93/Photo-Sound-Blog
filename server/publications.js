Meteor.publish('images', function(limit) {
	check(limit, Number);

	return Images.find({}, {limit: limit});
});

Meteor.publish('sounds', function(limit) {
	check(limit, Number);

	return Sounds.find({}, {limit: limit});
});