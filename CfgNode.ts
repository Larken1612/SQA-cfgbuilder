import {IcfgNode} from "./IcfgNode";
import {Cfg} from "./Cfg";

/*
khoi tao ten bien va cac constructor
 *//*
export class CfgNode implements IcfgNode {


    private _content: string;
    private _id: number;
    //private _parentNode: IcfgNode;
    private _trueNode: IcfgNode;
    private _falseNode: IcfgNode;
    private _visited: boolean = false;
    private static countnode: number = 0;// gan count node dau tien bang o


    constructor(content?: string) {
        CfgNode.countnode++;
        this._id = CfgNode.countnode;
        this._content = content || "";
    }


    getContent = (): string => {
        return this._content;
    }

    setContent = (content: string) => {
        this._content = content;
    }

    getId = (): number => {
        return this._id;
    }
    setId = (id: number) => {
        this._id = id;
    }

    setBranch(cfgNode: IcfgNode):void {
        this._trueNode = cfgNode;
        this._falseNode = cfgNode;
    }
    getBranch(): IcfgNode {
        return this._trueNode;
        return this._falseNode;
    }

    getParent(): IcfgNode {
        return this._parentNode;
    }
    setParent(value: IcfgNode) {
        this._parentNode = value;
    }

    setTrueNode(value: IcfgNode) {
        this._trueNode = value;
    }

    getTrueNode(): IcfgNode {
        return this._trueNode;
    }

    setFalseNode(value: IcfgNode) {
        this._falseNode = value;
    }

    getFalseNode(): IcfgNode {
        return this._falseNode;
    }
    isVisited(): boolean {
        return this._visited;
    }
    setVisited(value: boolean) {
        this._visited = value;
    }
    public toString = () => {
        return this._content;
    }
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

}*/
////

export class CfgNode implements IcfgNode {
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

    setFalseNode(cfgNode: IcfgNode | undefined): void {
        this._falseNode = cfgNode;
    }

    setTrueNode(cfgNode: IcfgNode | undefined): void {
        this._trueNode = cfgNode;
    }
}
