Template.post_admin.helpers({
  showApprove: function () {
    return this.status === Posts.config.STATUS_PENDING;
  },
  showUnapprove: function(){
    return !!Settings.get('requirePostsApproval') && this.status === Posts.config.STATUS_APPROVED;
  },
  shortScore: function(){
    return Math.floor(this.score*100)/100;
  }
});

Template.post_admin.events({
  'click .approve-link': function(e){
    Meteor.call('approvePost', this._id);
    e.preventDefault();
  },
  'click .unapprove-link': function(e){
    Meteor.call('unapprovePost', this._id);
    e.preventDefault();
  },
  'click .delete-link': function(e){
    var post = this;

    e.preventDefault();

    if(confirm("Delete “"+post.title+"”?")){
      Meteor.call("deletePostById", post._id, function(error) {
        if (error) {
          console.log(error);
          Messages.flash(error.reason, 'error');
        } else {
          Messages.flash(i18n.t('your_post_has_been_deleted'), 'success');
        }
      });
    }
  }
});