<template>
  <div class="bg-gray-100 p-8 h-svh">
    <div class="container mx-auto">
      <ArticleCreateForm />
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ul class="mb-4">
          <!-- Example task -->
          <li
            v-for="article in getArticles"
            :key="article?.id"
            class="border-b border-gray-200 flex justify-between items-center py-3"
          >
            <div>
              <span class="text-xl font-semibold">{{ article?.title }} </span>
              <p class="text-gray-700">{{ article.content }}</p>
            </div>
            <div>
              <button
                @click="func_handleDelete(article?.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const articleStore = useArticleStore();
const { getArticles } = storeToRefs(articleStore);

onMounted(() => {
  articleStore.fetchList();
});

const func_handleDelete = (id: number) => {
  articleStore
    .destroy(id)
    .then(() => {
      articleStore.fetchList();
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>
