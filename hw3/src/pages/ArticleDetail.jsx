import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import CommentsListItem from '../components/CommentsListItem';
import { userSignIn } from '../controllers/store/actions/user';

const ArticleDetail = () => {
  const { currentUser } = useSelector((store) => store.user);
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(true);
  const history = useHistory();

  const isAuthor = currentUser?.id === article?.author_id;

  useEffect(() => {
    const getArticle = async () => {
      const article = await axios.get(`/api/articles/${id}`);
      const author = await axios.get(`/api/user/${article.data.author_id}`);
      setArticle({ ...article.data, authorName: author.data.name });
    };

    const getComments = async () => {
      const comments = await axios.get('/api/comments');
      setComments(comments.data.filter((c) => c.article_id === parseInt(id)));
    };
    console.log(comments);

    if (fetchAgain) {
      getArticle();
      getComments();
      setFetchAgain(false);
    }
  }, [fetchAgain]);

  const onConfirm = async (content) => {
    await axios.post('/api/comments', {
      author_id: currentUser?.id,
      content,
      article_id: parseInt(id),
    });

    console.log('c', await axios.get('/api/comments'));

    setFetchAgain(true);
  };

  const onDelete = async () => {
    await axios.delete(`/api/articles/${id}`);
    history.push('/articles');
  };

  return (
    <div>
      <div>Author: {article?.authorName}</div>
      <h1>Title: {article?.title}</h1>
      <div>Content: {article?.content}</div>
      {isAuthor && (
        <div>
          <button onClick={() => history.push(`/articles/${id}/edit`)}>
            Edit Article
          </button>
          <button onClick={onDelete}>Delete Article</button>
        </div>
      )}
      {comments.map((c, i) => (
        <CommentsListItem comment={c} setFetchAgain={setFetchAgain} key={i} />
      ))}
      <button>
        <Link to="/articles">Back</Link>
      </button>
      Comment
      <textarea
        rows={2}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button onClick={() => onConfirm(newComment)}>Confirm Comment</button>
    </div>
  );
};

export default ArticleDetail;
