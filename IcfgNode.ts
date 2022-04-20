export interface IcfgNode {
    getContent : () => string;
    setContent: (content: string) => void;
    getId: () => number;
    setId: (id : number) => void;
    setBranch(cfgNode: IcfgNode): void;
    getBranch(): IcfgNode;
    getTrueNode(): IcfgNode;
    setTrueNode(cfgNode: IcfgNode): void;
    getFalseNode(): IcfgNode;
    setFalseNode(cfgNode: IcfgNode): void;
    isVisited(): boolean;
    setVisited(visited: boolean): void;
    getParent(): IcfgNode;
    setParent(parent: IcfgNode): void;
}