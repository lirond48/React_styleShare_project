import React from 'react';
import { Post as PostType } from '../../services/postService';
import Comments from '../comments/Comments';
import './Post.css';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const userIdStr = String(post.user_id);
  const postIdStr = String(post.post_id);
  
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info">
          <div className="user-avatar">
            {userIdStr.charAt(0).toUpperCase()}
          </div>
          <span className="user-id">User {post.user_id}</span>
        </div>
        <span className="post-id">#{post.post_id}</span>
      </div>
      
      {post.url_image && (
        <div className="post-image-container">
          <img 
            src={post.url_image} 
            alt={post.description || 'Post image'} 
            className="post-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/500x400?text=Image+Not+Found';
            }}
          />
        </div>
      )}
      
      {post.description && (
        <div className="post-description">
          <p>{post.description}</p>
        </div>
      )}

      <Comments postId={postIdStr} />
    </div>
  );
};

export default Post;

