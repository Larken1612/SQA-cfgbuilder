import {
    Block, BreakStatement, ContinueStatement, Expression,
    ExpressionStatement,
    FunctionDeclaration,
    IfStatement,
    Project, Scope,
    SourceFile, Statement,
    VariableStatement, WithStatement,
    CommentStatement, IterationStatement,
    ForInStatement, SwitchStatement,
    ForStatement, ForOfStatement,
    WhileStatement, DoStatement
} from "ts-morph";
import {Node} from "./Node";
// @ts-ignore
import {Cfg} from "./Cfg";
import {NormalNode} from "./NormalNode";
import {ConditionalNode} from "./ConditionalNode";
import {CfgNode} from "./CfgNode";
import {ScopeCfgNode} from "./ScopeCfgNode";
import {IcfgNode} from "./IcfgNode";
import {ICFG} from "./ICFG";
import {ICFGGeneration} from "./ICFGGeneration";
import {ForwardCfgNode} from "./ForwardCfgNode";
import {EndFlagCfgNode} from "./EndFlagCfgNode";
import * as dotenv from 'dotenv';
import {BeginFlagCfgNode} from "./BeginFlagCfgNode";
import {CfgBuilder} from "./CfgBuilder";

dotenv.config();
if (process.env.tsConfigFilePath) {
    let x = process.env.tsConfigFilePath;
}

const tsConfigPath = "C:\\Users\\Admin\\Downloads\\test-project\\applied-ts-project\\tsconfig.json";
console.log("Start Parsing tsConfigFile...");
const project = new Project({tsConfigFilePath: tsConfigPath});
console.log("Finish Parsing project");


// khai báo 2 node đầu và cuối.
let start = new Node("Start");
let end = new Node("End");

// tạo ra ngoặc  cho hàm

// khai bao

const sourceFile: SourceFile | undefined = project.getSourceFile("Abs.ts");

if (sourceFile != undefined) {
    /*const functionTest: FunctionDeclaration | undefined = sourceFile.getFunction("abs");
    if (functionTest != undefined) {
        let cfg = buildCfg(functionTest);
        cfg.printInfor();
        console.log("Success");
    }*/
    const _functionNode: FunctionDeclaration | undefined = sourceFile.getFunction("abs");
    if (_functionNode != undefined) {
        let cfgbuilder = new CfgBuilder(_functionNode);
        cfgbuilder.printInfor1();
        console.log("Done for visitblock!");

    }

}

// @ts-ignore
/*
function buildCfg(functionAst: FunctionDeclaration): Cfg {

    let body = functionAst.getBody();// lay ra body

    if (body instanceof Block) {// kiem tra body
        let statements = body.getStatements()
        let nodes : Node[] = [];// khai báo mảng rỗng cho nodes
        // @ts-ignore
        statements.forEach(s =>
        {
            let text = s.getText();// lấy ra các text
            if (s instanceof VariableStatement || s instanceof ExpressionStatement) {
                let newNode: NormalNode = new NormalNode(text);
                nodes.push(newNode);
            }
            else if (s instanceof IfStatement) {
                let newNode: ConditionalNode = new ConditionalNode(text);
                nodes.push(newNode);
            }
        })

        start.setBranch(nodes[0])// trỏ đến node tiếp theo
        for (var i = 0; i < nodes.length - 1; i++) { // chỉ lặp tới nodes.length-1
            nodes[i].setBranch(nodes[i + 1]);
        }

        nodes[nodes.length - 1].setBranch(end);// gán nốt end
    }

    return new Cfg(start);// trả về node start
}


 */




//--require ts-node/register