import {
  report,
  ruleMessages,
  styleSearch,
  validateOptions
} from "../../utils"

export const ruleName = "color-no-invalid-hex"

export const messages = ruleMessages(ruleName, {
  rejected: c => `Unexpected invalid hex color "${c}"`,
})

export default function (actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual })
    if (!validOptions) { return }

    root.walkDecls(decl => {
      const declString = decl.toString()

      styleSearch({ source: declString, target: "#" }, match => {

        const hexValue = /^#[0-9A-Za-z]+/.exec(declString.substr(match.startIndex))[0]

        if (!/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hexValue)) {
          report({
            message: messages.rejected(hexValue),
            node: decl,
            index: match.startIndex,
            result,
            ruleName,
          })
        }
      })
    })
  }
}
