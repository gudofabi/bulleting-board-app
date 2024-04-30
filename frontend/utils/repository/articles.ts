import type { AxiosInstance } from "axios";

export const articles = (axios: AxiosInstance) => ({
    async getArticle(): Promise<any> {
        return axios.get("/articles");
    },

    async createArticle(params: any): Promise<any> {
        return axios.post("/articles", params);
    },
    
    async updateArticle(id: number, params: any): Promise<any> {
        return axios.patch(`/articles/${id}`, params);
    },
    
    async deleteArticle(id: number): Promise<any> {
        return axios.delete(`/articles/${id}`);
    },

})