import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createArticle } from "../backend/api";
import { ReduxState } from "../controllers/store/store";

type TabTypes = "write" | "preview";

const ArticleCreate: React.FunctionComponent = () => {
    const history = useHistory();
    const { currentUser } = useSelector((store: ReduxState) => store.user);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string | undefined>(undefined);
    const [currentTab, setCurrentTab] = useState<TabTypes>("write");

    const onConfirm = async () => {
        if (!title || !content || !currentUser?.id) return;
        await createArticle({ createPayload: { author_id: currentUser?.id, title, content } });
        history.push(`/articles`);
    };

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

            <button onClick={() => history.push(`/articles`)}>Back</button>
            <button onClick={onConfirm}>Confirm</button>
        </div>
    );
};

export default ArticleCreate;
