<template>
    <div class="flex gap-4 h-full">
        <div class="flex-grow h-full bg-background rounded-md shadow-lg p-4 flex flex-col">
            <GridDisplay
                :v-if="column_count * row_count > 0"
                :column_count="column_count"
                :row_count="row_count"
                :cell_size="CELL_SIZE"
                :gap_size="GRID_GAP"
                :nodes="graph.nodes"
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
            <Button @click="() => {
                reset_graph();
                execute_algorithm();
            }">
                <Icon icon="fe:loop" />
                Reset Grid
            </Button>
            <Label for="sel">Algorithm</Label>
            <Select id="sel" v-model="algo">
                <SelectTrigger>
                <SelectValue placeholder="Select an algorithm" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel>Algorithms</SelectLabel>
                    <SelectItem value="dfs">
                    Depth-First Search
                    </SelectItem>
                    <SelectItem value="bfs">
                    Bredth-First Search
                    </SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import Graph from '~/utils/graph';
import Node from '~/utils/node';
import DFS from "~/utils/dfs";
import BFS from "~/utils/bfs";
import type Algorithm from "~/utils/algorithm";


const colorMode = useColorMode()

let grid_display = useTemplateRef("grid_display");
let {width, height} = useElementSize(grid_display);
const GRID_GAP = 2;
const CELL_SIZE = 25;
let column_count = ref(0);
let row_count = ref(0);
let nodes: Node[] = Array(0);
let base_graph = new Graph(nodes, row_count.value, column_count.value);
let graph = reactive(base_graph);
let algo = ref("dfs");

watchEffect(() => {
    let c = Math.floor((width.value - GRID_GAP) / (CELL_SIZE + GRID_GAP));
    let r = Math.floor((height.value - GRID_GAP) / (CELL_SIZE + GRID_GAP))

    nodes = [];

    for(let i = 0; i < c * r; i++)
        nodes.push(new Node());

    Object.assign(base_graph, new Graph(nodes, r, c))

    Object.assign(graph, base_graph)

    // graph = reactive(new Graph(nodes, row_count.value, column_count.value));

    column_count.value = c;
    row_count.value = r;

})

function reset_graph() {
    let c = Math.floor((width.value - GRID_GAP) / (CELL_SIZE + GRID_GAP));
    let r = Math.floor((height.value - GRID_GAP) / (CELL_SIZE + GRID_GAP))

    nodes = [];

    for(let i = 0; i < c * r; i++)
        nodes.push(new Node());

    Object.assign(graph, new Graph(nodes, r, c))

    column_count.value = c;
    row_count.value = r;
}

function execute_algorithm() {
    let a: Algorithm;

    switch(algo.value) {
        case "dfs":
            a = new DFS(graph, 0);
            break
        default:
            a = new BFS(graph, 0);
    }

    a.run()
}

</script>

<style>
</style>
