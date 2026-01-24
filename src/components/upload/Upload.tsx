import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './Upload.css';

const Upload: React.FC = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call the API here:
      // await postService.createPost({ description, url: imageUrl, user_id: user?.username });
      
      console.log('Post created:', { description, url: imageUrl });
      
      // Navigate back to feed after successful upload
      navigate('/feed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload post';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/feed');
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <h2>Create New Post</h2>
          <p>Share a photo and write a description</p>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
              required
              className="form-input"
            />
            <small className="form-hint">Enter a valid image URL</small>
          </div>

          {imageUrl && (
            <div className="image-preview">
              <img 
                src={imageUrl} 
                alt="Preview" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's on your mind?"
              disabled={isSubmitting}
              required
              rows={4}
              className="form-textarea"
              maxLength={500}
            />
            <small className="form-hint">{description.length}/500 characters</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !description.trim() || !imageUrl.trim()}
              className="btn-submit"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;

