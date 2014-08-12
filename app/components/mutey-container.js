export default Ember.Component.extend({
  activeIndex: 0,
  pushViews: function() {
    var childViews = this.get('aContainer');
    var letters = this.get('letterObjects');
    letters.forEach(function(letter) {
      var childView = Em.View.extend({
        template: Ember.Handlebars.compile("{{unbound view.letter.letter}}"),
        classNameBindings: ['active'],
        active: function() {
          return this.get('letter.active');
        }.property('letter.active'),
        letter: letter,
        didInsertElement: function() {
          console.log('inserting element for letter', letter.letter);
        },
        willDestroyElement: function() {
          console.log('destruction of element for letter', letter.letter);
        }
      });
      childViews.pushObject(childView.create());
    });
    letters.get('firstObject').set('active', true);
  }.on('init'),

  letters: "A B C D E F G H I J K L M N O P".w(),

  letterObjects: function () {
    var letterObjects = [];

    this.get('letters').forEach(function(letter) {
      var letterObject = Em.Object.create({
        letter: letter,
        active: false
      });

      letterObjects.pushObject(letterObject);
    });

    return letterObjects;
  }.property(),

  aContainer: Em.ContainerView.create({
    classNames: ['the-container']
  }),

  actions: {
    rearrangeViews: function() {
      var childViews = this.get('aContainer');
      childViews.unshiftObject(childViews.popObject());
    },
    makeAnotherActive: function() {
      var letters = this.get('letterObjects');
      var activeIndex = this.get('activeIndex');
      var newActiveIndex = (activeIndex + 1) % letters.get('length');
      letters.objectAt(activeIndex).set('active', false);
      letters.objectAt(newActiveIndex).set('active', true);
      this.set('activeIndex', newActiveIndex);
    }
  },
});
