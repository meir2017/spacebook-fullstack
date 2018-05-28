import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();
eventsHandler.pageOnLode();

// debugger
// $.ajax({
//     method:"GET",
//     url:"/posts",
//   }).then(function(response) {
//       debugger
//     //console.log(response);
//     PostsRepository.AddPost('asdasdasdasdasasdas')
//   }).catch(function(error) {
//       console.log(error);
//   });