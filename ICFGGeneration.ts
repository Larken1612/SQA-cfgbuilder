import {FunctionDeclaration} from "ts-morph";
import {ICFG} from "./ICFG";
import {FlagCfgNode} from "./Nodes/FlagCfgNode";
import {Testpath} from "./testpath/Testpath";
import {ITestpath} from "./testpath/ITestpath";
import {FlagCondition} from "./testpath/FlagCondition";

export interface ICFGGeneration {

    generateCFG: () => void;
    getFunctionNode(): FunctionDeclaration;
    setFunctionNode(functionNode : FunctionDeclaration): void;
    traverseCFG: () => void;
}