import test from "tape"
import sinon from "sinon"
import report from "../report"

test("without disabledRanges", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
    },
    message: "bar",
    node: {},
  }
  report(v)
  const spyArgs = v.result.warn.args[0]
  t.equal(spyArgs[0], "bar")
  t.equal(spyArgs[1].node, v.node)
  t.end()
})

test("with irrelevant general disabledRange", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
      disabledRanges: [
        { start: 5, end: 8 },
      ],
    },
    message: "bar",
    node: {
      source: { start: { line: 2 } },
    },
  }
  report(v)
  const spyArgs = v.result.warn.args[0]
  t.equal(spyArgs[0], "bar")
  t.equal(spyArgs[1].node, v.node)
  t.end()
})

test("with relevant general disabledRange", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
      disabledRanges: [
        { start: 5, end: 8 },
      ],
    },
    message: "bar",
    node: {
      source: { start: { line: 6 } },
    },
  }
  report(v)
  t.notOk(v.result.warn.called)
  t.end()
})

test("with irrelevant rule-specific disabledRange", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
      disabledRanges: [
        { start: 5, end: 8, rules: ["bar"] },
      ],
    },
    message: "bar",
    node: {
      source: { start: { line: 6 } },
    },
  }
  report(v)
  const spyArgs = v.result.warn.args[0]
  t.equal(spyArgs[0], "bar")
  t.equal(spyArgs[1].node, v.node)
  t.end()
})

test("with relevant rule-specific disabledRange", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
      disabledRanges: [
        { start: 5, end: 8, rules: ["foo"] },
      ],
    },
    message: "bar",
    node: {
      source: { start: { line: 6 } },
    },
  }
  report(v)
  t.notOk(v.result.warn.called)
  t.end()
})

test("with relevant general disabledRange, among others", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
      disabledRanges: [
        { start: 1, end: 3 },
        { start: 5, end: 8 },
      ],
    },
    message: "bar",
    node: {
      source: { start: { line: 6 } },
    },
  }
  report(v)
  t.notOk(v.result.warn.called)
  t.end()
})

test("with relevant rule-specific disabledRange, among others", t => {
  const v = {
    ruleName: "foo",
    result: {
      warn: sinon.spy(),
      disabledRanges: [
        { start: 1, end: 3, rules: ["foo"] },
        { start: 5, end: 8, rules: ["foo"] },
      ],
    },
    message: "bar",
    node: {
      source: { start: { line: 6 } },
    },
  }
  report(v)
  t.notOk(v.result.warn.called)
  t.end()
})
