<template>
    <div class="flex gap-4 h-full">
        <div class="flex-grow h-full bg-background rounded-md shadow-lg p-4 flex flex-col">
            <GridDisplay
                :v-if="column_count * row_count > 0"
                :column_count="column_count"
                :row_count="row_count"
                :cell_size="CELL_SIZE"
                :gap_size="GRID_GAP"
                ref="grid_display"
            >  
                <Cell
                    v-for="(node, i) in graph.nodes"
                    :key="i"
                    :type="node.type"
                    :visited="node.visited"
                    @click="use_tool(i)"
                    @click.right.prevent="() => {
                        graph.nodes[i].type = NodeType.WALL;
                    }"
                />
            </GridDisplay>
        </div>
        <div class="max-w-[300px] w-1/4 bg-background h-full flex gap-4 flex-col p-4 rounded-md shadow-lg">
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
                    <SelectItem value="dij">
                    Dijkstra's Search
                    </SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
            <Label for="controls">Playback Controls</Label>
            <Button id="controls" @click="() => {
                execute_algorithm();
            }">
                <Icon icon="fe:play" />
                Run
            </Button>
            <Button @click="() => {
                reset_graph();
            }">
                <Icon icon="fe:loop" />
                Reset Grid
            </Button>
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
import Dijkstra from "~/utils/dijkstra";
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

async function execute_algorithm() {
    let a: Algorithm;

    switch(algo.value) {
        case "dfs":
            a = new DFS(graph);
            break
        case "dij":
            a = new Dijkstra(graph);
        default:
            a = new BFS(graph);
    }

    await a.run();

    a.highlight_path();
}

function use_tool(n: number) {
    graph.nodes[graph.target].type = NodeType.OPEN;
    graph.target = n;
    graph.nodes[graph.target].type = NodeType.END;
}

</script>

<style>

body {
    overflow: hidden;
}

</style>
