export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    logged_in: boolean;
}

export interface Article {
    id: number;
    author_id: number;
    title: string;
    content: string;
}

export interface Comment {
    id: number;
    article_id: number;
    author_id: number;
    content: string;
}

export interface CreateArticleProps {
    author_id: number;
    title: string;
    content: string;
}

export interface CreateCommentProps {
    article_id: number;
    author_id: number;
    content: string;
}
