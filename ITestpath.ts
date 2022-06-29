import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";
import {IcfgNode} from "./IcfgNode";
import {FlagCfgNode} from "./FlagCfgNode";
import {FlagCondition} from "./FlagCondition";

export interface ITestpath {
    setFunctionNode(node: FunctionDeclaration): void;
    push(node: IcfgNode): void;
    pop(): void;
    getElements(): Array<IcfgNode>;
    getFunctionNode(): FunctionDeclaration;
    setFlags(flags: Array<FlagCondition>);
    getFlags(): Array<FlagCondition>;
}