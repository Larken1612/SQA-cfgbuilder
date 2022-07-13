import {FlagCfgNode} from "./Nodes/FlagCfgNode";

export class BeginFlagCfgNode extends FlagCfgNode {
    constructor() {
        super("Begin");
        this.setContent("Begin");
    }
}