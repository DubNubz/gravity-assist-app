<template>
    <div class="outer">
        <div class="questions" v-if="currentType == 'Swarm'">
            <div class="question" v-for="question in swarmQuestions">
                <div class="titles">
                    <h2>{{ question.name }}</h2>
                    <p>{{ question.description }}</p>
                </div>
                <div class="icons">
                    <div class="card" v-for="ship in question.ships" @click="changeList(ship)"
                    :class="{ active: fleetStore().selectedShips.find((obj) => obj.name == ship.name && obj.variant == ship.variant) }">
                        <h3>{{ ship.name }} <span>({{ ship.variant }})</span></h3>
                        <img :src="ship.img" :alt="'Image of '+ ship.name">
                    </div>
                </div>
            </div>
        </div>
        <div class="questions" v-if="currentType == 'Tank'">
            <div class="question" v-for="question in tankQuestions">
                <div class="titles">
                    <h2>{{ question.name }}</h2>
                    <p>{{ question.description }}</p>
                </div>
                <div class="icons">
                    <div class="card" v-for="ship in question.ships" @click="changeList(ship)"
                    :class="{ active: fleetStore().selectedShips.find((obj) => obj.name == ship.name && obj.variant == ship.variant) }">
                        <h3>{{ ship.name }} <span>({{ ship.variant }})</span></h3>
                        <img :src="ship.img" :alt="'Image of '+ ship.name">
                    </div>
                </div>
            </div>
        </div>
        <div class="questions" v-if="currentType == 'DPS'">
            <div class="question" v-for="question in dpsQuestions">
                <div class="titles">
                    <h2>{{ question.name }}</h2>
                    <p>{{ question.description }}</p>
                </div>
                <div class="icons">
                    <div class="card" v-for="ship in question.ships" @click="changeList(ship)"
                    :class="{ active: fleetStore().selectedShips.find((obj) => obj.name == ship.name && obj.variant == ship.variant) }">
                        <h3>{{ ship.name }} <span>({{ ship.variant }})</span></h3>
                        <img :src="ship.img" :alt="'Image of '+ ship.name">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

type QuestionObject = {
    name: string;
    description: string;
    ships: Ship[];
}

const currentType = ref<"Swarm" | "Tank" | "DPS"> ();

const swarmQuestions: QuestionObject[] = [{
    name: "Carriers",
    description: "If you own multiple, select the one with highest TP",
    ships: shipData.filter((ship) => ship.type == "Carrier")
}, {
    name: "Support",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => ship.medium_fighters_held || ship.large_fighters_held || ship.corvettes_held || (ship.name == "Winged Hussar" && ship.variant == "C"))
}, {
    name: "Corvettes",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => ship.type == "Corvette")
}, {
    name: "Fighters",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => ship.type == "Fighter")
}];

const tankQuestions: QuestionObject[] = [{
    name: "Battlecruisers",
    description: "If you own multiple, select the one with highest TP",
    ships: shipData.filter((ship) => ship.type == "Battlecruiser")
}, {
    name: "Support",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => (ship.name == "CAS066" && ship.variant == "D") ||
    (["Ceres", "NOMA M470", "Mare Tranquillitatis", "Light Cone"].includes(ship.name) && ship.variant == "B"))
}, {
    name: "Other Tanks",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => (["Carilion", "Reliat"].includes(ship.name) && ship.variant == "C") || (["Eris I", "Chimera", "Taurus"].includes(ship.name)))
}];

const dpsQuestions: QuestionObject[] = [{
    name: "Hybrid Tanks",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => ["Taurus", "Eris I", "Chimera", "Io"].includes(ship.name) || (["Reliat", "Carilion"].includes(ship.name) && ship.variant == "C"))
}, {
    name: "Damage Dealers",
    description: "Select all blueprints owned",
    ships: shipData.filter((ship) => ["Quaoar", "Ranger"].includes(ship.name) || (["XenoStinger", "Callisto"].includes(ship.name) && ship.variant == "A") ||
    (["Ruby", "Reliat", "Mare Imbrium", "Callisto"].includes(ship.name) && ship.variant == "B") || (["Guardian"].includes(ship.name) && ship.variant == "C"))
}]

watch(() => fleetStore().preset, (type) => {
    if (type && type != "Custom") currentType.value = type;
});

onMounted(() => {
    const preset = fleetStore().preset;
    if (preset && preset != "Custom") currentType.value = preset;
});

function changeList (ship: Ship) {
    const currentList = fleetStore().selectedShips;
    if (currentList.some((obj) => obj.name == ship.name && obj.variant == ship.variant)) {
        const index = currentList.findIndex((ship2) => ship2.name == ship.name && ship2.variant == ship.variant);
        currentList.splice(index, 1);
    } else {
        currentList.push(ship);
    }
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

.questions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.question {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2em;

    .titles {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 1em;

        h2 {
            margin: 0;
        }

        p {
            margin: 0;
            font-size: 1.75em;
        }
    }

    .icons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 2em;

        .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 31%;
            height: 20em;
            background-color: rgb(36, 36, 36);
            transition: all 0.25s;
            border-radius: 1.5em;

            h3 {
                margin: 0;

                span {
                    font-size: 1.15em;
                    color: var(--gold);
                }
            }

            img {
                width: 80%;
            }
        }

        .active {
            background-color: rgb(55, 55, 55);
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .questions {
        .icons {
            .card:hover {
                background-color: rgb(60, 60, 60);
            }
        }
    }
}

</style>