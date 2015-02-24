app.Router = Backbone.Router.extend({
  routes: {
    '*filter' : 'setFilter'
  },
  setFilter: function(params) {
    console.log('app.router.params = + params');
    window.filter = params.trim() || '';
    app.blogList.trigger('reset');
  }
});
app.router = new app.Router();
Backbone.history.start();