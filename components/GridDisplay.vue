<template>
    <div class="grid-container" :style="css_styles">
        <div
            v-for="i in column_count * row_count"
            @mouseenter="() => console.log(i)"
            class="cell"
        />
    </div>
</template>

<script setup lang="ts">

let {
    column_count,
    row_count,
    gap_size,
    cell_size
} = defineProps<{
    column_count: number;
    row_count: number;
    gap_size: number;
    cell_size: number;
}>();

let css_styles = reactive({
    '--column_count': column_count,
    '--row_count': row_count,
    '--gap_size': `${gap_size}px`,
    '--cell_size': `${cell_size}px`
})

watchEffect(() => {
    css_styles = reactive({
        '--column_count': column_count,
        '--row_count': row_count,
        '--gap_size': `${gap_size}px`,
        '--cell_size': `${cell_size}px`
    })
})



</script>

<style scoped>

    .grid-container {
        --column_count: 0;
        --row_count: 0;
        --gap_size: 2px;
        --cell_size: 25px;
        display: grid;
        grid-template-columns: repeat(var(--column_count), var(--cell_size));
        grid-template-rows: repeat(var(--row_count), var(--cell_size));
        gap: var(--gap_size);
        width: 100%;
        height: 100%;
        align-content: center;
        justify-content: center;
    }

    .cell {
        height: 100%;
        width: 100%;
        background: blue;
    }

    .cell:hover {
        background: red;
    }

</style>