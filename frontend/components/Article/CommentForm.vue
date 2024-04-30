<template>
  <!-- Comment Form -->
  <div class="bg-white shadow rounded-lg p-4">
    <form action="#" method="POST">
      <div class="mb-4">
        <textarea
          v-model="data_form.content"
          name="comment"
          rows="3"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a comment..."
        ></textarea>
      </div>
      <div>
        <button
          @click="func_createComment"
          type="button"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const commentStore = useCommentStore();

const route = useRoute();
const data_form = reactive({
  content: "",
});

const func_createComment = () => {
  let $articleId = parseInt(route.params.id as string);
  if (data_form.content != "") {
    commentStore.create($articleId, data_form).then((res) => {
      commentStore.fetchList($articleId);
      data_form.content = "";
    });
  } else {
    alert("Please fill required field.");
  }
};
</script>
