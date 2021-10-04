import React from "react";
import { Link } from "react-router-dom";

interface Props {
    id: number;
    title: string;
    authorNmae: string;
}

const ArticleListItem: React.FunctionComponent<Props> = ({ id, title, authorNmae }) => {
    return (
        <div>
            {id}
            <button>
                <Link to={`/articles/${id}`}>{title}</Link>
            </button>
            {authorNmae}
        </div>
    );
};

export default ArticleListItem;
