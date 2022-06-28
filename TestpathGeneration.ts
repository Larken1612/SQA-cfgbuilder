import {ICFG} from "./ICFG";
import {FunctionDeclaration} from "ts-morph";
import {IcfgNode} from "./IcfgNode";
import {FlagCfgNode} from "./FlagCfgNode";
import {Testpath} from "./Testpath";
import {ITestpath} from "./ITestpath";
import {FlagCondition} from "./FlagCondition";
import {IfConditionCfgNode} from "./IfConditionCfgNode";
import {ConditionCfgNode} from "./ConditionCfgNode";

export class TestpathGeneration {
    private _cfg: ICFG;
    private _functionNode: FunctionDeclaration;

    constructor(cfg: ICFG) {
        this._cfg = cfg;
    }


    generateTestpaths(): void {
        TestpathGeneration.logger.log("Starting collect testpaths!!!")
        let beginNode: IcfgNode = this._cfg.getBeginNode();

    }

    traverseCFG(stmt: IcfgNode, testpath: ITestpath, testpathList: Array<ITestpath>, flags: Array<FlagCondition>) {
        testpath.push(stmt);
        if (FlagCfgNode.isEndNode(stmt)) {
            let copyTestpath = new Testpath();
            let copyFlags = new Array<FlagCondition>();
            testpath.getElements().forEach((node: IcfgNode) => {
                copyTestpath.push(node);
            });
            flags.forEach((flag: FlagCondition) => {
                copyFlags.push(flag);
            });
           copyTestpath.setFlags(copyFlags);
           testpathList.push(copyTestpath);
           testpath.pop();
        } else {
            let trueNode: IcfgNode = stmt.getTrueNode();
            let falseNode: IcfgNode = stmt.getFalseNode();

            if(stmt instanceof ConditionCfgNode) {
                if(stmt instanceof IfConditionCfgNode) {
                    let trueFlag = new FlagCondition(stmt, Direction.TRUE);
                    flags.push(trueFlag);
                    this.traverseCFG(trueNode, testpath, testpathList, flags);
                    flags.pop();
                    let flaseFlag = new FlagCondition(stmt, Direction.FALSE);
                    flags.push(falseFlag);
                    this.traverseCFG(falseNode, testpath, testpathList, flags);
                    flags.pop();
                }
            } else {
                this.traverseCFG(trueNode, testpath, testpathList, flags);
            }
            testpath.pop();
        }
    }
}