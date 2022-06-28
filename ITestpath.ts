import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";
import {IcfgNode} from "./IcfgNode";
import {FlagCfgNode} from "./FlagCfgNode";

export interface ITestpath {
    setFunctionNode(node: FunctionDeclaration): void;
    push(node: IcfgNode): void;
    pop(): void;
    getElements(): Array<IcfgNode>;
    getFunctionNode(): FunctionDeclaration;
}