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

if(sourceFile != undefined) {
    const functionTest: FunctionDeclaration | undefined = sourceFile.getFunction("abs");
    if (functionTest != undefined) {
        let cfg = buildCfg(functionTest);
        cfg.printInfor();
        console.log("Success");
    }
    const _functionNode: FunctionDeclaration | undefined = sourceFile.getFunction("abs");
    if(_functionNode != undefined) {
        let res = cfg1(_functionNode);
        res.printInfor1();
        console.log("Done for visitblock!");

    }

}

// @ts-ignore
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
function cfg1(_functionNode: FunctionDeclaration) : Cfg {
    class cfgBuilder implements ICFGGeneration {

        private _functionNode: FunctionDeclaration;

        constructor(functionNode: FunctionDeclaration) {
            this._functionNode = functionNode;
        }

        private parse(functionNode: FunctionDeclaration) {
            let body = functionNode.getBody();
            if(body instanceof Block) {
                let block: Block = body;
            }
            return this.parse(this._functionNode);
        }

        private visitBlock(block: Block, beginNode: IcfgNode, endNode: IcfgNode) {
            let children: Statement[] = block.getStatements(); // lay ra statements
            if (children.length == 0) {
                beginNode.setBranch(endNode);
                return;
            }
            let scopeIn: CfgNode = ScopeCfgNode.newOpenScope();
            beginNode.setBranch(scopeIn);
            let scopeOut: CfgNode = ScopeCfgNode.newCloseScope(endNode);

            let points: CfgNode[] = new Array(children.length + 1);
            points[0] = scopeIn;
            points[children.length] = scopeOut;

            for(var i = 1; i < children.length; i++) {
                this.visitStatement(children[i], points[i],points[i+1]);
            }

            return null;

        }

        private linkStatement(root:IcfgNode, statements:IcfgNode[]) {
            if(root == null || root.isVisited() == true) {
                return;
            }
            root.setVisited(true);
            statements.push(root);
            let tmp: IcfgNode = root.getTrueNode();
            let trueStatement: IcfgNode = this.nextConcrete(tmp);
            root.setTrueNode(trueStatement);
            let falseStatement: IcfgNode = this.nextConcrete(root.getFalseNode());
            root.setFalseNode(falseStatement);
            this.linkStatement(trueStatement, statements);
            this.linkStatement(falseStatement, statements);
        }
        // block tiep theo
        private nextConcrete(stmt : IcfgNode) {
            while (stmt instanceof ForwardCfgNode) {
                let tmp = stmt as ForwardCfgNode;
                stmt = tmp.getTrueNode();
            }
            return stmt;
        }
        private visitStatement(statement: Statement, begin: IcfgNode, end: IcfgNode): void {
            if(statement instanceof  IfStatement) {
                let ifStatement = statement as IfStatement;
                let condition : Expression = ifStatement.getExpression();
                if(condition == null) {
                    console.log("Condition is null");
                }
                else {
                    let thenStmt: Statement = ifStatement.getThenStatement();
                    let elseStmt: Statement = ifStatement.getElseStatement();

                    let afterTrue: ForwardCfgNode = new ForwardCfgNode();
                    let afterFalse: ForwardCfgNode = new ForwardCfgNode();


                    this.visitStatement(thenStmt,afterTrue, end);
                    this.visitStatement(elseStmt, afterFalse, end);
                }

            } else if (statement instanceof Block) {
                let block: Block = statement;
                this.visitBlock(block, begin,end);

            } else if (statement == null) {
                begin.setBranch(end);
            } else if(statement instanceof BreakStatement) {
                console.log("Break Statement Statement");
            } else if(statement instanceof ContinueStatement) {
                console.log("Continue Statement");
            } else if(statement instanceof WithStatement) {
                console.log("With Statment");
            }else if (statement instanceof SwitchStatement) {
                /*
                let newText = this.convertSwitchStatementToIfStatement(statement);
                console.log("Refactor Switch statement\n", newText);
                let refactorStatement = statement.replaceWithText(newText);
                if (refactorStatement instanceof IfStatement) {
                    this.visitStatement(refactorStatement, begin, end);
                } else {
                    CFGGeneration.logger.error("Can't detect replaced SwitchStatement as If Statements");
                }
                */
            } else if (statement instanceof CommentStatement) {
                console.log("Comment Statement");
            } else if (statement instanceof IterationStatement) {
                console.log("IterationStatement");
                if (statement instanceof ForStatement) {
                    console.log("For statement");
                    begin.setBranch(end);
                } else if (statement instanceof ForInStatement) {
                    console.log("For in statement");
                    begin.setBranch(end);
                } else if (statement instanceof ForOfStatement) {
                    console.log("For Of statement");
                } else if (statement instanceof WhileStatement) {
                    console.log("While Statement");
                } else if (statement instanceof DoStatement) {
                    console.log("Do statement");
                }
            }
        }

        getFunctionNode(): FunctionDeclaration {
            return this._functionNode;
        };

        setFunctionNode(functionNode: FunctionDeclaration) {
            this._functionNode = functionNode;
        };

    }
    return new Cfg(start);
}


//--require ts-node/register