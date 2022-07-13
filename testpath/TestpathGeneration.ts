import {ICFG} from "../ICFG";
import {FunctionDeclaration} from "ts-morph";
import {IcfgNode} from "../Nodes/IcfgNode";
import {FlagCfgNode} from "../Nodes/FlagCfgNode";
import {Testpath} from "./Testpath";
import {ITestpath} from "./ITestpath";
import {FlagCondition} from "../testpath/FlagCondition";
import {IfConditionCfgNode} from "../Nodes/IfConditionCfgNode";
import {ConditionCfgNode} from "../Nodes/ConditionCfgNode";
import {ITestpathGeneration} from "./ITestpathGeneration";

export class TestpathGeneration implements ITestpathGeneration {
    private cfg: ICFG;
    private _testpaths: Testpath;


    constructor(cfg: ICFG) {
        this.cfg = cfg;
    }


    generateTestpaths(): void {
        let testpaths: Array<Testpath> = new Array();
        let beginNode: IcfgNode = this.cfg.getBeginNode();
        let initialTestpath: Testpath = new Testpath();
        initialTestpath.setFunctionNode(this.cfg.getFunctionNode());
        this.traverseCFG(beginNode, initialTestpath, testpaths, new Array<FlagCondition>());

        for (var i = 0; i< testpaths.length; i++) {
            let tmp: ITestpath = testpaths[i];
            tmp.setFunctionNode(this.cfg.getFunctionNode());
        }


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
                    let trueFlag = new FlagCondition(stmt);
                    flags.push(trueFlag);
                    this.traverseCFG(trueNode, testpath, testpathList, flags);
                    flags.pop();
                    let falseFlag = new FlagCondition(stmt);
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
/*
    getPossibleTestpaths(): Array<ITestpath> {
        return undefined;
    }

 */
}