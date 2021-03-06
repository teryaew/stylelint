import {
  report,
  ruleMessages,
  styleSearch,
  validateOptions,
  whitespaceChecker
} from "../../utils"

export const ruleName = "function-comma-space-after"

export const messages = ruleMessages(ruleName, {
  expectedAfter: () => `Expected single space after ","`,
  rejectedAfter: () => `Unexpected whitespace after ","`,
})

export default function (expectation) {
  const checker = whitespaceChecker("space", expectation, messages)
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        "always",
        "never",
      ],
    })
    if (!validOptions) { return }

    functionCommaSpaceChecker(checker.after, root, result)
  }
}

export function functionCommaSpaceChecker(checkLocation, root, result) {
  root.walkDecls(decl => {
    const declString = decl.toString()

    styleSearch({ source: declString, target: ",", withinFunctionalNotation: true }, match => {
      checkComma(declString, match.startIndex, decl)
    })
  })

  function checkComma(source, index, node) {
    checkLocation({ source, index, err: m =>
      report({
        message: m,
        node,
        index,
        result,
        ruleName,
      }),
    })
  }
}
