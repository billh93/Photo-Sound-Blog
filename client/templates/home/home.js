Template.home.created = function() {
	var self = this;

	self.limit = new ReactiveVar;
	self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

	Deps.autorun(function() {
		Meteor.subscribe('images', self.limit.get());
		Meteor.subscribe('sounds', self.limit.get());
	});
};

Template.home.rendered = function() {
	var self = this;
	// Triggered every time we scroll
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			incrementLimit(self);
		}
	});
};

Template.home.helpers({
	'images': function() {
		return Images.find();
	},
	'sounds': function() {
		return Sounds.find();
	}
});

var incrementLimit = function(templateInstance) {
	var newLimit = templateInstance.limit.get() +
		parseInt(Meteor.settings.public.recordsPerPage);
	templateInstance.limit.set(newLimit);
};