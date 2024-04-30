import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import { articles } from "~/utils/repository/articles";

export const useArticleStore = defineStore("articleStore", () => {
    const { $auth } = useNuxtApp();
    const articleRepo = articles($auth as AxiosInstance);

    /*** STATE */
    const articleList = ref([])
    const articleData = ref({})

    /*** COMPUTED */
    const getArticles = computed(() => {
        return articleList.value ?? []
    })

    /*** FUNCTIONS */
    const fetchList = () => {
        articleRepo.getArticle().then((res: any)=> {
           articleList.value = res.data.data
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    const create = async (params: any) => {
       return await articleRepo.createArticle(params);
    }

    const destroy = async (id: number) => {
       return await articleRepo.deleteArticle(id);
    }


    return {
        fetchList,
        create,
        destroy,
        getArticles
    }
});