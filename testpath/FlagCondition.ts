import {ConditionCfgNode} from "./ConditionCfgNode";

export enum Direction {
    FALSE,
    TRUE 
}

export class FlagCondition {
    private _cfgNode: ConditionCfgNode;
    private _flag: Direction;

    constructor(cfgNode: ConditionCfgNode) {
        this._cfgNode = cfgNode;
    }
    getFlag(): number {
        return this._flag;
    }
    setFlag(value: number) {
        this._flag = value;
    }

    toString():string {
        return this._flag.toString();
    }
}