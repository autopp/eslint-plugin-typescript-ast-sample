/**
 * Copyright (C) 2021 Akira Tanimura (@autopp)
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import { TSESTree, TSESLint } from "@typescript-eslint/experimental-utils"
import { getParserServices } from "@typescript-eslint/experimental-utils/dist/eslint-utils"
import ts from "typescript"

const messageId = "no-boolean-expression-statement"
type MessageIds = typeof messageId

function isBoolean(type: ts.Type): boolean {
  return (type.flags & ts.TypeFlags.BooleanLike) !== 0
}

export const noBooleanExpressionStatement: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    type: "problem",
    messages: {
      "no-boolean-expression-statement": "boolean expression to be checked."
    },
    schema: [],
  },
  create(context: TSESLint.RuleContext<MessageIds, []>) {
    const { program, esTreeNodeToTSNodeMap } = getParserServices(context)
    const checker = program.getTypeChecker()
    return {
      ExpressionStatement(node: TSESTree.ExpressionStatement) {
        const origNode = esTreeNodeToTSNodeMap.get(node.expression)
        const type = checker.getTypeAtLocation(origNode)
        if (isBoolean(type)) {
          context.report({ node, messageId })
        }
      }
    }
  }
}
