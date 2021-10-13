import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { readArticle, readUser, updateArticle } from "../../backend/api";
import { Article, User } from "../../backend/entity";
import WriteArticle from "../../components/WriteArticle";
import { ReduxState } from "../../store/store";

type ArticleItem = Article & { authorName: string };

const ArticleEdit: React.FunctionComponent = () => {
    const articleId = parseInt(useParams<{ id: string }>().id);
    const [article, setArticle] = React.useState<ArticleItem | undefined>(undefined);

    useEffect(() => {
        fetchArticleItem();
    }, []);

    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");

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
        updateArticle({
            id: articleId,
            updatePayload: { ...article, title, content },
        });
        history.push(`/articles/${articleId}`);
    };

    const fetchArticleItem = async () => {
        const article: Article = (await readArticle({ id: articleId })).entity;
        const author: User = (await readUser({ id: article.author_id })).entity;
        setArticle({ ...article, authorName: author.name });
    };

    const isAuthor = article?.id === undefined || currentUser?.id === article?.author_id;
    useEffect(() => {
        if (!isAuthor) {
            history.push("/articles");
        }
    }, [isAuthor]);

    const backHandler = () => {
        if (title === article?.title && content === article?.content) {
            history.push("/articles/" + articleId);
            return;
        } else if (window.confirm("Are you sure? The change will be lost.")) {
            history.push("/articles/" + articleId);
        }
    };

    return (
        <div id="article-edit">
            <WriteArticle
                title={title}
                content={content}
                articleToEdit={article}
                onTitleChange={setTitle}
                onContentChange={setContent}
                backUrl={`/articles/${articleId}`}
                onConfirm={onArticleSave}
                from={"edit"}
                backHandler={backHandler}
            />
            <button id="fake-button1" onClick={backHandler} style={{ display: "none" }}></button>
            <button id="fake-button2" onClick={onArticleSave} style={{ display: "none" }}></button>
        </div>
    );
};

export default ArticleEdit;
