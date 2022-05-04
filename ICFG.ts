import {IcfgNode} from "./IcfgNode";
import {FunctionDeclaration} from "ts-morph";

export interface ICFG {
    /*
    computerNumberofNode: () => number;

     */
    getAllNodes: () => Array<IcfgNode>;
    //findById: () => IcfgNode;
    getBeginNode: () => IcfgNode;
   // resetVisitedState(): void;
    getFunctionNode(): FunctionDeclaration;
}