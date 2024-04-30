<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Article Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ getArticle.title }}</h1>
      <p class="text-sm text-gray-500">
        Published on <span>{{ getArticle.created_at }}</span>
      </p>
    </div>
    <!-- Article Content -->
    <div class="mb-8">
      <p class="text-lg text-gray-700">{{ getArticle.content }}</p>
    </div>
    <!-- Comments Section -->
    <ArticleCommentList />
    <ArticleCommentForm />
  </div>
</template>

<script setup lang="ts">
const articleStore = useArticleStore();
const { getArticle } = storeToRefs(articleStore);

const route = useRoute();

onMounted(() => {
  articleStore.fetchArticle(parseInt(route.params.id as string));
});
</script>
