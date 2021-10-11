<template>
  <div class="endereco-admin">
    <b-form>
      <b-card header="Realizar Cadastro de Endereços" header-tag="h4">
        <input type="hidden" v-model="endereco.id" />
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
      :items="enderecos"
      :fields="fields"
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
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Endereco",
  data: function () {
    return {
      mode: "save",
      endereco: {},
      enderecos: [],
       page: 1,
      limit: 0,
      count: 0,
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
      this.endereco = { ...endereco };
    },
  },
  mounted() {
    this.loadEnderecos();
  },
};
</script>

<style></style>