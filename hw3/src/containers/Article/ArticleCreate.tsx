import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createArticle } from "../../backend/api";
import WriteArticle from "../../components/WriteArticle";
import { ReduxState } from "../../store/store";

const ArticleCreate: React.FunctionComponent = () => {
    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");

    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();

    const onArticleCreate = async () => {
        if (!title || !content || !currentUser?.id) return;
        const newArticleId = (
            await createArticle({
                createPayload: { author_id: currentUser?.id, title, content },
            })
        ).entityId;
        history.push(`/articles/${newArticleId}`);
    };

    return (
        <div id="article-create">
            <WriteArticle
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onConfirm={onArticleCreate}
                backUrl={"/articles"}
                from={"create"}
            />
            <button id="fake-button" onClick={onArticleCreate}></button>
        </div>
    );
};

export default ArticleCreate;
