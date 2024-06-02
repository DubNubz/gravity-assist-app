
export const fleetStore = defineStore("fleet", () => {
    const preset = ref<"Swarm" | "Tank" | "DPS" | "Custom" | undefined> ("Custom");
    const selectedShips = ref<Ship[]> ([]);

    return { preset, selectedShips }
});
