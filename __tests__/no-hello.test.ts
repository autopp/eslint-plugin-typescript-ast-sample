import { noHello } from "../src/no-hello"
import { RuleTester } from "eslint"

const ruleTester = new RuleTester({
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
    { code: 'const x = "hello"', errors: [{ message: '"hello" is not allowed' }] }
  ]
})
