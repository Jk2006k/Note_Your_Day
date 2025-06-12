import React, { useState, useEffect } from 'react';
import './Note.css'
import { useNavigate, useParams } from 'react-router-dom';

export default function Note() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(!id); 

  useEffect(() => {
    if (id) {
      fetch(`https://note-your-day.onrender.com/api/note/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTitle(data.note.title);
            setMessage(data.note.message);
            setIsEditing(false);
          }
        });
    }
  }, [id]);

  const handleSave = async () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      alert('You must Login Before You save');
      navigate('/login');
      return;
    }
    if (id) {
      await fetch(`https://note-your-day.onrender.com/api/note/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });
    } else {
      // Create new note
      await fetch('https://note-your-day.onrender.com/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, userName }),
      });
    }
    navigate('/');
  };

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this note?')) {
      await fetch(`https://note-your-day.onrender.com/api/note/${id}`, { method: 'DELETE' });
      navigate('/');
    }
  };

  const handleShare = () => {
    if (id) {
      const shareUrl = `${window.location.origin}/note/${id}`;
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert('Note link copied to clipboard!');
        })
        .catch(() => {
          alert('Failed to copy link.');
        });
    }
  };

  return (
    <div className="note-container">
      <h1>Note Your Day</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        disabled={!isEditing}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        disabled={!isEditing}
        onChange={e => setMessage(e.target.value)}
      />
      <div>
        {id && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleShare} style={{ marginLeft: '10px', color: 'blue' }}>
              Share
            </button>
          </>
        )}
        {isEditing && (
          <button onClick={handleSave}>Save</button>
        )}
        {id && (
          <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
