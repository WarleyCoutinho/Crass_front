<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <!-- <i class="fa fa-angle-down"></i> -->
    </div>
    <div class="user-dropdown-content">
       <router-link to="/pessoa" v-if="user.admin">
        <i class="fa fa-cogs"></i> Cadastro
      </router-link>
       <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-users"></i> Usuários
      </router-link>
       <router-link to="#" v-if="user.admin">
        <i class="fa fa-cogs"></i> Configuração
      </router-link>
      <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
    </div>
  </div>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";

export default {
  name: "UserDropdown",
  components: { Gravatar },
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #ffff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: #0f1870;
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  border-radius: 32px;
  right: 0px;
  background-color: #fffdfd;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(4, 76, 211, 0.144);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #007bff;
  padding: 10px;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  color: #0f1870;
  background-color: #fffefe;
}
</style>
