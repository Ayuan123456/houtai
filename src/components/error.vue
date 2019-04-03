<template>

    <div id="app" >
        <img src="../assets/momotou.png" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
   created(){
       setTimeout(() => {
           this.$router.push('/login')
       }, 3000);
   }
}
</script>

<style>

</style>
