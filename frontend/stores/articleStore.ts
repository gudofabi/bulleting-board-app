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

    const getArticle = computed(() => {
        return articleData.value ?? {}
    })

    /*** FUNCTIONS */
    const fetchList = () => {
        articleRepo.getArticles().then((res: any)=> {
           articleList.value = res.data.data
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    const fetchArticle = (id: number) => {
        articleRepo.getArticle(id).then((res: any)=> {
            articleData.value = res.data.data
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
        fetchArticle,
        create,
        destroy,
        getArticles,
        getArticle
    }
});