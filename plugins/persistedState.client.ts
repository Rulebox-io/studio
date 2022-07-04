import {defineNuxtPlugin} from "#app"
import {useStore} from "@/store/user"

export default defineNuxtPlugin(() => {
  const store = useStore()

  const fromLocal = window.localStorage.getItem(store.$id)
  if (fromLocal) {
    store.$patch(JSON.parse(fromLocal))
  }

  store.$subscribe(
    (_, state) => {
      window.localStorage.setItem(store.$id, JSON.stringify(state))
    },
    {detached: true}
  )
})
