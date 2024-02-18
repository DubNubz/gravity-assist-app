<template>
    <p>{{ resetEverything() }}<span v-for="char in globalVariables.inputText.value" :style="{ color: convertInput(0, char) }">{{ convertInput(1, char) }}</span>{{ emitStuff() }}</p>
</template>

<script setup>

import { globalVariables } from '@/stores/global';

const props = defineProps({
    Color: Object,
});

let startIndex = 0;
const output = [];
let reverse = false;

function resetEverything () {
    startIndex = 0;
    output.length = 0;
    if (globalVariables.reversed.value) {
        reverse = true;
    } else {
        reverse = false;
    }
}

function convertInput (type, input) {
    let color;

    if (reverse) {
        console.log("startIndex", startIndex);
        console.log("props.Color", Object(props.Color));
        console.log("props.Color.colorPalette", props.Color.colorPalette);
        console.log("props.Color.colorPalette[startIndex]", props.Color.colorPalette[startIndex]);
        console.log("props.Color.colorPalette.toReversed()[startIndex]", props.Color.colorPalette.toReversed()[startIndex]);
        color = props.Color.colorPalette.toReversed()[startIndex];
    } else {
        color = props.Color.colorPalette[startIndex];
    }

    if (type == 0) {
        if (input == "\n") {
            return "#ffffff";
        } else if (input == " ") {
            return "#ffffff";
        } else {
            return color.slice(0, 1) + color.slice(2);
        }
    } else {
        if (input == "\n") {
            input = "#r";
            output.push(input);
            console.log(output);
            return input;

        } else if (input == " ") {
            input = " ";
            output.push(input);
            console.log(output);
            return input;

        } else {
            startIndex++;
            if (startIndex >= props.Color.colorPalette.length) {
                startIndex = 0;
                reverse = !reverse;
            }

            output.push(color + input);
            console.log(output);
            return color + input;
        }
    }
    
}

const emit = defineEmits(['response']);

function emitStuff () {
    emit('response', output);
}

</script>

<style scoped>

p {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>