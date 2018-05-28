

  var tempRepository;
  var tempRendere;

class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
         tempRepository=postsRepository;
         tempRendere=postsRenderer;
    }

    pageOnLode(){
            $.ajax({
                method:"GET",
                url:"/posts",
            }).then(function(response) {
                tempRepository.addPostDb(response);
                tempRendere.renderPosts(tempRepository.posts);
            }).catch(function(error) {
                console.log(error);
            });   
    }
    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            let myPOST = $("#postText").val();
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else { 
                $.ajax({
                    method:"POST",
                    url:"/addPost",
                    data: {thePost:$("#postText").val()}
                }).then(function(response) {
                    tempRepository.addPost(myPOST,response);
                    tempRendere.renderPosts(tempRepository.posts)
                }).catch(function(error) {
                    console.log(error);
                });
                $input.val("");
            }
            });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();;
            $.ajax({
                method:"POST",
                url:"/deletePost",
                data: {idPost:tempRepository.posts[index]._id}
            }).then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
            this.postsRepository.removePost(index);
            this.postsRenderer.renderPosts(this.postsRepository.posts);
          });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
          
            let postIndex = $(event.currentTarget).closest('.post').index();
            let newComment = { text: $comment.val(), user: $user.val() };
            $.ajax({
                method:"POST",
                url:"/AddComment",
                data: {idPost:tempRepository.posts[postIndex]._id,
                       commentText:newComment.text,
                       userName:newComment.user
                }
            }).then(function(response) {
                tempRepository.addComment(newComment, postIndex);
                tempRendere.renderComments(tempRepository.posts, postIndex);
            }).catch(function(error) {
                console.log(error);
            });
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            $.ajax({
                method:"POST",
                url:"/RemoveComment",
                data: {idPost:tempRepository.posts[postIndex]._id,
                      index:commentIndex
                }
            }).then(function(response) {
                tempRepository.deleteComment(postIndex, commentIndex);
                tempRendere.renderComments(tempRepository.posts, postIndex);
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
        });
    }
}

export default EventsHandler