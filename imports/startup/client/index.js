// IMPORTING ROUTES FOR EXPORT TO client/main.js
import './routes.js';
import { Posts } from '../../api/posts/posts.js';
window.Posts = Posts;
import { Teams } from '../../api/teams/teams.js';
