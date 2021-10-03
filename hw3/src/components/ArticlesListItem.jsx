import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { userSignIn } from '../controllers/store/actions/user';

const ArticleListItem = ({ id, title, author_id }) => {
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const getAuthor = async () => await axios.get(`/api/user/${author_id}`);
    getAuthor().then((res) => setAuthorName(res.data.name));
  });

  return (
    <div>
      {id}
      <button>
        <Link to={`/articles/${id}`}>{title}</Link>
      </button>
      {authorName}
    </div>
  );
};

export default ArticleListItem;
