import {IcfgNode} from "./IcfgNode";

export class Node {
    text: string;
    nextTrue: Node | undefined = undefined;
    nextFalse: Node | undefined = undefined;
    _trueNode: string;
    _falseNode: string;

    constructor(text: string) {
        this.text = text;

    }
    setBranch(next?: Node) {
        this.nextTrue = next;
        this.nextFalse = next;
    }
    getBranch(_trueNode?: string, _falseNode?: string) {
        return this._trueNode;
        return this._falseNode;
    }
}