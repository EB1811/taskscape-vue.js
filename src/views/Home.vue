<template>
  <div>
    <CreateTask/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import CreateTask from '../components/CreateTask.vue';

export default defineComponent({
  components: { CreateTask },
});
</script>
