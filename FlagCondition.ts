import {ConditionCfgNode} from "./ConditionCfgNode";

export enum Direction {
    FALSE,
    TRUE 
}

export class FlagCondition {
    private _cfgNode: ConditionCfgNode;
    private _flags: Direction;

    constructor(cfgNode: ConditionCfgNode) {
        this._cfgNode = cfgNode;
    }
}