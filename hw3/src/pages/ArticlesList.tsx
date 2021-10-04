import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { queryArticles, readUser } from "../backend/api";
import { Article } from "../backend/entity";
import ArticleListItem from "../components/ArticlesListItem";

type ArticleItem = Article & { authorName: string };

const ArticlesList: React.FunctionComponent = () => {
    const history = useHistory();
    const [articles, setArticles] = useState<ArticleItem[]>([]);

    useEffect(() => {
        const fetchArticleItems = async () => {
            const articles: Article[] = (await queryArticles()).items;
            const articleItems: ArticleItem[] = (await Promise.all(articles.map((a) => readUser({ id: a.author_id })))).map((user, i) => ({
                ...articles[i],
                authorName: user.entity.name,
            }));
            setArticles(articleItems);
        };
        fetchArticleItems();
    }, []);

    return (
        <div>
            Articles List
            {articles.map((a, i) => (
                <ArticleListItem id={a.id} title={a.title} authorNmae={a.authorName} key={i} />
            ))}
            <button onClick={() => history.push("/articles/create")}>Create</button>
        </div>
    );
};

export default ArticlesList;
