import {FlagCfgNode} from "./FlagCfgNode";

export class EndFlagCfgNode extends FlagCfgNode {
    constructor() {
        super("End");
        this.setContent("End");
    }
}