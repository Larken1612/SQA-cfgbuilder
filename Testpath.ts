import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";
import {IcfgNode} from "./IcfgNode";
import {FlagCfgNode} from "./FlagCfgNode";
import {ITestpath} from "./ITestpath";
import {FlagCondition} from "./FlagCondition";

export class Testpath implements ITestpath {
    private _cfg: ICFG;
    private _functionNode: FunctionDeclaration;
    private _flags: Array<FlagCondition>;
    private _elements: Array<IcfgNode>;


    push(node: IcfgNode): void {
        if (this._elements == null) {
            this._elements = new Array<IcfgNode>();
            this._elements.push(node);
        } else {
            this._elements.push(node);
        }
    }

    getElements(): Array<IcfgNode> {
        return this._elements;
    }

    getFunctionNode(): FunctionDeclaration {
        return this._functionNode;
    }
    setFunctionNode(value: FunctionDeclaration) {
        this._functionNode = value;
    }
    setFlags(value: Array<FlagCondition>) {
        this._flags = value
    }
}
