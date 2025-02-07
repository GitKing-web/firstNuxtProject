import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to) => {
    if(import.meta.server) return
    const token = import.meta.client ? localStorage.getItem('token') : null


    if(!token && to.path !== '/auth/signin'){
            return navigateTo('/auth/signin', { replace: true})
    }

    try {
        const res = await $fetch('/api/auth/verify-token', {
            method: 'GET',
            headers : { Authorization: `Bearer ${token}` }
        })

        if(!res.authenticated){
            localStorage.removeItem('token')
            return navigateTo('/auth/signin', { replace: true } );
        }
        //@ts-ignore
        
    } catch (error) {
        console.log('Token validation failed:',  error);
        localStorage.removeItem('token')
        return navigateTo('/auth/signin', { replace: true})
        
    }



})