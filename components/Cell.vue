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
        height: 100%;
        width: 100%;
        background: blue;
        transition: all ease-in-out 500ms;
    }

    .cell[data-visited="true"] {
        background: green;
    }

    .cell[data-type="0"] {
        background: orange;
    }

    .cell:hover {
        background: red;
    }

</style>