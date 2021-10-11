import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Article } from "../backend/entity";
import { ReduxState } from "../store/store";

type ArticleItem = Article & { authorName: string };
type TabTypes = "write" | "preview";

interface Props {
  title: string | undefined;
  content: string | undefined;
  onTitleChange: (title: string) => any;
  onContentChange: (content: string) => any;
  articleToEdit?: ArticleItem;
  backUrl: string;
  from: string;
  onConfirm: () => any;
  backHandler?: () => any;
}

const WriteArticle: React.FunctionComponent<Props> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  articleToEdit,
  backUrl,
  from,
  onConfirm,
  backHandler,
}) => {
  const { currentUser } = useSelector((store: ReduxState) => store.user);
  const [currentTab, setCurrentTab] = useState<TabTypes>("write");
  const history = useHistory();

  return (
    <div>
      <button id="write-tab-button" onClick={() => setCurrentTab("write")}>
        Write
      </button>
      <button id="preview-tab-button" onClick={() => setCurrentTab("preview")}>
        Preview
      </button>
      <br />
      {currentTab === "write" ? (
        <>
          Title
          <input
            id="article-title-input"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          ></input>
          <br />
          Content
          <textarea
            id="article-content-input"
            value={content}
            rows={10}
            onChange={(e) => onContentChange(e.target.value)}
          ></textarea>
        </>
      ) : (
        <>
          <div id="article-author">
            Author: {articleToEdit?.authorName || currentUser?.name}
          </div>
          <h1 id="article-title">Title: {title}</h1>
          <div id="article-content">Content: {content}</div>
        </>
      )}

      <br />
      {from === "create" ? (
        <>
          <button
            id="back-create-article-button"
            onClick={() => history.push(backUrl)}
          >
            Back
          </button>
          <button
            id="confirm-create-article-button"
            onClick={onConfirm}
            disabled={!title || !content}
          >
            Confirm
          </button>
        </>
      ) : (
        <>
          <button id="back-edit-article-button" onClick={backHandler}>
            Back
          </button>
          <button
            id="confirm-edit-article-button"
            onClick={onConfirm}
            disabled={!title || !content}
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default WriteArticle;
