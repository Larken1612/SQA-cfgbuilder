import {FunctionDeclaration} from "ts-morph";

export interface ICFGGeneration {

    getFunctionNode(): FunctionDeclaration;
    setFunctionNode(functionNode : FunctionDeclaration): void;
}