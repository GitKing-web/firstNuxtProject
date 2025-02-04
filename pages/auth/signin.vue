<script lang="ts" setup>

import authSchema from '~/schema/auth.schema';

const router = useRouter()
const isLoading = ref(false)
const isRedirecting = ref(false)

const formState = reactive({
  identifier: '',
  password: ''
})


const handleSignin = async () => {

  try {
    isLoading.value = true

    const res = await $fetch('/api/auth/signin', {
      method: 'POST',
      body: formState
    })
    
    if(res.statusCode == 200){
      console.log(res);
      //@ts-ignore
      localStorage.setItem('token', res.token)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }else{
      console.log('Login failed: ' + res.statusCode);
      console.log(res.message);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="grid lg:grid-cols-2 h-screen">

    <div class="left place-self-center w-full px-8 md:px-16 
    lg:px-24 xl:px-36 2xl:px-52">

      <div class="header text-center mb-6">
        <div class="flex justify-center mb-2">
          <Logo />
        </div>
        <h1 class="text-xl font-bold mt-4">Login to your Account</h1>


      </div>

      
      <UCard class="mt-6 p-2" v-if="!isRedirecting">
          <UForm :state="formState" :schema="authSchema.SignInSchema"   @submit.prevent="handleSignin">

            <UFormGroup class="mb-4" name="identifier" label="Email/Username">
              <UInput v-model="formState.identifier" type="text" name="identifier" class="name" required />
            </UFormGroup>

            <UFormGroup class="mb-4" name="password" label="Password">
              <UInput v-model="formState.password" type="password" name="password" required />
            </UFormGroup>

            <UButton @click.prevent=handleSignin  block :loading="isLoading">Signin</UButton>

          </UForm>
        </UCard>

        <div v-else class="text-center mt-4">
        <p class="text-gray-500">Redirecting to your dashboard...</p>
        <UIcon name="loading" class="animate-spin text-gray-600" size="lg" />
      </div>

    </div>

    <div class="right hidden lg:block"></div>

  </div>
</template>


<style>
.right {
  background: linear-gradient(-45deg, #22c57e, #17533b, #3bffaa, #1e5d70);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 50% 0%;
  }

}
</style>