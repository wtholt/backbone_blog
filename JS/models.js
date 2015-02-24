var app = {};

app.Blog = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

app.BlogList = Backbone.Collection.extend({
  model: app.Blog,
  localStorage: new Store("backbone-blog"),
  completed: function(){
    return this.filter(function( blog ){
      return blog.get('completed');
    });
  },
  remaining: function() {
    return this.without.apply( this, this.completed() );
  }
});

app.blogList = new app.BlogList();