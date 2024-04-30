
import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import { comments } from "~/utils/repository/comments";

export const useCommentStore = defineStore("commentStore", () => {
    const { $auth } = useNuxtApp();
    const commentRepo = comments($auth as AxiosInstance);

    /*** STATE */
    const commentList = ref([])

    /*** COMPUTED */
    const getComments = computed(() => {
        return commentList.value ?? []
    })


    /*** FUNCTIONS */
    const fetchList = (id: number) => {
        commentRepo.getComments(id).then((res: any)=> {
            commentList.value = res.data
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    const create = async (id: number,params: any) => {
       return await commentRepo.createComment(id, params);
    }



    return {
        fetchList,
        create,
        getComments,
    }
});