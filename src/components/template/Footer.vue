<template>
  <footer class="footer">
    <span>Copyright <strong class="strong">Crass</strong></span
    ><span class="ano"> © 2000-2021</span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background: #efefef;
  color: #0f1870;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
.strong {
  color: #007bff;
  padding-right: 10px;
}
.ano {
  color: #0f1870;
  padding-right: 10px;
}
</style>
