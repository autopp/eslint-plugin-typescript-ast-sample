import { noHello } from "../src/no-hello"
import { TSESLint } from "@typescript-eslint/experimental-utils"

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2015,
  }
})

ruleTester.run("no-hello", noHello, {
  valid: [
    { code: 'const x = 42' }
  ],
  invalid: [
    { code: 'const x = "hello"', errors: [{ messageId: "no-hello" }] }
  ]
})
