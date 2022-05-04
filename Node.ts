import {IcfgNode} from "./IcfgNode";

export class Node implements IcfgNode {
    text: string;
    _trueNode: IcfgNode | undefined = undefined;
    _falseNode: IcfgNode | undefined = undefined;
    _isVisited: boolean = false;

    isVisited(): boolean {
        return this._isVisited;
    }

    setVisited(visited: boolean) {
        this._isVisited = visited;
    }

    constructor(text: string) {
        this.text = text;

    }
    setBranch(next?: IcfgNode) {
        this._trueNode = next;
        this._falseNode = next;
    }
    getBranch() {
        return this._trueNode;
    }

    getContent(): string {
        return "";
    }

    setContent(content: string): void {
    }

    getFalseNode(): IcfgNode | undefined {
        return this._falseNode;
    }

    getTrueNode(): IcfgNode | undefined {
        return this._trueNode;
    }

    setFalseNode(cfgNode: IcfgNode): void {
        this._falseNode = cfgNode;
    }

    setTrueNode(cfgNode: IcfgNode): void {
        this._trueNode = cfgNode;
    }

}