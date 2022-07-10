import {FunctionDeclaration} from "ts-morph";
import {ICFG} from "./ICFG";

export interface ICFGGeneration {

    generateCFG: () => void;
    getFunctionNode(): FunctionDeclaration;
    setFunctionNode(functionNode : FunctionDeclaration): void;
}