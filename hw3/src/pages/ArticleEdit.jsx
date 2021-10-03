import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import CommentsListItem from '../components/CommentsListItem';
import { userSignIn } from '../controllers/store/actions/user';

const ArticleEdit = ({ mode = 'edit' }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const history = useHistory();
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    const getArticle = async () => {
      const article = await axios.get(`/api/articles/${id}`);
      setArticle({ ...article.data });
    };
    if (mode !== 'create') getArticle();
  }, []);

  const [title, setTitle] = useState(article?.title);
  const [content, setContent] = useState(article?.content);
  const [currentTab, setCurrentTab] = useState('write');

  useEffect(() => {
    setTitle(article?.title);
    setContent(article?.content);
  }, [article?.title, article?.content]);

  const isAuthor =
    mode === 'create' ||
    article?.id == undefined ||
    currentUser?.id == article?.author_id;

  console.log(currentUser?.id, article?.author_id);

  const onConfirm = async () => {
    if (mode === 'create') {
      if (!title || !content) return;
      await axios.post('/api/articles', {
        author_id: currentUser?.id,
        title,
        content,
      });
      history.push(`/articles`);
    } else {
      await axios.put(`/api/articles/${id}`, { ...article, title, content });
      history.push(`/articles/${id}`);
    }
  };

  if (!isAuthor) return <Redirect to="/articles" />;

  return (
    <div>
      <button onClick={() => setCurrentTab('write')}>Write</button>
      <button onClick={() => setCurrentTab('preview')}>Preview</button>
      {currentTab === 'write' ? (
        <>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          Content
          <textarea
            value={content}
            rows={10}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </>
      ) : (
        <>
          <div>Author: {currentUser?.name}</div>
          <h1>Title: {title}</h1>
          <div>Content: {content}</div>
        </>
      )}

      <button
        onClick={() =>
          mode == 'create'
            ? history.push(`/articles`)
            : history.push(`/articles/${id}`)
        }
      >
        Back
      </button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default ArticleEdit;
