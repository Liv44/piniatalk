<script setup lang="ts">
import { ref } from "vue";
import { postLogin } from "../CRUD/generic";
import router from "../router";

const username = ref("");
const password = ref("");

const onClickLogin = async () => {
    try {
        if (username.value === "" || password.value === "") {
            alert("Username or password is empty");
        } else {
            await postLogin("login", username.value, password.value);
            router.push("/create");
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="login">
        <h1>LOGIN</h1>
    </div>
    <div class="container">
        <div class="page">
            <div class="img">
                <img src="./../assets/pinia-talk.svg" />
            </div>
            <label for="username">Nom d'utilisateur</label>
            <input
                type="text"
                id="username"
                name="username"
                class="inputChannel"
                placeholder="Nom d'utilisateur"
                v-model="username"
            />
            <label for="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                class="inputChannel"
                placeholder="Mot de passe"
                name="password"
                v-model="password"
            />
            <button value="Submit" @click="onClickLogin" class="buttonCreate">
                S'identifier
            </button>
        </div>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffc93e;
    font-size: 30px;
}

.img {
    display: flex;
    padding-top: 10px;
    padding-bottom: 30px;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 516px;
    height: 516px;
    background-color: #ffe46b;
    border: 5px solid #7ae18b;
    border-radius: 10px;
    padding-right: 46px;
    padding-left: 46px;
}
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: min-content;
}

label {
    color: black;
    font-size: 1rem;
    display: flex;
    width: 100%;
}

input {
    width: 100%;
    padding-left: 10px;
}

.inputChannel {
    margin-bottom: 1rem;
    background-color: #ffffff;
    color: black;
    height: 3rem;
    border-radius: 10px;
    border: #ffffff;
}

.buttonCreate {
    background-color: #51a256;
    color: white;
    height: 3rem;
    border-radius: 10px;
    border: #ffffff;
    width: 10rem;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
