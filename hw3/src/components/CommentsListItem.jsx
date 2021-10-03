import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { userSignIn } from '../controllers/store/actions/user';

const CommentsListItem = ({ comment, setFetchAgain }) => {
  const { id, author_id, content } = comment;
  const { currentUser } = useSelector((store) => store.user);
  const [authorName, setAuthorName] = useState('');

  const isAuthor = currentUser?.id === author_id;

  useEffect(() => {
    const getAuthor = async () => await axios.get(`/api/user/${author_id}`);
    getAuthor().then((res) => setAuthorName(res.data.name));
  });

  const onDelete = async () => {
    await axios.delete(`/api/comments/${id}`);
    setFetchAgain(true);
  };

  const onEdit = async () => {
    const edittedComment = prompt('Edit your comment.', content);
    await axios.put(`/api/comments/${id}`, {
      ...comment,
      content: edittedComment,
    });
    setFetchAgain(true);
  };

  return (
    <div>
      <div>--------------------------</div>
      <div>{authorName}</div>
      <div>{content}</div>
      {isAuthor && (
        <div>
          <button onClick={onEdit}>Edit Comment</button>
          <button onClick={onDelete}>Delete Comment</button>
        </div>
      )}
      <div>--------------------------</div>
    </div>
  );
};

export default CommentsListItem;
