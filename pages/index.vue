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
    </div>
  </template>
  