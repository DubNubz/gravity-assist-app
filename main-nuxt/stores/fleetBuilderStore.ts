
export const fleetStore = defineStore("fleet", () => {
    const preset = ref<"Swarm" | "Tank" | "DPS" | "Custom"> ();

    return { preset }
});
