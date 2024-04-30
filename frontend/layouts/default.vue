<template>
  <nav class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <!-- Logo or brand name as a link -->
            <NuxtLink to="/" class="font-bold text-lg">Brand</NuxtLink>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Primary navigation items -->
              <NuxtLink
                v-if="isAuthenticated"
                to="/articles"
                class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >Articles</NuxtLink
              >
              <NuxtLink
                v-if="!isAuthenticated"
                to="/login"
                class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >Login</NuxtLink
              >
              <NuxtLink
                v-if="!isAuthenticated"
                to="/register"
                class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >Register</NuxtLink
              >
              <a
                v-if="isAuthenticated"
                class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                href="#"
                @click="func_logout"
                >Logout</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { clearAllCookies } from "~/composables/useCookie";
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const func_logout = () => {
  authStore.logout().then(() => {
    clearAllCookies();
    window.location.href = "/login";
  });
};
</script>
