import {ICFG} from "./ICFG";

export interface IcfgNode {
    getContent : () => string;
    setContent: (content: string) => void;
    //getId: () => number;
    //setId: (id : number) => void;
    setBranch(cfgNode: IcfgNode): void;
    getBranch(): IcfgNode | undefined;
    getTrueNode(): IcfgNode | undefined;
    setTrueNode(cfgNode: IcfgNode | undefined):  void;
    getFalseNode(): IcfgNode | undefined;
    setFalseNode(cfgNode: IcfgNode | undefined): void;
    isVisited(): boolean;
    setVisited(visited: boolean): void;
   // getParent(): IcfgNode;
    //setParent(parent: IcfgNode): void;
}