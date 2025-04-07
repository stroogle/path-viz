export enum NodeType {
    WALL,
    OPEN,
    PATH,
    START,
    END
}

export default class Node {
    
    public type: NodeType;
    public visited: boolean;

    constructor() {
        this.type = NodeType.OPEN;
        this.visited = false;
    }

    public set_wall() {
        this.type = NodeType.WALL;
    }

    public mark_visited() {
        this.visited = true;
    }
}