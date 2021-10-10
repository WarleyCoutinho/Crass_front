<template>
  <div class="pessoa-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Cadastro do Sistema"
      sub="Realizar Cadastro de Beneficiarios"
    />
    <div class="pessoa-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Beneficiarios">
            <Pessoa />
          </b-tab>
          <b-tab title="Endereços">
            <Endereco />
          </b-tab>

          <b-tab title="Beneficios">
            <Beneficio />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Pessoa from "../pessoa/Pessoa";
import Endereco from "../../components/endereco/Endereco";
import Beneficio from "../../components/beneficio/Beneficio";
export default {
  name: "PessoaPages",
  components: { PageTitle, Pessoa, Endereco, Beneficio },
};
</script>

<style>
</style>
