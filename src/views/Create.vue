<template>
  <NavBar/>
  <div class="container-fluid min-vh-100" style="background-color: aliceblue">
        <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-sm-3 m-3 centerCard">
                <CreateTask/>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import CreateTask from '@/components/CreateTask.vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  components: { CreateTask, NavBar },
});
</script>

<style lang="scss">
.centerCard {
background-color: #fff;
padding: 100px 50px;
box-shadow: 0 1px 4px #b3b3b3;
font-size: 1rem;
font-weight: 600;
}
</style>