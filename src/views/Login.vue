<template>
    <div id="login">
        <op-login-form/>
    </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm'

export default {
    name: 'login',

    components: {
        'op-login-form': LoginForm
    }
}
</script>