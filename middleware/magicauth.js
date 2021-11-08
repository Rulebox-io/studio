export default function ({ store, redirect }) {
  // If the user is not authenticated, redirect to login page.
  if (!store.state.user.authenticated) {
    return redirect('/auth/sign-in')
  }
}
