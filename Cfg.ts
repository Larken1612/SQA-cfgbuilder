import {Node} from "./Node";
import {ForwardCfgNode} from "./ForwardCfgNode";

export class Cfg {
    root: Node;
    beginNode: Node;
    endNode: Node;

    constructor(root: Node, beginNode?: Node, endNode?: Node, _trueNode?: string, _falseNode?: string) {
        this.root = root;
        this.beginNode = beginNode;
        this.endNode = endNode;
    }

    printInfor() {
        let tmp : Node | undefined = this.root
        while (tmp != null) {
          console.log(tmp.text);
          tmp = tmp.nextTrue;
        }
    }

    printInfor1() {
        let res : Node | undefined = this.root
        while(res != null) {
            console.log(res.getBranch());
            res = res.nextTrue;
        }
    }


}