<template>
    <div class="row mt-4">
        <div
            style="text-align: left; padding: 0px"
            v-for="[name, level] in Object.entries(playerStats)"
            :key="name"
            class="col-5 col-sm-4 col-md-3 col-lg-2 my-1"
        >
            <div class="statStyle p-2 statInfoContainer statDescContainer">
                <h6>{{ level.name }} - {{ level.level }}</h6>
                <span class="text-muted statInfo">
                    Current Exp: {{ level.curExp }}<br />Exp to next level:
                    {{ level.xpToNext }}
                </span>
                <span class="text-muted statDesc">
                    This is a description of the stat.
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

//TODO List skills in the same order each time.

export default defineComponent({
    computed: {
        ...mapGetters({
            playerStats: "getStats",
        }),
    },
});
</script>

<style lang="scss">
.statStyle {
    text-align: center;
}
.statInfoContainer {
    position: relative;
    display: inline-block;
    cursor: context-menu;
}
.statInfoContainer .statInfo {
    visibility: hidden;
    width: 200px;
    background-color: #f5f5f5;
    color: #000;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 35%;
    margin-left: -50%;
    opacity: 0;
}
.statInfoContainer {
    position: relative;
    &:hover {
        .statInfo {
            visibility: visible;
            opacity: 1;
            transition: 0.25s all ease;
            transition-delay: 0.25s;
        }
    }
}

.statDescContainer {
    position: relative;
    display: inline-block;
    cursor: context-menu;
}
.statDescContainer .statDesc {
    visibility: hidden;
    opacity: 0;
    width: 200px;
    background-color: #f5f5f5;
    color: #000;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 245%;
    left: 35%;
    margin-left: -50%;
}
.statDescContainer {
    position: relative;
    &:hover {
        .statDesc {
            visibility: visible;
            opacity: 1;
            transition: 0.25s all ease;
            transition-delay: 1.5s;
        }
    }
}
</style>
