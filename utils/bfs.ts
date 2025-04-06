import type Algorithm from "./algorithm";
import type Graph from "./graph";
// import type Node from "./node";
import Node from "./node";
import type { Reactive } from "vue";

export default class BFS implements Algorithm {
    graph: Reactive<Graph>;
    start: number;

    constructor(graph: Reactive<Graph>, start: number) {
        this.graph = graph;
        this.start = start;
    }

    public async run() {
        let stack: number[] = [];
        let c: number = this.start;

        stack.push(c);

        while(stack.length != 0) {

            let x = stack.shift();

            if(x == undefined) break;

            c = x;

            if(!this.graph.get_node(c).visited)
                this.graph.get_node(c).visited = true;

            let neighbours = this.graph.get_node_neighbours(c);

            for(const neighbour of neighbours) {
                if(!this.graph.get_node(neighbour).visited && !stack.includes(neighbour))
                    stack.push(neighbour)
            }

            await delay(50)

        }
    }
}

async function delay(n: number): Promise<void> {
    return new Promise(res => setTimeout(res, n))
}