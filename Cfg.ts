import {Node} from "./Node";
import {ForwardCfgNode} from "./ForwardCfgNode";
import {IcfgNode} from "./IcfgNode";
import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";

export class Cfg implements ICFG {
    private _root: IcfgNode;
    private beginNode: IcfgNode;
    private endNode: IcfgNode;
    private functionNode: FunctionDeclaration;
    private statements: Array<IcfgNode>;
    constructor(statements: Array<IcfgNode>, functionNode ?: FunctionDeclaration, beginNode?: IcfgNode) {
        this.statements = statements;
        this.functionNode = functionNode;
        this.beginNode = beginNode;
    }
/*
    constructor(root?: IcfgNode, beginNode?: IcfgNode, endNode?: IcfgNode) {
        this._root = root;
        this.beginNode = beginNode;
        this.endNode = endNode;
    }

 */


    getBeginNode = (): IcfgNode => {
        return this._root;
    };

    getAllNodes = () => {
        return this.statements;
    };

    getFunctionNode(): FunctionDeclaration {
        return this.functionNode;
    }

    setFunctionNode(value: FunctionDeclaration) {
        this.functionNode = value;
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


    public getRoot(): IcfgNode {
        return this._root;
    }

    public setRoot(root: IcfgNode): void {
        this._root = root;
    }



}
