<template>
    <div class="outer" v-if="currentType">
        <div class="infoCard">
            <h2>{{ currentType }}</h2>
            <h3>{{ descriptions[currentType] }}</h3>
            <button><h2>Create <span v-if="currentType != 'Custom'">with template</span></h2></button>
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
const currentType = ref(fleetStore().preset);

watch(() => fleetStore().preset, () => currentType.value = fleetStore().preset);

</script>

<style lang="scss" scoped>

</style>