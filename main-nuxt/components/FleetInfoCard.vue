<template>
    <div class="outer" v-if="currentType">
        <div class="infoCard">
            <div class="cardTitle">
                <h2>{{ currentType }}</h2>
                <img :src="images[currentType]" :alt="'Image of ' + currentType">
            </div>
            <p>{{ descriptions[currentType] }}</p>
            <button @click="finish">
                <img :src="'/ui/plusFolder.svg'" alt="Create">
                <h2>Create <span v-if="currentType != 'Custom'">with template</span></h2>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const descriptions: Record<string, string> = {
    "Swarm": "Swarm fleets are fleets that hold enough aircraft to block out the sun. Aircraft losses are expected and must be rebuilt frequently.",
    "Tank": "Tank fleets are fleets that absorb damage from enemy fleets while buying time for allies to flank.",
    "DPS": "DPS fleets are fleets that are built to do as much damage as possible. They can deal significant amounts of damage to enemies if left unaccounted.",
    "Custom": "Plan out and create a fleet with any ship or aircraft!"
}
const images: Record<string, string> = {
    "Swarm": "/weapons/stats/antiaircraft.svg",
    "Tank": "/weapons/stats/hp.svg",
    "DPS": "/weapons/stats/antiship.svg",
    "Custom": "/weapons/stats/armor.svg"
}

const currentType = ref(fleetStore().preset);
const emit = defineEmits(["create", "custom"]);

watch(() => fleetStore().preset, () => currentType.value = fleetStore().preset);

function finish () {
    if (currentType.value == "Custom") {
        emit("custom");
        return;
    }

    emit("create");
}

</script>

<style lang="scss" scoped>

.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.infoCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: rgb(45, 45, 45);
    text-align: center;
    padding: 2em;
    border-radius: 1.5em;

    .cardTitle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;

        img {
            width: 4.8em;
        }
    }

    h2 {
        margin: 0;
    }

    p {
        margin: 0;
        margin-top: 1em;
        width: 80%;
        margin-bottom: 1em;
        font-size: 1.75em;
    }

    button {
        background-color: rgb(200, 200, 200);
        padding: 1em;
        border: 0;
        border-radius: 1.5em;
        transition: all 0.25s;
        display: flex;
        gap: 1em;

        img {
            width: 3.2em;
        }
        
        h2 {
            font-size: 2.25em;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .infoCard {
        button:hover {
            background-color: white;
        }
    }
}

</style>