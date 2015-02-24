app.BlogView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

app.BlogView = Backbone.View.extend({
  el: '#blogapp',
  initialize: function () {
    this.input = this.$('#new-blog');
    app.blogList.on('add', this.addOne, this);
    app.blogList.on('reset', this.addAll, this);
    app.blogList.fetch();
  },
  events: {
    'keypress #new-blog': 'createBlogOnEnter'
  },
  createBlogOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) {
      return;
    }
    app.blogList.create(this.newAttributes());
    this.input.val('');
  },
  addOne: function(blog){
    var view = new app.BlogView({model: blog});
    $('#blog-list').append(view.render().el);
  },
  addAll: function(){
    this.$('#blog-list').html('');
    app.blogList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});


app.BlogView = new app.BlogView();