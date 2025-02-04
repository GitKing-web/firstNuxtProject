<script setup>
import authGlobal from '~/middlewares/auth.global';

    definePageMeta({
        middleware: authGlobal,
        ssr: false,
    })
</script>

<template>
    <div>
      <h1>Dashboard</h1>
      <!-- Your dashboard content -->
    </div>
    <div>
      <p>Loading...</p>
    </div>
  </template>
  