import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    saveChanges: function() {
      if(this.get('model.title').trim().length) {
        this.model.save();
        this.set('isEditing', false);
      } else {
        this.send('removeTodo');
      }
    },
    removeTodo: function() {
      this.model.destroyRecord();
      this.set('isEditing', false);
      this.send('back');
    },
    back: function() {
      //this.transitionTo('todos.index');
      window.history.back();
    },
    increase: function() {
      var size = parseInt(Ember.$('textarea.details').css("font-size"));
      Ember.$('textarea.details').css("font-size", size + 2 + "px");
    },
    decrease: function() {
      var size = parseInt(Ember.$('textarea.details').css("font-size"));
      Ember.$('textarea.details').css("font-size", size - 2 + "px");
    }
  },

  isEditing: false,

  isCompleted: function(key, value) {
    if(arguments.length > 1) {
      this.set('model.isCompleted', value);
      this.model.save();
    }
    return this.get('model.isCompleted');
  }.property('model.isCompleted')
});
