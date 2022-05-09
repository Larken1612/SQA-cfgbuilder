import {ICFGGeneration} from "./ICFGGeneration";
import {IcfgNode} from "./IcfgNode";
import {
    Block,
    BreakStatement, CommentStatement,
    ContinueStatement, DoStatement,
    Expression, ForInStatement, ForOfStatement, ForStatement,
    FunctionDeclaration,
    IfStatement, IterationStatement, ReturnStatement,
    Statement, SwitchStatement, WhileStatement, WithStatement
} from "ts-morph";
import {ICFG} from "./ICFG";
import {CfgNode} from "./CfgNode";
import {BeginFlagCfgNode} from "./BeginFlagCfgNode";
import {EndFlagCfgNode} from "./EndFlagCfgNode";
import {ScopeCfgNode} from "./ScopeCfgNode";
import {ForwardCfgNode} from "./ForwardCfgNode";
import {Utils} from "./Utils";
import {IfConditionCfgNode} from "./IfConditionCfgNode";
import {ForConditionCfgNode} from "./ForConditionCfgNode";
import {WhileConditionCfgNode} from "./WhileConditionCfgNode";
import {DoConditionCfgNode} from "./DoConditionCfgNode";

export class CfgBuilder implements ICFGGeneration {

    public static readonly IF_FLAG: number = 0;

    public static readonly DO_FLAG: number = 1;

    public static readonly WHILE_FLAG: number = 2;

    public static readonly FOR_FLAG: number = 3;
    private BEGIN?: IcfgNode;
    private END ?: IcfgNode;
    private functionNode: FunctionDeclaration;

    constructor(functionNode: FunctionDeclaration) {
        this.functionNode = functionNode;
        this.parse(this.functionNode);
    }

    private parse(functionNode: FunctionDeclaration): void {
        this.BEGIN = new BeginFlagCfgNode();
        this.END = new EndFlagCfgNode();
        let body = functionNode.getBody();
        if (body instanceof Block) {
            let block: Block = body;
            this.visitBlock(block, this.BEGIN, this.END);
        }
        let statementList: IcfgNode[] = [];
        this.linkStatement(this.BEGIN, statementList);
        //return this.parse(this.functionNode);
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

        for (var i = 1; i < children.length - 1; i++) {
            points[i] = new ForwardCfgNode("Hello");
        }
        for (var i = 0; i < children.length; i++) {
            this.visitStatement(children[i], points[i], points[i + 1]);
        }

        return null;

    }

    private linkStatement(root: IcfgNode, statements: IcfgNode[]) {
        if (root == null || root.isVisited() == true) {
            return;
        }
        root.setVisited(true);
        statements.push(root);
        let tmp: IcfgNode | undefined = root.getTrueNode();
        if (tmp != undefined) {
            let trueStatement: IcfgNode | undefined = this.nextConcrete(tmp);
            root.setTrueNode(trueStatement);
            let check = root.getFalseNode();
            if (check != undefined) {
                let falseStatement: IcfgNode | undefined = this.nextConcrete(check);
                if (falseStatement != undefined && trueStatement != undefined) {
                    root.setFalseNode(falseStatement);// kiem tra
                    this.linkStatement(trueStatement, statements);
                    this.linkStatement(falseStatement, statements);
                }

            }

        }

    }

    // block tiep theo
    private nextConcrete(stmt: IcfgNode): IcfgNode | undefined {
        let check1: IcfgNode | undefined = stmt;
        while (check1 instanceof ForwardCfgNode) {
            let tmp = check1 as ForwardCfgNode;
            check1 = tmp.getTrueNode();
        }
        return check1;
    }

    private visitStatement(statement: Statement | undefined, begin: IcfgNode, end: IcfgNode): void {
        if (statement instanceof IfStatement) {
            //let ifStatement: statement | undefined = IfStatement;
            let condition: Expression = statement.getExpression();
            if (condition == null) {
                console.log("Condition is null");
            } else {
                let thenStmt: Statement = statement.getThenStatement();
                let elseStmt: Statement | undefined = statement.getElseStatement();

                let afterTrue: ForwardCfgNode = new ForwardCfgNode("ForwardCfgNode");
                let afterFalse: ForwardCfgNode = new ForwardCfgNode("Hello");
                /*
                begin.setTrueNode(afterTrue);
                begin.setFalseNode(afterFalse);
                */
                this.visitCondition(condition, begin, afterTrue, afterFalse, CfgBuilder.IF_FLAG);


                this.visitStatement(thenStmt, afterTrue, end);
                this.visitStatement(elseStmt, afterFalse, end);
            }

        } else if (statement instanceof Block) {
            let block: Block = statement;
            this.visitBlock(block, begin, end);

        } else if (statement == null) {
            begin.setBranch(end);
        } else if (statement instanceof BreakStatement) {
            console.log("Break Statement Statement");
        } else if (statement instanceof ContinueStatement) {
            console.log("Continue Statement");
        } else if (statement instanceof WithStatement) {
            console.log("With Statment");
        } else if (statement instanceof SwitchStatement) {
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
        } else if (statement instanceof ReturnStatement) {
            let newNode = new CfgNode(statement.getText());
            begin.setBranch(newNode);
            newNode.setBranch(end);
            console.log("Return statement");
        }
    }

    private visitCondition(condition: Expression, begin: IcfgNode, endTrue: IcfgNode, endFalse: IcfgNode, flag: number): void {
        condition = Utils.shortenASTCondition(condition);
        this.visitShortenCondition(condition, begin, endTrue, endFalse, flag);
    }

    private visitShortenCondition(condition: Expression, begin, endTrue: IcfgNode, endFalse: IcfgNode, flag: number) {
        let conditionCfgNode: IcfgNode = null;
        switch (flag) {
            case CfgBuilder.IF_FLAG:
                conditionCfgNode = new IfConditionCfgNode(condition);
                break;
            case CfgBuilder.FOR_FLAG:
                conditionCfgNode = new ForConditionCfgNode(condition);
                break;
            case CfgBuilder.WHILE_FLAG:
                conditionCfgNode = new WhileConditionCfgNode(condition);
            case CfgBuilder.DO_FLAG:
                conditionCfgNode = new DoConditionCfgNode(condition);
                break;
        }
        begin.setBranch(conditionCfgNode);
        conditionCfgNode.setTrueNode(endTrue);
        conditionCfgNode.setFalseNode(endFalse);
        conditionCfgNode.setContent(condition.getText())
    }

    getFunctionNode(): FunctionDeclaration {
        return this.functionNode;
    };

    setFunctionNode(functionNode: FunctionDeclaration) {
        this.functionNode = functionNode;
    };

    printInfor1(): void {
        let res: IcfgNode | undefined = this.BEGIN;
        while (res != null) {
            console.log(res.getBranch());
            res = res.getTrueNode();
        }
    }

}