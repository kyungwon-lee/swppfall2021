import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createComment, deleteArticle, queryComments, readArticle, readUser } from "../backend/api";
import { Article, Comment, User } from "../backend/entity";
import CommentsListItem from "../components/CommentsListItem";
import { ReduxState } from "../controllers/store/store";

type ArticleItem = Article & { authorName: string };
type CommentItem = Comment & { authorName: string };

const ArticleDetail: React.FunctionComponent = () => {
    const articleId = parseInt(useParams<{ id: string }>().id);
    const [articleItem, setArticleItem] = useState<ArticleItem | undefined>();

    const [commentItems, setCommentItems] = useState<CommentItem[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();

    const isAuthor = currentUser?.id === articleItem?.author_id;

    useEffect(() => {
        fetchArticleItem();
        fetchComments();
    }, []);

    const onArticleDelete = async () => {
        await deleteArticle({ id: articleId });
        history.push("/articles");
    };

    const [commentsUpdated, setCommentsUpdated] = useState<boolean>(false);

    useEffect(() => {
        if (commentsUpdated) {
            fetchComments();
            setCommentsUpdated(false);
        }
    }, [commentsUpdated]);

    const onCommentConfirm = async (comment: string | null) => {
        if (currentUser?.id && comment) {
            await createComment({ createPayload: { author_id: currentUser?.id, content: comment, article_id: articleId } });
            setCommentsUpdated(true);
            setNewComment("");
        }
    };

    const fetchArticleItem = async () => {
        const article: Article = (await readArticle({ id: articleId })).entity;
        const author: User = (await readUser({ id: article.author_id })).entity;
        setArticleItem({ ...article, authorName: author.name });
    };

    const fetchComments = async () => {
        const comments: Comment[] = (await queryComments()).items.filter((c) => c.article_id === articleId);
        const commentItems: CommentItem[] = (await Promise.all(comments.map((c) => readUser({ id: c.author_id })))).map((user, i) => ({
            ...comments[i],
            authorName: user.entity.name,
        }));
        setCommentItems(commentItems);
    };

    useEffect(() => {
        return () => {
            setArticleItem(undefined);
            setCommentItems([]);
        };
    }, []);

    return (
        <div>
            <div>Author: {articleItem?.authorName}</div>
            <h1>Title: {articleItem?.title}</h1>
            <div>Content: {articleItem?.content}</div>
            {isAuthor && (
                <div>
                    <button onClick={() => history.push(`/articles/${articleId}/edit`)}>Edit Article</button>
                    <button onClick={onArticleDelete}>Delete Article</button>
                </div>
            )}
            {commentItems.map((c, i) => (
                <CommentsListItem
                    id={c.id}
                    content={c.content}
                    authorId={c.author_id}
                    authorName={c.authorName}
                    articleId={c.article_id}
                    setCommentsUpdated={setCommentsUpdated}
                    key={i}
                />
            ))}
            <button>
                <Link to="/articles">Back</Link>
            </button>
            Comment
            <textarea rows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={() => onCommentConfirm(newComment)}>Confirm Comment</button>
        </div>
    );
};

export default ArticleDetail;
