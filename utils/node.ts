type MaybeNode = Node | null;

export enum Direction {
    TOP = 0,
    RIGHT = 1,
    BOTTOM = 2,
    LEFT = 3
}

export class Node {

    /**
     * adjacent_nodes has the follow preconditions:
     * * |adjacent_nodes| = 4
     * * The order of adjacent nodes is stored as [TOP, RIGHT, BOTTOM, LEFT]
     */
    private adjacent_nodes: [MaybeNode, MaybeNode, MaybeNode, MaybeNode];

    constructor() {
        this.adjacent_nodes = [null, null, null, null];
    }

    get_adjacent(direction: Direction): MaybeNode {
        return this.adjacent_nodes[direction]
    }
}