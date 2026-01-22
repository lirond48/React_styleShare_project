// Comment service for API calls
const API_BASE_URL = 'http://localhost:3000';

export interface Comment {
  comment_id: number;
  post_id: string | number;
  user_id: number;
  comment: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}

// Mock data for comments
const MOCK_COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      comment_id: 1,
      post_id: 1,
      user_id: 456,
      comment: "Amazing sunset! 😍",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      comment_id: 2,
      post_id: 1,
      user_id: 789,
      comment: "Where was this taken?",
      created_at: "2024-01-15T11:00:00Z"
    }
  ],
  "2": [
    {
      comment_id: 3,
      post_id: 2,
      user_id: 123,
      comment: "Coffee is life! ☕",
      created_at: "2024-01-15T09:15:00Z"
    }
  ],
  "3": [
    {
      comment_id: 4,
      post_id: 3,
      user_id: 123,
      comment: "Beautiful view!",
      created_at: "2024-01-15T12:00:00Z"
    },
    {
      comment_id: 5,
      post_id: 3,
      user_id: 321,
      comment: "I need to go there!",
      created_at: "2024-01-15T12:30:00Z"
    }
  ]
};

class CommentService {
  async getComments(postId: string | number): Promise<Comment[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data for the post
    // return MOCK_COMMENTS[String(postId)] || [];
    
    // API call
    try {
      const response = await fetch(`${API_BASE_URL}/comment?post_id=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch comments' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: Comment[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching comments');
    }
  }

  async addComment(postId: string | number, comment: string, userId: number): Promise<Comment> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newComment: Comment = {
      comment_id: Date.now(),
      post_id: postId,
      user_id: userId,
      comment: comment,
      created_at: new Date().toISOString()
    };
    
    // Add to mock data
    const postIdStr = String(postId);
    if (!MOCK_COMMENTS[postIdStr]) {
      MOCK_COMMENTS[postIdStr] = [];
    }
    MOCK_COMMENTS[postIdStr].push(newComment);
    
    return newComment;
    
    // API call
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId, comment, user_id: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to add comment' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: Comment = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while adding comment');
    }
    */
  }
}

export const commentService = new CommentService();

