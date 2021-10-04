import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createArticle } from "../backend/api";
import WriteArticle from "../components/WriteArticle";
import { ReduxState } from "../controllers/store/store";

const ArticleCreate: React.FunctionComponent = () => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string | undefined>(undefined);

    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();

    const onArticleCreate = async () => {
        if (!title || !content || !currentUser?.id) return;
        await createArticle({ createPayload: { author_id: currentUser?.id, title, content } });
        history.push(`/articles`);
    };

    return (
        <WriteArticle
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onConfirm={onArticleCreate}
            backUrl={"/articles"}
        />
    );
};

export default ArticleCreate;
