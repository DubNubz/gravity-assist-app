<template>
    <div class="holder">
        <div class="presetOptions">
            <div class="preset" @click="chooseOption('Swarm')" :class="{ active: fleetStore().preset == 'Swarm' }">
                <h2>Swarm</h2>
                <img src="/weapons/stats/antiaircraft.svg" alt="Click to choose the Swarm preset fleet lineup">
            </div>
            <div class="preset" @click="chooseOption('Tank')" :class="{ active: fleetStore().preset == 'Tank' }">
                <h2>Tank</h2>
                <img src="/weapons/stats/hp.svg" alt="Click to choose the Tank preset fleet lineup">
            </div>
            <div class="preset" @click="chooseOption('DPS')" :class="{ active: fleetStore().preset == 'DPS' }">
                <h2>DPS</h2>
                <img src="/weapons/stats/antiship.svg" alt="Click to choose the DPS preset fleet lineup">
            </div>
            <div class="preset" @click="chooseOption('Custom')" :class="{ active: fleetStore().preset == 'Custom' }">
                <h2>Custom</h2>
                <img src="/weapons/stats/armor.svg" alt="Click to create a custom fleet lineup">
            </div>
        </div>

        <Transition name="infoCard">
            <FleetInfoCard v-if="selected" />
        </Transition>
    </div>
</template>

<script setup lang="ts">

const selected = ref(false);

let previousType: "Swarm" | "Tank" | "DPS" | "Custom" | undefined;

function chooseOption (type: "Swarm" | "Tank" | "DPS" | "Custom") {
    if (previousType == type) {
        selected.value = false;
        previousType = undefined;
        fleetStore().preset = undefined;
        return;
    }

    selected.value = true;
    previousType = type;
    fleetStore().preset = type;
}

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.presetOptions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
    width: 96em;

    .preset {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 20em;
        height: 16em;
        background-color: rgb(45, 45, 45);
        border-radius: 1.5em;
        transition: all 0.25s;

        h2 {
            margin: 0;
            margin-bottom: 0.25em;
        }
        
        img {
            width: 9em;
        }
    }

    .active {
        background-color: rgb(55, 55, 55);
    }
}

.infoCard-enter-active, .infoCard-leave-active {
    transition: all 0.25s ease-in-out;
}

.infoCard-enter-from, .infoCard-leave-to {
    opacity: 0.001;
    transform: translateY(-2em);
}

@media (hover: hover) and (pointer: fine) {
    .presetOptions {
        .preset:hover {
            background-color: rgb(60, 60, 60);
        }
    }
}

</style>