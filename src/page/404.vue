<template>
    <div class="bedRequest">
        <h1>对不起老板</h1>
        <img @click="goLogin" src="../assets/404.jpg" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        goLogin(){
            this.$router.push('/login');
        }
    }
}
</script>

<style>
    .bedRequest{
        width: 100%;
        text-align: center;
    }
</style>
