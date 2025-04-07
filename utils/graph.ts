import Node, { NodeType } from "~/utils/node"

export default class Graph {

    nodes: Node[];
    height: number;
    width: number;
    start: number;
    target: number;

    constructor(nodes: Node[], height: number, width: number) {
        this.nodes = nodes;
        this.height = height;
        this.width = width;
        this.start = 0;
        this.target = 10;
        if(nodes.length > 9) {
            this.nodes[this.start].type = NodeType.START;
            this.nodes[this.target].type = NodeType.END;
        }
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
        let neighbour_index = node_index - this.width;
        if(this.get_node(neighbour_index).type == NodeType.WALL) return undefined;
        return neighbour_index;
    }

    private get_node_right(node_index: number): number | undefined {
        if((node_index + 1) % this.width == 0) return undefined
        let neighbour_index = node_index + 1;
        if(this.get_node(neighbour_index).type == NodeType.WALL) return undefined;
        return neighbour_index;
    }

    private get_node_below(node_index: number): number | undefined {
        if(node_index + this.width >= this.nodes.length) return undefined
        let neighbour_index = node_index + this.width;
        if(this.get_node(neighbour_index).type == NodeType.WALL) return undefined;
        return neighbour_index;
    }

    private get_node_left(node_index: number): number | undefined {
        if(node_index % (this.width) == 0) return undefined
        let neighbour_index = node_index - 1;
        if(this.get_node(neighbour_index).type == NodeType.WALL) return undefined;
        return neighbour_index;
    }

    

}