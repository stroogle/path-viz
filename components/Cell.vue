<template>
    <div
        class="cell"
        :data-type="type"
        :data-visited="visited"
    />
</template>

<script setup lang="ts">
import Node, {NodeType} from '~/utils/node';


let {
    visited,
    type
} = defineProps<{
    visited: boolean,
    type: NodeType
}>();

</script>

<style scoped>

    .cell {
        --open-colour: blue;
        --wall-colour: orange;
        --path-colour: pink;
        --visited-colour: green;
        --start-colour: yellow;
        --end-colour: red;
        height: 100%;
        width: 100%;
        transition: all ease-in-out 0ms;
    }

    .cell[data-type="0"] {
        background: var(--wall-colour);
    }

    .cell[data-type="1"] {
        background: var(--open-colour);
    }

    .cell[data-visited="true"] {
        background: var(--visited-colour);
    }

    .cell[data-type="2"] {
        background: var(--path-colour);
    }

    .cell[data-type="3"] {
        background: var(--start-colour);
    }

    .cell[data-type="4"] {
        background: var(--end-colour);
    }

    

    .cell:hover {
        scale: 0.9;
    }

</style>