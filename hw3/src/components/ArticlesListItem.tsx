import React from "react";
import { useHistory } from "react-router";

interface Props {
    id: number;
    title: string;
    authorName: string;
}

const ArticleListItem: React.FunctionComponent<Props> = ({ id, title, authorName }) => {
    const history = useHistory();

    return (
        <div id="article-list-item">
            {id}
            <button id="click-title" onClick={() => history.push(`/articles/${id}`)}>{title}</button>
            {authorName}
        </div>
    );
};

export default ArticleListItem;
