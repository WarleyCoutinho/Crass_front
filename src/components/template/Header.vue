<template>
  <header class="header">
    <h1 class="title" v-if="!hideUserDropdown">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#">
            <img src="../../assets/logo.png" width="30" alt="Avaloon Logo" />
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">
                <i class="fa fa-home"></i>
                Home
              </b-nav-item>
              <b-nav-item href="#">
                <i class="fa fa-credit-card-alt"></i>
                Beneficios
              </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
               <b-nav-item>
                 <i class="fa  fa-toggle-off" :class="icon"></i>
                
               Abrir Menu Lateral
              </b-nav-item>
              </a>
              <b-nav-item-dropdown right>
                <template #button-content>
                  <i class="fa fa-user"></i>
                  <em>User</em>
                </template>
                <UserDropdown v-if="!hideUserDropdown" />
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </h1>
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: Boolean,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa-toggle-on"
        : " fa-toggle-off ";
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
.header {
  grid-area: header;
  background: #efefef;
  display: flex;
  justify-content: left;
  align-items: left;
}

.title {
  font-size: 1.2rem;
  color: green;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a i {
  color: rgb(241, 16, 16);
  text-decoration: none;
}

.title a:hover {
  color: rgb(109, 23, 221);
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: rgb(235, 12, 12);
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: rgb(243, 3, 3);
  background-color: rgba(248, 10, 22, 0.404);
}
</style>
