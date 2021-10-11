<template>
  <div class="endereco-admin">
    <div v-show="displayForm">
      <b-form>
        <b-card header="Realizar Cadastro de Endereços" header-tag="h4">
          <input type="hidden" v-model="endereco.id" />

          <b-row>
            <b-col md="12" sm="12">
              <b-form-group
                v-if="mode === 'save'"
                label="Informar o Beneficiario:"
                label-for="endereco-pessoaId"
                required
              >
                <b-form-select
                  id="endereco-pessoaId"
                  :options="pessoas"
                  v-model="endereco.pessoaId"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" sm="12">
              <b-form-group label="Rua:" label-for="endereco-rua">
                <b-form-input
                  id="endereco-rua"
                  type="text"
                  v-model="endereco.rua"
                  :readonly="mode === 'remove'"
                  required
                  placeholder="Informe Rua"
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
              <b-form-group
                label="Complemento:"
                label-for="endereco-complemento"
              >
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
                  placeholder="Informe cep"
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
                  placeholder="Informe pais"
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
            <b-button
              variant="warning"
              class="ml-2"
              @click="displayForm = false"
            >
              Listar
            </b-button>
          </b-col>
        </b-row>
      </b-form>
      <hr />
    </div>
    <div class="overflow" v-show="!displayForm">
      <b-row>
        <b-col md="12" lg="12" class="my-2">
          <b-form-group label-for="filterInput" class="mb-2">
            <b-input-group size="md">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Digite para pesquisar"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Limpar</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        hover
        striped
        small
        sort-icon-left
        head-variant="dark"
        :items="enderecos"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="data">
          <b-button
            variant="warning"
            @click="loadEndereco(data.item)"
            class="mr-2"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadEndereco(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
    </div>
    <b-row>
      <b-col md="5" sm="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="Primeiro"
          prev-text="Anterior"
          next-text="Próximo"
          last-text="Último"
          size="md"
        ></b-pagination>
      </b-col>
      <b-col md="5" sm="12">
        <b-form-group
          label="Qtd Linhas"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="md"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            :options="pageOptions"
            size="md"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="2" sm="12" class="text-right">
        <b-button variant="primary" class="ml-2" @click="displayForm = true">
          Novo Endereço
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Endereco",
  data: function () {
    return {
      perPage: 5,
      currentPage: 1,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      displayForm: true,
      mode: "save",
      endereco: {},
      enderecos: [],
      fields: [
        { key: "id", label: "#" },
        { key: "rua", label: "Ruas:", sortable: true },
        { key: "bairro", sortable: true },
        { key: "complemento", label: "Complementos:", sortable: true },
        { key: "cep", label: "CEP:", sortable: true },
        { key: "cidade", label: "Cidades:", sortable: true },
        { key: "estado", label: "Estados:", sortable: true },
        { key: "pais", label: "País:", sortable: true },

        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadEnderecos() {
      const url = `${baseApiUrl}/enderecos`;
      axios.get(url).then((res) => {
        this.enderecos = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.endereco = {};
      this.loadEnderecos();
    },
    save() {
      const method = this.endereco.id ? "put" : "post";
      const id = this.endereco.id ? `/${this.endereco.id}` : "";
      axios[method](`${baseApiUrl}/enderecos${id}`, this.endereco)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.endereco.id;
      axios
        .delete(`${baseApiUrl}/enderecos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadEndereco(endereco, mode = "save") {
      this.mode = mode;
      this.displayForm = true;
      this.endereco = { ...endereco };
    },
    loadPessoas() {
      const url = `${baseApiUrl}/pessoas`;
      axios.get(url).then((res) => {
        this.pessoas = res.data.map((pessoa) => {
          return {
            value: pessoa.id,
            text: `${pessoa.name} - ${pessoa.cpf} - ${pessoa.sexo} - ${pessoa.dtNascimento}`,
          };
        });
      });
    },

    onFiltered(filteredIntems) {
      this.totalRows = filteredIntems.length;
      this.currentPage = 1;
    },
  },
  mounted() {
    this.loadPessoas();
    this.loadEnderecos();
  },
  computed: {
    rows() {
      return this.endereco.length;
    },
  },
};
</script>

<style></style>