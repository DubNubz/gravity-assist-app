
export type FleetShip = Ship & {
    countInFleet: number;
    parentCarrier?: FleetShip;
    childrenAircraft?: FleetShip[];
}

function swarmGenerator () {
    function findShip (name: string, variant: "A" | "B" | "C" | "D") {
        return allShips.find((ship) => ship.name == name && ship.variant == variant);
    }

    const allShips = fleetStore().selectedShips;
    const fleet: FleetShip[] = [];
    const reinforcement: FleetShip[] = [];

    const carriers = allShips.filter((ship) => ship.type == "Carrier");
    const support = allShips.filter((ship) => ship.medium_fighters_held || ship.large_fighters_held || ship.corvettes_held || (ship.name == "Winged Hussar" && ship.variant == "C"));
    const corvettes = allShips.filter((ship) => ship.type == "Corvette");
    const fighters = allShips.filter((ship) => ship.type == "Fighter");

    const corvetteCarrierPriority = [findShip("Jaeger", "A"), findShip("AC721", "D"), findShip("Guardian", "B"), findShip("CAS066", "C")];

    if (carriers.length != 0) {
        const selectedCarrier = getRandomItemFromArray(carriers);
        selectedCarrier.countInFleet = 5;
        reinforcement.push(selectedCarrier);
    }

    const importantCorvettes = corvettes.filter((ship) => (["Cellular Defender", "CV-T800", "S-Levy9"].includes(ship.name)) || (ship.name == "Nebula Chaser" && ship.variant == "B"));
    const importantFighters = fighters.filter((ship) => ["Mistral", "Vitas B010", "Vitas A021"].includes(ship.name));
    let numOfImportantCorvettes = importantCorvettes.map((ship) => ship.maxInFleet).reduce((acc, item) => acc + item, 0);
    let numOfImportantFighters = importantFighters.map((ship) => ship.maxInFleet).reduce((acc, item) => acc + item, 0);

    let corvetteCapacity = support.map((ship) => (ship.corvettes_held ?? 0) * ship.maxInFleet).reduce((acc, item) => acc + item, 0);
    let fighterCapacity = support.map((ship) => ship.medium_fighters_held ?? ship.large_fighters_held ?? 0 * ship.maxInFleet).reduce((acc, item) => acc + item, 0);

    console.log(numOfImportantCorvettes, corvetteCapacity, corvetteCarrierPriority)
    if (numOfImportantCorvettes != 0 && corvetteCapacity != 0 && corvetteCarrierPriority.map((ship) => ship) != [...corvetteCarrierPriority].fill(undefined)) {
        while (corvetteCapacity > 0 && numOfImportantCorvettes > 0) {
            for (let ship of corvetteCarrierPriority) {
                if (ship) {
                    const changedShip = ship as FleetShip;
                    if (changedShip.countInFleet >= changedShip.maxInFleet) continue;

                    if (changedShip.countInFleet) {
                        changedShip.countInFleet++;
                        const index = fleet.findIndex((ship2) => ship2.name == ship.name && ship2.variant == ship.variant);
                        fleet[index] = changedShip;
                    } else {
                        changedShip.countInFleet = 1;
                        fleet.push(changedShip);
                    }

                    console.log(fleet)

                    corvetteCapacity -= changedShip.corvettes_held ?? 0;
                    numOfImportantCorvettes -= changedShip.corvettes_held ?? 0;
                }
            }
        } 
    }
}

function tankGenerator () {

}

function dpsGenerator () {

}

export function generateFleet () {
    if (fleetStore().preset == "Swarm") return swarmGenerator();
    else if (fleetStore().preset == "Tank") return tankGenerator();
    else return dpsGenerator();
}
