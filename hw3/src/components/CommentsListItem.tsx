import React from "react";
import { useSelector } from "react-redux";
import { deleteComment, updateComment } from "../backend/api";
import { ReduxState } from "../controllers/store/store";

interface Props {
    id: number;
    content: string;
    authorId: number;
    authorName: string;
    articleId: number;
    setCommentsUpdated: (updated: boolean) => any;
}

const CommentsListItem: React.FunctionComponent<Props> = ({ id, content, authorId, authorName, articleId, setCommentsUpdated }) => {
    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const isAuthor = currentUser?.id === authorId;

    const onDelete = async () => {
        await deleteComment({ id });
        setCommentsUpdated(true);
    };

    const onEdit = async () => {
        const edittedComment = prompt("Edit your comment.", content);
        if (edittedComment) {
            await updateComment({ id, updatePayload: { id, content: edittedComment, author_id: authorId, article_id: articleId } });
            setCommentsUpdated(true);
        }
    };

    return (
        <div>
            <div>--------------------------</div>
            <div>{authorName}</div>
            <div>{content}</div>
            {isAuthor && (
                <div>
                    <button onClick={onEdit}>Edit Comment</button>
                    <button onClick={onDelete}>Delete Comment</button>
                </div>
            )}
            <div>--------------------------</div>
        </div>
    );
};

export default CommentsListItem;
