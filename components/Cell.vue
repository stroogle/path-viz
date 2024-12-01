<template>
    <div
        class="w-[30px] h-[30px] hover:bg-red-500 border-opacity-100 border-2 border-blue-500"
        :class="{
            'bg-blue-500': props.state == 'active',
            'bg-green-500': props.state == 'wall',
            'bg-yellow-500': props.state == 'end',
            'bg-purple-500': props.state == 'inactive'
        }"
    />
</template>

<script setup lang="ts">

import {Node} from '~/utils/node';

const props = defineProps<{
    state: "active" | "wall" | "end" | "inactive"
}>();



</script>

<style lang="scss" scoped>

</style>