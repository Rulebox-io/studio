<template>
  <div class="container">
    <div class="label">Email</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.email }}
    </div>

    <div class="label">Issuer</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.issuer }}
    </div>

    <div class="label">Public Address</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.publicAddress }}
    </div>

    <div class="label">Token</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.token }}
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'magicauth',
}
</script>

<style>
.label {
  font-size: 12px;
  color: #6851ff;
  margin: 30px 0 5px;
}
.profile-info {
  font-size: 17px;
  word-wrap: break-word;
}
</style>
