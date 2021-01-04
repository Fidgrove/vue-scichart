<template>
  <p class="sponsored">
    <a href="https://www.fidgrove.com" target="_blank" rel="noopener noreferrer"
      ><span>This project is sponsored by</span>
      <img alt="fidgrove" src="../public/img/fidgrove_icon.png" />
      <span class="team">Fidgrove Team</span>
    </a>
  </p>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
p.sponsored
  font-weight: 600
  background-color: #f3f3f3
  padding: 0.6em 1.2em
  border-radius: 16px
  display: inline-block
  margin: 1em 0 !important
  a
    color: #999
  img
    height: 48px
    margin-left: 16px
    border-radius: 50%
    overflow: hidden
  .team
    margin-left: 16px
  span,
  img
    vertical-align: middle
</style>
