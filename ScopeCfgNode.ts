import {CfgNode} from "./CfgNode";
import {IcfgNode} from "./IcfgNode";

export class ScopeCfgNode extends CfgNode {
   // public static logger = new MyLogger("ScopeCfgNode");

    constructor(content: string) {
        super(content);
    }

    public static readonly OPEN_SCOPE: string = "{";
    public static readonly CLOSE_SCOPE: string = "}";

    public static newOpenScope(...branch: Array<IcfgNode>): ScopeCfgNode {
        let openScope: ScopeCfgNode = new ScopeCfgNode(this.OPEN_SCOPE);
        if(branch.length == 1) {
            openScope.setBranch(branch[0]);
        } else if (branch.length > 1) {
           // ScopeCfgNode.logger.error("nhanh tiep theo cua Openscope phai lon hon 1!");
            console.log("nhanh tiep theo cya Open scope phai lon hon 1")
        }
        return openScope;
    }

    public static newCloseScope(...branch: Array<IcfgNode>): ScopeCfgNode {
        let closeScope: ScopeCfgNode = new ScopeCfgNode(this.CLOSE_SCOPE);
        if(branch.length == 1) {
            closeScope.setBranch(branch[0]);
        } else if (branch.length > 1) {
            throw Error ("nhanh tiep theo cua Openscope phai lon hon 1!");
        }
        return closeScope;
    }

}