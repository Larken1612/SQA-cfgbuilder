import {BinaryExpression,
    Expression,
    ParenthesizedExpression,
    PrefixUnaryExpression

} from "ts-morph";
import {exp} from "mathjs";
export class Utils {
    public static shortenASTCondition(expression: Expression): Expression {
        let tmp : Expression = expression;
        if(tmp instanceof ParenthesizedExpression) {
            return tmp;
            //check tmp
        } else if(tmp instanceof PrefixUnaryExpression) {
            console.log("Prefix Unary Expression",tmp.getText());
            return tmp;
        }
        return tmp;
    }

    public static shortenParentthesizedExpression(expression: Expression): Expression {
        while(expression instanceof ParenthesizedExpression) {
            let tmp : ParenthesizedExpression = expression;
            expression = tmp.getExpression();
        }
        return expression;
    }
}