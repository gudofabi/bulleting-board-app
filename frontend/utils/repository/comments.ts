import type { AxiosInstance } from "axios";

export const comments = (axios: AxiosInstance) => ({
    async getComments(id: number): Promise<any> {
        return axios.get(`/articles/${id}/comments`);
    },


    async createComment(id: number, params: any): Promise<any> {
        return axios.post(`/articles/${id}/comments`, params);
    },

})