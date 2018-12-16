<template>
    <b-container fluid class="mt-2">
        <div class="row justify-content-center">
            <div class="col-4" @keydown.enter="performLogin()">
                <h2>{{ $t('nav.login')}}</h2>

                <div v-if="isLoading" class="row col">
                    <p>{{ $t('message.loader')}}</p>
                </div>
                <div v-else-if="hasError" class="row col">
                    <div class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>
                </div>

                <b-form-group
                        id="username"
                        :description="$t('login.username.description')"
                        :label="$t('login.username.label')"
                        label-for="username">
                    <b-form-input id="username" name="_username" v-model="username" type="text" :placeholder="$t('login.username.placeholder')"></b-form-input>
                </b-form-group>
                <b-form-group
                        id="password"
                        :description="$t('login.password.description')"
                        :label="$t('login.password.label')"
                        label-for="password">
                    <b-form-input id="password" name="_password" v-model="password" type="password" :placeholder="$t('login.password.placeholder')"></b-form-input>
                </b-form-group>
                <button @click="performLogin()" :disabled="username.length === 0 || password.length === 0 || isLoading" 
                        type="button" class="btn btn-primary">
                    {{ $t('login.button.login') }}
                </button>
            </div>
        </div>
    </b-container>
</template>

<script>
export default {
    name: 'loginform',

    data () {
        return {
            username: '',
            password: '',
        };
    },
    computed: {
        hasError () {
            return this.$store.getters['auth/hasError'];
        },
        error () {
            return this.$store.getters['auth/error'];
        },
    },
    methods: {
        performLogin () {
            let payload = { 
                    username: this.$data.username, 
                    password: this.$data.password 
                },
                redirect = this.$route.query.redirect;

            this.$store.dispatch('auth/login', payload).then(() => {
                if (typeof redirect !== 'undefined') {
                    this.$router.push({path: redirect});
                } else {
                    this.$router.push({path: '/'});
                }
            }).catch(e => this.$store.dispatch('messages/error', e));
        },
    },
}
</script>