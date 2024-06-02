<template>
    <div class="holder">
        <div class="presetOptions" v-if="templatePage">
            <div class="preset" @click="chooseOption('Custom')" :class="{ active: fleetStore().preset == 'Custom' }">
                <h2>Custom</h2>
                <img src="/weapons/stats/armor.svg" alt="Click to create a custom fleet lineup">
            </div>
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
        </div>

        <Transition name="infoCard">
            <div class="info" v-if="templatePage && selected">
                <FleetInfoCard @create="created = true" @custom="templatePage = false" />
            </div>
        </Transition>

        <Transition name="infoCard">
            <div class="questions" v-if="templatePage && created">
                <FleetQuestions />
                <button @click="generateFleet">Generate fleet</button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">

const templatePage = ref(true);
const selected = ref(true);
const created = ref(false);

let previousType: "Swarm" | "Tank" | "DPS" | "Custom" | undefined = "Custom";

useHead({
    title: "Fleet Builder",
    meta: [{ name: "description", content: "Create and design the fleet of your dreams using preset archetypes, or from your own imagination!" }]
})

async function chooseOption (type: "Swarm" | "Tank" | "DPS" | "Custom") {
    created.value = false;

    if (previousType == type) {
        selected.value = false;
        previousType = undefined;
        fleetStore().preset = undefined;
        fleetStore().selectedShips.length = 0;
        return;
    }

    selected.value = false;
    await delay(200);
    selected.value = true;
    previousType = type;
    fleetStore().preset = type;
    fleetStore().selectedShips.length = 0;
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
        width: 18em;
        height: 15em;
        background-color: rgb(36, 36, 36);
        border-radius: 1.5em;
        transition: all 0.25s;

        h2 {
            margin: 0;
            margin-bottom: 0.25em;
        }
        
        img {
            width: 8em;
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
    transform: translateY(-4em);
}

.info {
    width: 60em;
    margin-top: 4em;
}

.questions {
    width: 96em;
    margin-top: 4em;
}

@media (hover: hover) and (pointer: fine) {
    .presetOptions {
        .preset:hover {
            background-color: rgb(60, 60, 60);
        }
    }
}

</style>