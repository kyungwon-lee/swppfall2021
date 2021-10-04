import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { readArticle, readUser, updateArticle } from "../backend/api";
import { Article, User } from "../backend/entity";
import { ReduxState } from "../controllers/store/store";

type ArticleItem = Article & { authorName: string };
type TabTypes = "write" | "preview";

const ArticleEdit: React.FunctionComponent = () => {
    const articleId = parseInt(useParams<{ id: string }>().id);
    const [article, setArticle] = useState<ArticleItem | undefined>(undefined);

    useEffect(() => {
        const fetchArticleItem = async () => {
            const article: Article = (await readArticle({ id: articleId })).entity;
            const author: User = (await readUser({ id: article.author_id })).entity;
            setArticle({ ...article, authorName: author.name });
        };

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

    const [currentTab, setCurrentTab] = useState<TabTypes>("write");

    const history = useHistory();

    const onConfirm = async () => {
        if (!article || !title || !content || !isAuthor) return;
        updateArticle({ id: articleId, updatePayload: { ...article, title, content } });
        history.push(`/articles/${articleId}`);
    };

    const { currentUser } = useSelector((store: ReduxState) => store.user);

    const isAuthor = article?.id === undefined || currentUser?.id === article?.author_id;
    if (!isAuthor) return <Redirect to="/articles" />;

    return (
        <div>
            <button onClick={() => setCurrentTab("write")}>Write</button>
            <button onClick={() => setCurrentTab("preview")}>Preview</button>
            {currentTab === "write" ? (
                <>
                    Title
                    <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    Content
                    <textarea value={content} rows={10} onChange={(e) => setContent(e.target.value)}></textarea>
                </>
            ) : (
                <>
                    <div>Author: {currentUser?.name}</div>
                    <h1>Title: {title}</h1>
                    <div>Content: {content}</div>
                </>
            )}

            <button onClick={() => history.push(`/articles/${articleId}`)}>Back</button>
            <button onClick={onConfirm}>Confirm</button>
        </div>
    );
};

export default ArticleEdit;
