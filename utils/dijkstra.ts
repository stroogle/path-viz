import type Algorithm from "./algorithm";
import type Graph from "./graph";
// import type Node from "./node";
import Node from "./node";
import type { Reactive } from "vue";

export default class Dijkstra implements Algorithm {
    graph: Reactive<Graph>;
    start: number;
    target: number;
    parent_map: Map<number, number>;

    constructor(graph: Reactive<Graph>) {
        this.graph = graph;
        this.start = this.graph.start;
        this.target = this.graph.target;
        this.parent_map = new Map();
    }
    

    public async highlight_path() {
        if(!this.parent_map.has(this.target))
            return;

        let c = this.target;

        while(this.parent_map.has(c)) {
            this.graph.nodes[c].type = NodeType.PATH;
            console.log(c);
            c = this.parent_map.get(c) as number;
            await delay(50);
        }
    }

    public async run() {
        let stack: number[] = [];
        let c: number = this.start;
        let distances: Map<number, number> = new Map();

        stack.push(c);

        for(let i = 0; i < this.graph.nodes.length; i++)
            distances.set(i, Infinity);

        distances.set(c, 0);

        while(stack.length != 0 && c != this.target) {

            let x = stack.shift();

            if(x == undefined) break;

            c = x;

            if(!this.graph.get_node(c).visited)
                this.graph.get_node(c).visited = true;

            let neighbours = this.graph.get_node_neighbours(c);

            for(const neighbour of neighbours) {
                let tentative_distance = distances.get(c) as number + 1;

                if (tentative_distance < (distances.get(neighbour) as number)) {
                    distances.set(neighbour, tentative_distance);
                    this.parent_map.set(neighbour, c);
                    stack.push(neighbour)
                }
            }

            await delay(50)

        }
    }
}

async function delay(n: number): Promise<void> {
    return new Promise(res => setTimeout(res, n))
}