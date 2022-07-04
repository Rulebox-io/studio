import {useStore} from "@/store/user"

export default defineNuxtRouteMiddleware((to) => {
  const store = useStore()

  if (["/auth/sign-in"].includes(to.path)) {
    return
  }

  if (!store.authenticated) {
    return navigateTo("/auth/sign-in")
  }
})
