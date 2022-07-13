import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";
import {IcfgNode} from "./IcfgNode";
import {FlagCfgNode} from "./FlagCfgNode";
import {ITestpath} from "./ITestpath";
import {FlagCondition} from "./FlagCondition";

export class Testpath implements ITestpath {
    private cfg: ICFG;
    private functionNode: FunctionDeclaration;
    private flags: Array<FlagCondition>;
    private elements: Array<IcfgNode>;


    push(node: IcfgNode): void {
        if (this.elements == null) {
            this.elements = new Array<IcfgNode>();
            this.elements.push(node);
        } else {
            this.elements.push(node);
        }
    }

    getElements(): Array<IcfgNode> {
        return this.elements;
    }

    getFunctionNode(): FunctionDeclaration {
        return this.functionNode;
    }
    setFunctionNode(value: FunctionDeclaration) {
        this.functionNode = value;
    }
    setFlags(value: Array<FlagCondition>) {
        this.flags = value
    }

    getFlags(): Array<FlagCondition> {
        return undefined;
    }

    pop(): void {
    }
}
