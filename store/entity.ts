import axios from "axios"
import {defineStore} from "pinia"

export const useStore = defineStore("entity", {
  actions: {
    /**
     * Deletes an entity revision. This function calls the server to delete
     * the revision with the specified identifier.
     * If a revision is returned, this function will route to the new revision number.
     * Otherwise, it will route back to the entities screen.
     * @param {*} payload The payload.
     */
    async deleteEntityRevision(payload) {
      const config = useRuntimeConfig()

      const {status, data} = await axios.delete(
        `${config.public.studioApiUrl}/entityrevision?tenant=${payload.tenant}&id=${payload.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      switch (status) {
        case 204:
          navigateTo(`/${payload.tenant}/entities`)
          break
        case 200:
          if (data.tag && data.revision) {
            navigateTo(`/${payload.tenant}/entity/${data.tag}/${data.revision}`)
          } else {
            navigateTo(`/${payload.tenant}/entities`)
          }
          break
      }
    },

    async updateEntityRevision(payload) {
      const config = useRuntimeConfig()

      const definition = payload.content

      const {status, data} = await axios.put(
        `${config.public.studioApiUrl}/entityrevision?tenant=${payload.tenant}&id=${payload.id}&ts=${payload.ts}`,
        definition,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (status === 200) {
        navigateTo(`/${payload.tenant}/entity/${data.tag}/${data.revision}`)
      }
      // TODO: catch 500, 412, 401, 403, 400
    },
  },
})
