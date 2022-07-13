// @ts-ignore
import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";
// @ts-ignore
import {IcfgNode} from "./IcfgNode";
// @ts-ignore
import {FlagCfgNode} from "./FlagCfgNode";
import {FlagCondition} from "./FlagCondition";
import {Testpath} from "./Testpath";

export interface ITestpath {
    setFunctionNode(node: FunctionDeclaration): void;
    push(node: IcfgNode): void;
    pop(): void;
    getElements(): Array<IcfgNode>;
    getFunctionNode(): FunctionDeclaration;
    setFlags(flags: Array<FlagCondition>);
    getFlags(): Array<FlagCondition>;
}