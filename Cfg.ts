import {Node} from "./Node";
import {ForwardCfgNode} from "./ForwardCfgNode";
import {IcfgNode} from "./IcfgNode";
import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";

export class Cfg implements ICFG {
    private _root: IcfgNode;
    private beginNode: IcfgNode;
    private endNode: IcfgNode;
    private _functionNode: FunctionDeclaration;
    private _statements: Array<IcfgNode>;
/*
    constructor(root?: IcfgNode, beginNode?: IcfgNode, endNode?: IcfgNode) {
        this._root = root;
        this.beginNode = beginNode;
        this.endNode = endNode;
    }

 */

    constructor(beginNode: IcfgNode, functionNode?: FunctionDeclaration) {
       this.beginNode = beginNode;
       this._functionNode = functionNode;
    }

    getBeginNode = (): IcfgNode => {
        return this._root;
    };

    getAllNodes = () => {
        return this._statements;
    };

    getFunctionNode(): FunctionDeclaration {
        return this._functionNode;
    }

    setFunctionNode(value: FunctionDeclaration) {
        this._functionNode = value;
    }

    /*
        printInfor() {
            let tmp : Node | undefined = this.root
            while (tmp != null) {
              console.log(tmp.text);
              tmp = tmp.nextTrue;
            }
        }

     */



    public setRoot(root: IcfgNode): void {
        this._root = root;
    }



}
