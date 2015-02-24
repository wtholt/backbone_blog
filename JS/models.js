var app = {};

app.Blog = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

app.BlogList = Backbone.Collection.extend({
  model: app.Blog,
  localStorage: new Store("backbone-blog")
});

app.blogList = new app.BlogList();