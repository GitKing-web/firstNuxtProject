<script lang="ts" setup>

import authSchema from '~/schema/auth.schema';

const router = useRouter()
const isLoading = ref(false)
const isRedirecting = ref(false)
// const isClient = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(() => {
  // isClient.value = true
})

const formState = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})


const handleSignup = async () => {
  isLoading.value = true
  
  const res = await $fetch('/api/auth/signup', {
    method: 'POST',
    body: formState
  })
  try {
    errorMessage.value = ''
    successMessage.value = ''

    
    if(res.statusCode == 200){
      console.log(res);
      // @ts-ignore
      successMessage.value = res.message || 'Account Created'
      isRedirecting.value = true
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    }else{
      //@ts-ignore
      throw new Error(res?.message || 'Invalid Credentials')
      // console.log('Login failed: ' + res.statusCode);
      // console.log(res.message);
    }
  } catch (error) {
    //@ts-expect-error
    errorMessage.value = res.message || 'Error Creating Account, check your credentials'

    setTimeout(() => {
      formState.username = ''
      formState.email = ''
      formState.password = ''
      formState.confirmPassword = ''
      errorMessage.value = ''
      isLoading.value = false
    }, 5000)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="grid lg:grid-cols-2 h-screen">
    <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52">
      <div class="header text-center mb-6">
        <div class="flex justify-center mb-2">
          <Logo />
        </div>
        <h1 class="text-xl font-bold mt-4">Create a Free Account</h1>
      </div>

      <!-- Success Message -->
      <Transition>
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          {{ successMessage }}
        </div>
      </Transition>

      <!-- Error Message -->
      <Transition>
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{{ errorMessage }}</p>
        </div>
      </Transition>

      <!-- Sign-in Form -->
      <UCard class="mt-6 p-2">
        <UForm :state="formState" :schema="authSchema.SignUpSchema" @submit.prevent="handleSignup">
          <UFormGroup class="mb-4" name="username" label="Username">
            <UInput v-model="formState.username" type="text" name="username" class="name" required />
          </UFormGroup>

          <UFormGroup class="mb-4" name="email" label="Email">
            <UInput v-model="formState.email" type="text" name="email" class="name" required />
          </UFormGroup>

          <UFormGroup class="mb-4" name="password" label="Password">
            <UInput v-model="formState.password" type="password" name="password" required />
          </UFormGroup>

          <UFormGroup class="mb-4" name="confirmpassword" label="Confirm Password">
            <UInput v-model="formState.confirmPassword" type="password" name="confirmpassword" required />
          </UFormGroup>

          <UButton @click.prevent="handleSignup" block :loading="isLoading"> Create Account </UButton>
        </UForm>
      </UCard>

      <!-- Redirecting Message -->
      <!-- <Transition>
        <div v-if="isRedirecting" class="text-center mt-4 text-gray-500">
          Redirecting to Dashboard...
        </div>
      </Transition> -->
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