<template>
    <div class="flex gap-4 h-full">
        <div class="flex-grow h-full bg-background rounded-md shadow-lg p-4 flex flex-col">
            <GridDisplay 
                :column_count="column_count"
                :row_count="row_count"
                :cell_size="CELL_SIZE"
                :gap_size="GRID_GAP"
                ref="grid_display"
            />
            <!-- <div v-for="(row, row_index) in maze.get_nodes()" class="flex">
                <Cell
                    v-for="(column, col_index) in row"
                    state="active"
                    @click="setWall(row_index, col_index)"
                />
            </div> -->
        </div>
        <div class="max-w-[300px] w-1/4 bg-background h-full flex gap-4 flex-col p-4 rounded-md shadow-lg">
            <Button @click="() => {colorMode.preference = 'light'}">
                <Icon icon="fe:sunny-o" />
                Light
            </Button>
            <Button @click="() => {colorMode.preference = 'dark'}">
                <Icon icon="fe:moon" />
                Dark
            </Button>
            <Label for="sel">Algorithm</Label>
            <Select id="sel">
                <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">
                    Apple
                    </SelectItem>
                    <SelectItem value="banana">
                    Banana
                    </SelectItem>
                    <SelectItem value="blueberry">
                    Blueberry
                    </SelectItem>
                    <SelectItem value="grapes">
                    Grapes
                    </SelectItem>
                    <SelectItem value="pineapple">
                    Pineapple
                    </SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Node } from '~/utils/node';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'

const colorMode = useColorMode()

const item = new Node();
const maze = ref(new Graph(20, 15))

const arr: ("inactive" | "active" | "wall" | "end")[][] = reactive([]);

for(let i = 0; i < 15; i++) {
    arr.push([]);
    for(let j = 0; j < 20; j++) {
        arr[i].push("inactive");
    }
}

arr[0][0] = "active"

arr[2][2] = "end"

function setWall(row: number, col: number) {
    arr[row][col] = "wall"
}

let grid_display = useTemplateRef("grid_display");
let {width, height} = useElementSize(grid_display);
const GRID_GAP = 2;
const CELL_SIZE = 25;
let column_count = ref(0);
let row_count = ref(0);

watchEffect(() => {
    column_count.value = Math.floor((width.value - GRID_GAP) / (CELL_SIZE + GRID_GAP))
    row_count.value = Math.floor((height.value - GRID_GAP) / (CELL_SIZE + GRID_GAP))
})

</script>

<style>
</style>
