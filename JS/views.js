app.BlogView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'dblclick label' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close',
    'click .toggle' : 'toggleCompleted',
    'click .destroy': 'destroy'
  },
  edit: function(){
    this.$el.addClass('editing');
    this.input.focus();
  },
  close: function(){
    var value = this.input.val().trim();
    if(value) {
      this.model.save({title: value});
    }
    this.$el.removeClass('editing');
  },
  updateOnEnter: function(e){
    if(e.which == 13){
      this.close();
    }
  },
  toggleCompleted: function(){
    this.model.toggle();
  },
  destroy: function(){
    this.model.destroy();
  }
});

app.ListView = Backbone.View.extend({
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
    console.log('blog is created');
  },
  addAll: function(){
    this.$('#blog-list').html('');
    switch(window.filter){
      case 'pending':
        _.each(app.blogList.remaining(), this.addOne);
        break;
      case 'completed':
        _.each(app.blogList.completed(), this.addOne);
        break;
      default:
        app.todoList.each(this.addOne, this);
        break;
    }
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});


app.listView = new app.ListView();