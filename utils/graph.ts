import {Node} from "./node.js"

export class Graph {

    private width: number;
    private height: number;
    private nodes: Node[][];

    /**
     * This creates a square graph.
     * @param width The width of the graph. Bound to [10, 100]
     * @param height The height of the graph. Boung to [10, 100]
     */
    constructor(width: number, height: number) {
        // Prevents the graph from being smaller than 10x10 or bigger than 100x100
        this.width = Math.max(10, width);
        this.height = Math.max(10, height);
        this.width = Math.min(100, this.width);
        this.height = Math.min(100, this.height);

        this.nodes = [];

        for(let i = 0; i < this.height; i++) {
            this.nodes.push([]);
            for(let j = 0; j < this.width; j++) {
                this.nodes[i].push(new Node());
            }
        }
    }

    get_nodes(): Node[][] {
        return this.nodes;
    }

}