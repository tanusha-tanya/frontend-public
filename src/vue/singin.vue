<template>
    <ValidationObserver ref="form" tag="div" mode="eager">
        <form class="popup__form" @submit.prevent="onSubmit">
            <div class="popup__tabs">
                <label><input type="radio" name="type" value="buyer" v-model="type" /><span>Я Заказчик</span></label>
                <label><input type="radio" name="type" value="contractor" v-model="type" /><span>Я Поставщик</span></label>
            </div>
            <div v-show="error" v-html="error" class="form__error"></div>
            <ValidationProvider name="Логин или E-mail" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                <span class="field__label">Логин или E-mail</span>
                <input :class="{field: true, error: failed}" type="text" name="login" v-model="login">
                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="Пароль" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                <span class="field__label">Пароль</span>
                <input :class="{field: true, error: failed}" type="password" name="password" v-model="password">
                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="form__columns form__columns--remember">
<!--                <label class="field__container">-->
<!--                    <input class="field" type="checkbox" name="remember" v-model="rememberMe">-->
<!--                    <span class="field__label">Запомнить меня</span>-->
<!--                </label>-->
                <label class="checkbox">
                    <input type="checkbox" name="remember" v-model="rememberMe">
                    <span class="checkbox__body"></span>
                    <span class="checkbox__text">
                            Запомнить меня
                        </span>
                </label>
                <a href="#forgot" class="popup-link">Восстановить пароль</a>
            </div>
            <button type="submit" class="btn">Войти</button>
        </form>
    </ValidationObserver>
</template>

<script>
    import api from './helpers/api'
    import authorizationMixins from "./helpers/authorizationMixins";

    export default {
        name: 'singinApp',
        mixins: [api, authorizationMixins],
        data() {
            return {
                type: 'buyer',
                error: '',
                login: 'test@test.ru',
                password: '1234567',
                rememberMe: false,
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    window.openLoader()
                    this.authSignin(this.login, this.password)
                        .then((data) => {
                            const user = data.data.data.user;
                            const token = data.data.data.token;
                            this.authorizationMethod(user, token, {
                              rememberMe: this.rememberMe,
                              role: this.type
                            })
                        })
                        .catch((response) => {
                            if (
                                response &&
                                response.message === 'Request failed with status code 401'
                            ) {
                                this.error = 'Введен неверный логин или пароль';
                            }
                            window.closeLoader()
                        })
                });
            },
        },
    }
</script>

<style lang="scss">
    .form__columns--remember {
        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
            .checkbox {
                margin-bottom: .5rem;
            }
        }
    }
</style>
