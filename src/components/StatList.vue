<template>
    <div v-if="playerStats.level">
        <div class="row mt-4" style="text-align: left">
            <div class="col">
                <div class="statStyle p-2 statInfoContainer statDescContainer">
                    <h6>
                        {{ playerStats.productivityL.name }}:
                        {{ playerStats.productivityL.level }}
                    </h6>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.productivityL.curExp
                        }}<br />Exp to next level:
                        {{ playerStats.productivityL.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="statStyle p-2 statInfoContainer statDescContainer">
                    <h6>
                        {{ playerStats.efficiencyL.name }}:
                        {{ playerStats.efficiencyL.level }}
                    </h6>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.efficiencyL.curExp
                        }}<br />Exp to next level:
                        {{ playerStats.efficiencyL.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="statStyle p-2 statInfoContainer statDescContainer">
                    <h6>
                        {{ playerStats.efficiencyL.name }}:
                        {{ playerStats.efficiencyL.level }}
                    </h6>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.efficiencyL.curExp
                        }}<br />Exp to next level:
                        {{ playerStats.efficiencyL.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="statStyle p-2 statInfoContainer statDescContainer">
                    <h6>
                        {{ playerStats.predictabilityL.name }}:
                        {{ playerStats.predictabilityL.level }}
                    </h6>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.predictabilityL.curExp
                        }}<br />Exp to next level:
                        {{ playerStats.predictabilityL.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="statStyle p-2 statInfoContainer statDescContainer">
                    <h6>
                        {{ playerStats.hardWorkerL.name }}:
                        {{ playerStats.hardWorkerL.level }}
                    </h6>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.hardWorkerL.curExp
                        }}<br />Exp to next level:
                        {{ playerStats.hardWorkerL.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="statStyle p-2 statInfoContainer statDescContainer">
                    <h6>
                        {{ playerStats.smartWorkerL.name }}:
                        {{ playerStats.smartWorkerL.level }}
                    </h6>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.smartWorkerL.curExp
                        }}<br />Exp to next level:
                        {{ playerStats.smartWorkerL.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
        </div>
        <div class="row mt-5" style="text-align: left">
            <div class="col-12">
                <div
                    class="statStyle p-2 statInfoContainer statDescContainer me-auto"
                >
                    <h5>
                        {{ playerStats.level.name }}:
                        {{ playerStats.level.level }}
                    </h5>
                    <span class="text-muted statInfo">
                        Current Exp: {{ playerStats.level.curExp }}<br />Exp to
                        next level:
                        {{ playerStats.level.xpToNext }}
                    </span>
                    <span class="text-muted statDesc">
                        This is a description of the stat.
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div v-else>Loading</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

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
    width: 150px;
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
    font-size: 0.75rem;
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
    width: 150px;
    background-color: #f5f5f5;
    color: #000;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 220%;
    left: 35%;
    margin-left: -50%;

    font-size: 0.75rem;
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
