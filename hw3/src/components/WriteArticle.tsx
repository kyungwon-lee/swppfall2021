import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Article } from "../backend/entity";
import { ReduxState } from "../controllers/store/store";

type ArticleItem = Article & { authorName: string };
type TabTypes = "write" | "preview";

interface Props {
    title: string | undefined;
    content: string | undefined;
    onTitleChange: (title: string) => any;
    onContentChange: (content: string) => any;
    articleToEdit?: ArticleItem;
    backUrl: string;
    onConfirm: () => any;
}

const WriteArticle: React.FunctionComponent<Props> = ({
    title,
    content,
    onTitleChange,
    onContentChange,
    articleToEdit,
    backUrl,
    onConfirm,
}) => {
    const { currentUser } = useSelector((store: ReduxState) => store.user);
    const [currentTab, setCurrentTab] = useState<TabTypes>("write");
    const history = useHistory();

    return (
        <div>
            <button onClick={() => setCurrentTab("write")}>Write</button>
            <button onClick={() => setCurrentTab("preview")}>Preview</button>
            {currentTab === "write" ? (
                <>
                    Title
                    <input value={title} onChange={(e) => onTitleChange(e.target.value)}></input>
                    Content
                    <textarea value={content} rows={10} onChange={(e) => onContentChange(e.target.value)}></textarea>
                </>
            ) : (
                <>
                    <div>Author: {articleToEdit?.authorName || currentUser?.name}</div>
                    <h1>Title: {title}</h1>
                    <div>Content: {content}</div>
                </>
            )}

            <button onClick={() => history.push(backUrl)}>Back</button>
            <button onClick={onConfirm} disabled={!title || !content}>
                Confirm
            </button>
        </div>
    );
};

export default WriteArticle;
