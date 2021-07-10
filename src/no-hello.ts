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

const messageId = "no-hello"
type MessageIds = typeof messageId

export const noHello: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    type: "problem",
    messages: {
      "no-hello": '"hello" is not allowed'
    },
    schema: []
  },
  create(context: TSESLint.RuleContext<MessageIds, []>) {
    return {
      Literal(node: TSESTree.Literal) {
        if (node.value === "hello") {
          context.report({ node, messageId })
        }
      },
      TemplateElement(node: TSESTree.TemplateElement) {
        if (node.value.cooked === "hello") {
          context.report({ node, messageId })
        }
      },
    }
  }
}
