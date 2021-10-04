import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { readArticle, readUser, updateArticle } from "../backend/api";
import { Article, User } from "../backend/entity";
import WriteArticle from "../components/WriteArticle";
import { ReduxState } from "../controllers/store/store";

type ArticleItem = Article & { authorName: string };

const ArticleEdit: React.FunctionComponent = () => {
    const articleId = parseInt(useParams<{ id: string }>().id);
    const [article, setArticle] = useState<ArticleItem | undefined>(undefined);

    useEffect(() => {
        fetchArticleItem();
    }, []);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (article) {
            setTitle(article.title);
            setContent(article.content);
        }
    }, [article]);

    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();

    const onArticleSave = async () => {
        if (!article || !title || !content || !isAuthor) return;
        updateArticle({ id: articleId, updatePayload: { ...article, title, content } });
        history.push(`/articles/${articleId}`);
    };

    const fetchArticleItem = async () => {
        const article: Article = (await readArticle({ id: articleId })).entity;
        const author: User = (await readUser({ id: article.author_id })).entity;
        setArticle({ ...article, authorName: author.name });
    };

    useEffect(() => {
        return () => setArticle(undefined);
    }, []);

    const isAuthor = article?.id === undefined || currentUser?.id === article?.author_id;
    if (!isAuthor) return <Redirect to="/articles" />;

    return (
        <WriteArticle
            title={title}
            content={content}
            articleToEdit={article}
            onTitleChange={setTitle}
            onContentChange={setContent}
            backUrl={`/articles/${articleId}`}
            onConfirm={onArticleSave}
        />
    );
};

export default ArticleEdit;
