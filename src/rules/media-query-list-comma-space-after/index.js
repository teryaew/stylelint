import {
  report,
  ruleMessages,
  styleSearch,
  validateOptions,
  whitespaceChecker
} from "../../utils"

export const ruleName = "media-query-list-comma-space-after"

export const messages = ruleMessages(ruleName, {
  expectedAfter: () => `Expected single space after ","`,
  rejectedAfter: () => `Unexpected whitespace after ","`,
  expectedAfterSingleLine: () => `Expected single space after "," in a single-line list`,
  rejectedAfterSingleLine: () => `Unexpected whitespace after "," in a single-line list`,
})

export default function (expectation) {
  const checker = whitespaceChecker("space", expectation, messages)
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        "always",
        "never",
        "always-single-line",
        "never-single-line",
      ],
    })
    if (!validOptions) { return }
    mediaQueryListCommaWhitespaceChecker(checker.after, root, result)
  }
}

export function mediaQueryListCommaWhitespaceChecker(checkLocation, root, result) {
  root.walkAtRules(atRule => {
    const params = atRule.params
    styleSearch({ source: params, target: "," }, match => {
      checkComma(params, match.startIndex, atRule)
    })
  })

  function checkComma(source, index, node) {
    checkLocation({ source, index, err: m =>
      report({
        message: m,
        node,
        index: index + 1 + node.name.length + node.raws.afterName.length,
        result,
        ruleName,
      }),
    })
  }
}
