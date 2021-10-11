<template>
  <div class="pessoa-admin">
    <b-form>
      <b-card header="Dados pessoais" header-tag="h4">
        <input type="hidden" v-model="pessoa.id" />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Nome:" label-for="pessoa-name">
              <b-form-input
                id="pessoa-name"
                type="text"
                v-model="pessoa.name"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe Nome"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Sexo:" label-for="pessoa-sexo">
              <b-form-input
                id="pessoa-sexo"
                type="text"
                v-model="pessoa.sexo"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe o sexo"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="CPF:" label-for="pessoa-cpf">
              <b-form-input
                id="pessoa-cpf"
                type="text"
                v-model="pessoa.cpf"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe cpf"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="E-mail:" label-for="pessoa-email">
              <b-form-input
                id="pessoa-email"
                type="text"
                v-model="pessoa.email"
                :readonly="mode === 'remove'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group
              label="Data de Nascimento:"
              label-for="data-nascimento-id"
            >
              <b-form-datepicker
                id="pessoa-dtNascimento"
                v-model="pessoa.dtNascimento"
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
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Naturalidade:" label-for="pessoa-naturalidade">
              <b-form-input
                id="pessoa-naturalidade"
                type="text"
                v-model="pessoa.naturalidade"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe a sua Naturalidade"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Beneficio:"
              label-for="pessoa-categoryId"
              required
            >
              <b-form-select
                id="pessoa-categoryId"
                :options="categories"
                v-model="pessoa.categoryId"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Atendente:"
              label-for="pessoa-userId"
              required
            >
              <b-form-select
                id="pessoa-userId"
                :options="users"
                v-model="pessoa.userId"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <!-- <b-card header="Endereços" header-tag="h4">
        <input type="hidden" v-model="endereco" />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Rua:" label-for="endereco-rua">
              <b-form-input
                id="endereco-rua"
                type="text"
                v-model="endereco.rua"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe a Rua"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Bairro:" label-for="endereco-bairro">
              <b-form-input
                id="endereco-bairro"
                type="text"
                v-model="endereco.bairro"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe bairro"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Complemento:" label-for="endereco-complemento">
              <b-form-input
                id="endereco-complemento"
                type="text"
                v-model="endereco.complemento"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe Complemento"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Cep:" label-for="endereco-cep">
              <b-form-input
                id="endereco-cep"
                type="text"
                v-model="endereco.cep"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe o cep"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Cidade:" label-for="endereco-cidade">
              <b-form-input
                id="endereco-cidade"
                type="text"
                v-model="endereco.cidade"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe cidade"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Estado:" label-for="endereco-estado">
              <b-form-input
                id="endereco-estado"
                type="text"
                v-model="endereco.estado"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe estado"
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="País:" label-for="endereco-pais">
              <b-form-input
                id="endereco-pais"
                type="text"
                v-model="endereco.pais"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe o pais"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card> -->
      <b-card header="Observações" header-tag="h4">
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group
              v-if="mode === 'save'"
              label="Conteúdo"
              label-for="pessoa-content"
            >
              <VueEditor
                v-model="pessoa.content"
                placeholder="Informe o Conteúdo do Beneficiario..."
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <hr />
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>
          <b-button class="ml-2" @click="reset"> Cancelar </b-button>
        </b-col>
      </b-row>
    </b-form>

    <hr />
    <b-table
      hover
      striped
      small
      sort-icon-left
      head-variant="dark"
      :items="pessoas"
      :fields="fields"
    >
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadPessoa(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadPessoa(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { VueEditor } from "vue2-editor";

export default {
  name: "Pessoa",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      pessoa: {},
      pessoas: [],
      endereco: {},
      // enderecos: [],
      // categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "#" },
        { key: "name", label: "Nome", sortable: true },
        { key: "sexo", label: "sexo", sortable: true },
        { key: "email", label: "email", sortable: true },
        { key: "cpf", label: "cpf", sortable: true },
        { key: "dtNascimento", label: "Data de Nascimento", sortable: true },
        { key: "naturalidade", label: "Naturalidade", sortable: true },
        { key: "content", label: "Observaçoes", sortable: true },

        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadPessoas() {
      const url = `${baseApiUrl}/pessoas`;
      axios.get(url).then((res) => {
        this.pessoas = res.data;
      });
    },

    reset() {
      this.mode = "save";
      this.pessoa = {};
      this.loadPessoas();
    },
    save() {
      const method = this.pessoa.id ? "put" : "post";
      const id = this.pessoa.id ? `/${this.pessoa.id}` : "";
      axios[method](`${baseApiUrl}/pessoas${id}`, this.pessoa)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.pessoa.id;
      axios
        .delete(`${baseApiUrl}/pessoas/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadPessoa(pessoa, mode = "save") {
      this.mode = mode;
      this.pessoa = { ...pessoa };
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
  mounted() {
    this.loadPessoas();
    this.loadUsers();
    this.loadCategories();
  },
};
</script>

<style></style>