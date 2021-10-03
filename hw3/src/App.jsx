import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import './App.css';
import { userAutoLogin, userLogout } from './controllers/store/actions/user';
import ArticleDetail from './pages/ArticleDetail';
import ArticleEdit from './pages/ArticleEdit';
import ArticlesList from './pages/ArticlesList';
import LoginPage from './pages/Login';

const App = () => {
  const { isLoggedIn, currentUser } = useSelector((store) => store.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const forbiddenPath = ['/articles'];
    if (!isLoggedIn && forbiddenPath.includes(location.pathname)) {
      history.push('/login');
    }
  }, [location.pathname, isLoggedIn]);

  useEffect(() => {
    dispatch(userAutoLogin());
  }, []);

  const onLogout = () => {
    console.log('logout');
    dispatch(userLogout());
  };

  return (
    <>
      <div className="App" style={{ marginBottom: 24 }}>
        <h1>SWPP HW3!</h1>
        {isLoggedIn && <button onClick={onLogout}>logout</button>}
      </div>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/articles/create">
          <ArticleEdit mode="create" />
        </Route>
        <Route path="/articles/:id/edit" component={ArticleEdit} />
        <Route path="/articles/:id" component={ArticleDetail} />
        <Route path="/articles" component={ArticlesList} />
      </Switch>
    </>
  );
};

export default App;
