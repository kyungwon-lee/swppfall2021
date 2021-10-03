import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ArticleListItem from '../components/ArticlesListItem';
import { userSignIn } from '../controllers/store/actions/user';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => await axios.get('/api/articles');
    fetchArticles().then((res) => setArticles(res.data));
  }, []);

  return (
    <div>
      Articles List
      {articles.map((a, i) => (
        <ArticleListItem
          id={a.id}
          title={a.title}
          author_id={a.author_id}
          key={i}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
