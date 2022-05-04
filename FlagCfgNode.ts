import {CfgNode} from "./CfgNode";
import {IcfgNode} from "./IcfgNode";

export class FlagCfgNode extends CfgNode {
    public static BEGIN_FLAG: string = "Begin";
    public static END_FLAG: string = "End";

    static createBeginFlagCfgNode = (): FlagCfgNode => {
        return new FlagCfgNode(FlagCfgNode.BEGIN_FLAG);
    }
    static createEndFlagCfgNode = (): FlagCfgNode => {
        return new FlagCfgNode(FlagCfgNode.END_FLAG);
    }
    static isBeginNode = (cfgNode: IcfgNode): boolean => {
        if(cfgNode instanceof FlagCfgNode && cfgNode.getContent() == "Begin")
            return true;
        else return false;
    }

    static isEndNode = (cfgNode: IcfgNode):boolean =>{
        if(cfgNode instanceof  FlagCfgNode && cfgNode.getContent() == "End")
            return true;
        else return false;
    }
}