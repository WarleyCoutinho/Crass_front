<template>
  <div class="article-admin">
    <b-form>

      <b-card header="Dados Pessoais" header-tag="h4">
        <b-row>
          <input id="beneficiario-id" type="hidden" v-model="beneficiario.id" />
          <b-col md="4" sm="12">
            <b-form-group label="Nome:" label-for="beneficiario-name">
              <b-form-input
                id="beneficiario-name"
                type="text"
                v-model="beneficiario.name"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe seu Nome "
              />
            </b-form-group>
             <p class="mb-1">Data de nascimento: '{{ beneficiario.name }}'</p> -->
          </b-col>

          <b-col md="4" sm="12">
            <b-form-group label="Sexo" label-for="beneficiario-sexo">
              <b-form-input
                id="beneficiario-sexo"
                type="text"
                v-model="beneficiario.sexo"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o Sexo"
              />
            </b-form-group>
          </b-col>

          <b-col md="4" sm="12">
            <b-form-group label="Email" label-for="beneficiario-email">
              <b-form-input
                id="beneficiario-email"
                type="text"
                v-model="beneficiario.email"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o Email"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="CPF" label-for="beneficiario-cpf">
              <b-form-input
                id="beneficiario-cpf"
                type="text"
                v-model="beneficiario.cpf"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o CPF"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <label for="beneficiario-data-nascimento">Data de validade</label>
            <b-input-group class="mb-3">
              <b-form-input
                id="beneficiario-data-nascimento"
                v-model="beneficiario.nascimento"
                type="text"
                required
                :readonly="mode === 'remove'"
                placeholder=""
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="beneficiario.nascimento"
                  today-button
                  reset-button
                  close-button
                  button-only
                  right
                  locale="PT"
                  aria-controls="beneficiario-data-nascimento"
                  @context="onContext"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
            <p class="mb-1">Data de nascimento: '{{ beneficiario.nascimento }}'</p> -->
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group
              label="Naturalidade"
              label-for="beneficiario-naturalidade"
            >
              <b-form-input
                id="beneficiario-naturalidade"
                type="text"
                v-model="beneficiario.naturalidade"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe Nacionalidade"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Beneficio:"
              label-for="beneficiario-categoryId"
            >
              <b-form-select
                id="beneficiario-categoryId"
                :options="categories"
                v-model="beneficiario.categoryId"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Atendente:"
              label-for="beneficiario-userId"
            >
              <b-form-select
                id="beneficiario-userId"
                :options="users"
                v-model="beneficiario.userId"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-card header="Endereço" header-tag="h4">
        <b-row>
          <b-col md="4" sm="12">
            <p>rua</p>
          </b-col>
          <b-col md="4" sm="12">
            <p>bairro</p>
          </b-col>
          <b-col md="4" sm="12">
            <p>CP</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            <p>cidade</p>
          </b-col>
          <b-col md="4" sm="12">
            <p>estado</p>
          </b-col>
          <b-col md="4" sm="12">
            <p>pais</p>
          </b-col>
        </b-row>
      </b-card>







      <b-card header="Original" header-tag="h4">
        <b-row>
          <b-col md="4" sm="12">
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Nome:" label-for="article-name">
              <b-form-input
                id="article-name"
                type="text"
                v-model="article.name"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o Nome do Artigo..."
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Descrição" label-for="article-description">
              <b-form-input
                id="article-description"
                type="text"
                v-model="article.description"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o Nome do Artigo..."
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Imagem (URL):"
              label-for="article-imageUrl"
            >
              <b-form-input
                id="article-imageUrl"
                type="text"
                v-model="article.imageUrl"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe a URL da Imagem..."
              />
            </b-form-group>
          </b-col>
           </b-row>
        
               <b-row>
            <b-col md="6" sm="12">
              <b-form-group
                v-if="mode === 'save'"
                label="Categoria:"
                label-for="article-categoryId"
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
                label="Autor:"
                label-for="article-userId"
              >
                <b-form-select
                  id="article-userId"
                  :options="users"
                  v-model="article.userId"
                />
              </b-form-group>
            </b-col>
              </b-row>
              <b-row>
            <b-col md="12" sm="12">
              <b-form-group
                v-if="mode === 'save'"
                label="Conteúdo"
                label-for="article-content"
              >
                <VueEditor
                  v-model="article.content"
                  placeholder="Informe o Conteúdo do Artigo..."
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
      <template slot="actions" slot-scope="data">
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
      beneficiario: {},
      beneficiarios: [],
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
        { key: "nascimento", label: "Data de nascimento", sortable: true },
        { key: "naturalidade", label: "Naturalidade", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
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