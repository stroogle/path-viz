import Node from "~/utils/node"

export default class Graph {

    nodes: Node[];
    height: number;
    width: number;

    constructor(nodes: Node[], height: number, width: number) {
        this.nodes = nodes;
        this.height = height;
        this.width = width;
    }

    public get_node(node_index: any): Node {
        return this.nodes[node_index];
    }

    public get_node_neighbours(node_index: number): number[] {
        let res: number[] = [];

        let left = this.get_node_left(node_index);
        let down = this.get_node_below(node_index);
        let right = this.get_node_right(node_index);
        let up = this.get_node_above(node_index);

        if(left) res.push(left);
        if(down) res.push(down);
        if(right) res.push(right);
        if(up) res.push(up);

        return res;
    }

    private get_node_above(node_index: number): number | undefined {
        if(node_index - this.width < 0) return undefined
        return node_index - this.width;
    }

    private get_node_right(node_index: number): number | undefined {
        if((node_index + 1) % this.width == 0) return undefined
        return node_index + 1;
    }

    private get_node_below(node_index: number): number | undefined {
        if(node_index + this.width >= this.nodes.length) return undefined
        return node_index + this.width;
    }

    private get_node_left(node_index: number): number | undefined {
        if(node_index % (this.width) == 0) return undefined
        return node_index - 1;
    }

    

}