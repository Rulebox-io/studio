import axios from 'axios'

export const actions = {
  /**
   * Deletes an entity revision. This function calls the server to delete
   * the revision with the specified identifier.
   * If a revision is returned, this function will route to the new revision number.
   * Otherwise, it will route back to the entities screen.
   * @param {} _ 
   * @param {*} payload The payload.
   */
  async deleteEntityRevision(_, payload) {
    const { status, data } = await axios.delete(
      `${process.env.studioApiUrl}/entityrevision?tenant=${payload.tenant}&id=${payload.id}`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })

    switch (status) {
      case 204:
        this.$router.push(`/${payload.tenant}/entities`)
        break;
      case 200:
        if (data.tag && data.revision) {
          this.$router.push(`/${payload.tenant}/entity/${data.tag}/${data.revision}`)
        } else {
          this.$router.push(`/${payload.tenant}/entities`)
        }
        break;
    }
  },

  async updateEntityRevision(_, payload) {

    const definition = payload.content

    const { status, data } = await axios.put(
      `${process.env.studioApiUrl}/entityrevision?tenant=${payload.tenant}&id=${payload.id}&ts=${payload.ts}`,
      definition,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (status === 200) {
      this.$router.push(`/${payload.tenant}/entity/${data.tag}/${data.revision}`)
    }
    // TODO: catch 500, 412, 401, 403, 400
  }
}