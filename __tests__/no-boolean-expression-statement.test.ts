import { noBooleanExpressionStatement } from "../src/no-boolean-expression-statement"
import { TSESLint } from "@typescript-eslint/experimental-utils"
import * as path from "path"

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    tsconfigRootDir: path.resolve(__dirname, "fixture"),
    project: './tsconfig.json',
  },
})

const filename = 'file.ts'

ruleTester.run("no-boolean-expression-statement", noBooleanExpressionStatement, {
  valid: [
    { filename, code: 'let x = 0; x++'  },
    { filename, code: 'function f(): void {}; f()'  },
  ],
  invalid: [
    { filename, code: 'let x = true; !x', errors: [{ messageId: "no-boolean-expression-statement" }] },
    { filename, code: 'function f(): boolean { return true }; f()', errors: [{ messageId: "no-boolean-expression-statement" }] },
  ]
})
