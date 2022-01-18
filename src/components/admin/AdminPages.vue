<template>
  <div class="admin-pages">
    <b-col md sm="12" class="mt-4">
      <PageTitle icon="fa fa-pencil-square-o" main="Apontamento Manual" sub="" />
    </b-col>
    <div>
      <UserAdmin />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, UserAdmin },
};
</script>

<style></style>
