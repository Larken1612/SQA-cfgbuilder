import {NormalCfgNode} from "./NormalCfgNode";
import {Expression} from "ts-morph";

export class ConditionCfgNode extends NormalCfgNode {

    private _astCondition : Expression;

    constructor(condition: Expression) {
        super("super_text");
        this._astCondition = condition;
    }

/*
    getAstCondition(): Expression {
        return this._astCondition;
    }

    setAstCondition(value: Expression) {
        this._astCondition = value;
    }

 */
}
