<template>
    <div class="document">
        <Header />
        <div class="document-content">
             <slot/>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/header/header.vue";
    export default {
        name: 'DefaultLayout',
        components: {
            Header,
        }
    }
</script>