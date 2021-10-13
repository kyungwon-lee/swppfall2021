import axios from "axios";
import { Article, Comment, CreateArticleProps, CreateCommentProps, User } from "./entity";

interface CreateProps<entityCreateProp> {
    createPayload: entityCreateProp;
}

export function produceCreateAPI<entityCreateProp>(apiPath: string) {
    return async function ({ createPayload }: CreateProps<entityCreateProp>): Promise<{ entityId: string }> {
        try {
            const res: any = await axios.post(`/api${apiPath}`, createPayload);
            // console.log("" + res.data.id);
            return { entityId: "" + res.data.id };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

interface queryReturnType<returnEntityType> {
    items: returnEntityType[];
}

export function produceQueryAPI<returnEntityType>(apiPath: string) {
    return async function (): Promise<queryReturnType<returnEntityType>> {
        try {
            const res = await axios.get(`/api${apiPath}`);
            return { items: res.data };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

export function produceReadAPI<returnEntityType>(apiPath: string) {
    return async function ({ id }: { id: number }): Promise<{ entity: returnEntityType }> {
        try {
            const res: any = await axios.get(`/api${apiPath}/${id}`);
            return { entity: res.data };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

interface UpdateProps<entityUpdateProp> {
    id: number;
    updatePayload: entityUpdateProp;
}

export function produceUpdateAPI<entityUpdateProp>(apiPath: string) {
    return async function ({ id, updatePayload }: UpdateProps<entityUpdateProp>): Promise<void> {
        try {
            await axios.put(`/api${apiPath}/${id}`, updatePayload);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

export function produceDeleteAPI(apiPath: string) {
    return async function ({ id }: { id: number }): Promise<void> {
        try {
            await axios.delete(`/api${apiPath}/${id}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

export const createArticle = produceCreateAPI<CreateArticleProps>("/articles");
export const createComment = produceCreateAPI<CreateCommentProps>("/comments");

export const queryUsers = produceQueryAPI<User>("/user");
export const queryArticles = produceQueryAPI<Article>("/articles");
export const queryComments = produceQueryAPI<Comment>("/comments");

export const readUser = produceReadAPI<User>("/user");
export const readArticle = produceReadAPI<Article>("/articles");
export const readComment = produceReadAPI<Comment>("/comments");

export const updateUser = produceUpdateAPI<User>("/user");
export const updateArticle = produceUpdateAPI<Article>("/articles");
export const updateComment = produceUpdateAPI<Comment>("/comments");

export const deleteArticle = produceDeleteAPI("/articles");
export const deleteComment = produceDeleteAPI("/comments");
