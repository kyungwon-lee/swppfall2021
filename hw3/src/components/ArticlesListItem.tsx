import React from "react";

interface Props {
    id: number;
    title: string;
    authorName: string;
    clickTitle: () => void;
}

const ArticleListItem: React.FunctionComponent<Props> = ({ id, title, authorName, clickTitle }) => {
    return (
        <div>
            {id}
            <button onClick={clickTitle}>{title}</button>
            {authorName}
        </div>
    );
};

export default ArticleListItem;
