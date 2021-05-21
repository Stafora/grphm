<template>
    <header class="header">
        <div class="container header__container">
            <div class="header__title">Тестовое задание</div>
            <div class="header__logo">
                <img src="@/assets/img/logo.svg" alt="">
            </div> 
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',
    }
</script>

<style lang="scss">
    .header{
        background: #fff;

        &__container{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            height: 100px;
            padding: 0px 25px;
        }

        &__title{
            font-size: 34px;
            line-height: 41px;
            color: #000000;
        }
        &__logo{
            width: 55px;

            img{
                max-width: 100%;
            }
        }
    }
</style>
