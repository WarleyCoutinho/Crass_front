<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-card header="Dados Pessoais" header-tag="h4">
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Nome:" label-for="article-name">
              <b-form-input
                id="article-name"
                type="text"
                v-model="article.name"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>

          <b-col md="4" sm="12">
            <b-form-group label="Sexo:" label-for="article-sexo">
              <b-form-input
                id="article-sexo"
                type="text"
                v-model="article.sexo"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>

          <b-col md="4" sm="12">
            <b-form-group label="E-mail:" label-for="article-email">
              <b-form-input
                id="article-email"
                type="text"
                v-model="article.email"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            <b-form-group
              label="Data de Nascimento:"
              label-for="data-nascimento-id"
            >
              <b-form-datepicker
                id="article-dtNascimento"
                v-model="article.dtNascimento"
                required
                hide-header
                dark
                placeholder=""
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }"
              ></b-form-datepicker>
            </b-form-group>
            <!-- Data de Nascimento: {{article.dtNascimento}} -->
          </b-col>

          <b-col md="4" sm="12">
            <b-form-group
              label="Naturalidade:"
              label-for="article-naturalidade"
            >
              <b-form-input
                id="article-naturalidade"
                type="text"
                v-model="article.naturalidade"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Beneficio:"
              label-for="article-categoryId"
              required
            >
              <b-form-select
                id="article-categoryId"
                :options="categories"
                v-model="article.categoryId"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Atendente:"
              label-for="article-userId"
              required
            >
              <b-form-select
                id="article-userId"
                :options="users"
                v-model="article.userId"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-card header="Endereço" header-tag="h4">
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Rua:" label-for="article-rua">
              <b-form-input
                id="article-rua"
                type="text"
                v-model="article.rua"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Bairro:" label-for="article-bairo">
              <b-form-input
                id="article-bairro"
                type="text"
                v-model="article.bairro"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Complemento:" label-for="article-complemento">
              <b-form-input
                id="article-complemento"
                type="text"
                v-model="article.complemento"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="CEP:" label-for="article-cep">
              <b-form-input
                id="article-cep"
                type="text"
                v-model="article.cep"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Cidade:" label-for="article-cidade">
              <b-form-input
                id="article-cidade"
                type="text"
                v-model="article.cidade"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Estado:" label-for="article-estado">
              <b-form-input
                id="article-estado"
                type="text"
                v-model="article.estado"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="País:" label-for="article-pais">
              <b-form-input
                id="article-pais"
                type="text"
                v-model="article.pais"
                required
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-card header="Observações" header-tag="h4">
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Conteúdo"
              label-for="article-content"
            >
              <VueEditor
                v-model="article.content"
                placeholder="Informe o Conteúdo do Beneficiario..."
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-button variant="primary" v-if="mode === 'save'" @click="save"
        >Salvar</b-button
      >
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
        >Excluir</b-button
      >
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="articles" :fields="fields">
      <!-- <template slot="actions" slot-scope="data"> -->
      <template v-slot:cell(actions)="data">
        <b-button
          variant="warning"
          @click="loadArticle(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "sexo", label: "Sexo", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "dtNascimento", label: "Data de nascimento", sortable: true },
        { key: "naturalidade", label: "Naturalidade", sortable: true },
        { key: "rua", label: "Rua", sortable: true },
        { key: "bairro", label: "Bairro", sortable: true },
        { key: "complemento", label: "Complemento", sortable: true },
        { key: "cep", label: "CEP", sortable: true },
        { key: "cidade", label: "Cidade", sortable: true },
        { key: "estado", label: "Estado", sortable: true },
        { key: "pais", label: "País", sortable: true },
        { key: "content", label: "Observaçoes", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then((res) => (this.article = res.data));
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
  mounted() {
    this.loadUsers();
    this.loadCategories();
    this.loadArticles();
  },
};
</script>

<style>
</style>