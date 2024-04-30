<template>
  <div class="mb-4">
    <h2 class="text-2xl font-semibold mb-3">Comments:</h2>
    <div class="space-y-4">
      <!-- Comment Item -->
      <div
        class="bg-white shadow rounded-lg p-4"
        v-for="comment in getComments"
        :key="comment.id"
      >
        <p class="text-gray-600">{{ comment.content }}</p>
        <p class="text-sm text-gray-500">
          Commented on <span>{{ comment.created_at }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const commentStore = useCommentStore();
const { getComments } = storeToRefs(commentStore);

const route = useRoute();

onMounted(() => {
  commentStore.fetchList(parseInt(route.params.id as string));
});
</script>
