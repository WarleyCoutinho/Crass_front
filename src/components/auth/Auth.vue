<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo" />
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword"
                type="password" placeholder="Confirme a Senha">

            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(data:image/jpeg;base64,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)
        no-repeat left;
    }

    .auth-modal {
        background-color: #FFFF;
        border-radius: 2rem;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        text-shadow: 0.0625rem 0.0625rem 0.0625rem black;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
        color: #101970;
    }

    .auth-modal input {
        border: 1px solid #101970;
        border-radius: 2rem;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        border-radius: 2rem;
        color: #FFF;
        border: none;
        padding: 5px 15px;
        padding: 5px 15px;
        background-color: #101970;
        text-shadow: 0.0625rem 0.0625rem 0.0625rem black;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>
