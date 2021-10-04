import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createComment, deleteComment, queryComments, readArticle, readUser } from "../backend/api";
import { Article, Comment, User } from "../backend/entity";
import CommentsListItem from "../components/CommentsListItem";
import { ReduxState } from "../controllers/store/store";

type ArticleItem = Article & { authorName: string };
type CommentItem = Comment & { authorName: string };

const ArticleDetail: React.FunctionComponent = () => {
    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const articleId = parseInt(useParams<{ id: string }>().id);
    const [article, setArticle] = useState<ArticleItem | undefined>();
    const [commentItems, setCommentItems] = useState<CommentItem[]>([]);
    const [newComment, setNewComment] = useState<string | null>(null);
    const [fetchAgain, setFetchAgain] = useState<boolean>(true);
    const history = useHistory();

    const isAuthor = currentUser?.id === article?.author_id;

    useEffect(() => {
        const fetchArticleItem = async () => {
            const article: Article = (await readArticle({ id: articleId })).entity;
            const author: User = (await readUser({ id: article.author_id })).entity;
            setArticle({ ...article, authorName: author.name });
        };
        const fetchComments = async () => {
            const comments: Comment[] = (await queryComments()).items.filter((c) => c.article_id === articleId);
            const commentItems: CommentItem[] = (await Promise.all(comments.map((c) => readUser({ id: c.author_id })))).map((user, i) => ({
                ...comments[i],
                authorName: user.entity.name,
            }));
            setCommentItems(commentItems);
        };

        if (fetchAgain) {
            fetchArticleItem();
            fetchComments();
            setFetchAgain(false);
        }
    }, [fetchAgain]);

    const onConfirm = async (comment: string | null) => {
        if (currentUser?.id && comment) {
            createComment({ createPayload: { author_id: currentUser?.id, content: comment, article_id: articleId } });
            setFetchAgain(true);
        }
    };

    const onDelete = async () => {
        await deleteComment({ id: articleId });
        history.push("/articles");
    };

    return (
        <div>
            <div>Author: {article?.authorName}</div>
            <h1>Title: {article?.title}</h1>
            <div>Content: {article?.content}</div>
            {isAuthor && (
                <div>
                    <button onClick={() => history.push(`/articles/${articleId}/edit`)}>Edit Article</button>
                    <button onClick={onDelete}>Delete Article</button>
                </div>
            )}
            {commentItems.map((c, i) => (
                <CommentsListItem
                    id={c.id}
                    content={c.content}
                    authorId={c.author_id}
                    authorName={c.authorName}
                    articleId={c.article_id}
                    setFetchAgain={setFetchAgain}
                    key={i}
                />
            ))}
            <button>
                <Link to="/articles">Back</Link>
            </button>
            Comment
            <textarea rows={2} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={() => onConfirm(newComment)}>Confirm Comment</button>
        </div>
    );
};

export default ArticleDetail;
