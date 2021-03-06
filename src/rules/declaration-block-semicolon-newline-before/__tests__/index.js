import {
  ruleTester,
  warningFreeBasics
} from "../../../testUtils"
import rule, { ruleName, messages } from ".."

const testRule = ruleTester(rule, ruleName)

testRule("always", tr => {
  warningFreeBasics(tr)

  tr.ok("a { color: pink\n; }")
  tr.ok("a::before { content: \";a\"\n; }")
  tr.ok("a { color: pink\n;top: 0 }")
  tr.ok("a { color: pink\n;top: 0}")
  tr.ok("a { color: pink\r\n;top: 0}", "CRLF")
  tr.ok("a,\nb { color: pink\n;top: 0}", "multi-line rule, multi-line declaration-block")

  tr.notOk("a { color: pink;top: 0 }", {
    message: messages.expectedBefore(),
    line: 1,
    column: 15,
  })
  tr.notOk("a { color: pink ;top: 0 }", {
    message: messages.expectedBefore(),
    line: 1,
    column: 16,
  })
  tr.notOk("a { color: pink  ;top: 0 }", {
    message: messages.expectedBefore(),
    line: 1,
    column: 17,
  })
  tr.notOk("a { color: pink\t;top: 0 }", {
    message: messages.expectedBefore(),
    line: 1,
    column: 16,
  })
})

testRule("always-multi-line", tr => {
  warningFreeBasics(tr)

  tr.ok("a {\ncolor: pink\n; }")
  tr.ok("a::before {\ncontent: \";a\"\n; }")
  tr.ok("a::before {\r\ncontent: \";a\"\r\n; }", "CRLF")
  tr.ok("a {\ncolor: pink\n;top: 0 }")
  tr.ok("a {\ncolor: pink\n;top: 0}")
  tr.ok("a {\r\ncolor: pink\r\n;top: 0}", "CRLF")

  // Ignore single-line
  tr.ok("a { color: pink;top: 0; }")
  tr.ok("a,\nb { color: pink; top: 0}", "multi-line rule, single-line declaration-block")
  tr.ok("a,\r\nb { color: pink; top: 0}", "multi-line rule, single-line declaration-block and CRLF")

  tr.notOk("a {\ncolor: pink;top: 0\n}", {
    message: messages.expectedBeforeMultiLine(),
    line: 2,
    column: 11,
  })
  tr.notOk("a {\ncolor: pink ;top: 0\n}", {
    message: messages.expectedBeforeMultiLine(),
    line: 2,
    column: 12,
  })
  tr.notOk("a {\ncolor: pink  ;top: 0\n}", {
    message: messages.expectedBeforeMultiLine(),
    line: 2,
    column: 13,
  })
  tr.notOk("a {\r\ncolor: pink  ;top: 0\r\n}", {
    message: messages.expectedBeforeMultiLine(),
    line: 2,
    column: 13,
  }, "CRLF")
  tr.notOk("a {\ncolor: pink\t;top: 0\n}", {
    message: messages.expectedBeforeMultiLine(),
    line: 2,
    column: 12,
  })
})

testRule("never-multi-line", tr => {
  warningFreeBasics(tr)

  tr.ok("a {\ncolor: pink;\n}")
  tr.ok("a {\r\ncolor: pink;\r\n}", "CRLF")
  tr.ok("a::before {\ncontent: \";a\";\n}")
  tr.ok("a {\ncolor: pink;\ntop: 0 }")
  tr.ok("a {\ncolor: pink;\ntop: 0}")
  tr.ok("a {\r\ncolor: pink;\r\ntop: 0}", "CRLF")

  // Ignore single-line
  tr.ok("a { color: pink; top: 0; }")
  tr.ok("a,\nb { color: pink ;top: 0}", "multi-line rule, single-line declaration-block")

  tr.notOk("a {\ncolor: pink\n;top: 0\n}", {
    message: messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12,
  })
  tr.notOk("a {\ncolor: pink ;top: 0\n}", {
    message: messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12,
  })
  tr.notOk("a {\r\ncolor: pink ;top: 0\r\n}", {
    message: messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12,
  }, "CRLF")
  tr.notOk("a {\ncolor: pink  ;top: 0\n}", {
    message: messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 13,
  })
  tr.notOk("a {\ncolor: pink\t;top: 0\n}", {
    message: messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12,
  })
  tr.notOk("a {\r\ncolor: pink\t;top: 0\r\n}", {
    message: messages.rejectedBeforeMultiLine(),
    line: 2,
    column: 12,
  }, "CRLF")
})
