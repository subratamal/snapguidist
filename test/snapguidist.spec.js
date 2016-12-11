const fs = require('fs-extra')
const snapguidist = require('../src/snapguidist')

beforeEach(() => {
  fs.emptyDirSync('./.snapguidist/__snapshots__')
})

afterAll(() => {
  fs.removeSync('./.snapguidist')
})

test('passes if new', () => {
  const tree = { type: 'div' }
  const result = snapguidist('name', tree)

  expect(result).toEqual({ pass: true })
})

test('fails if the type changes', () => {
  const tree = { type: 'div' }
  snapguidist('name', tree)

  tree.type = 'span'
  const result = snapguidist('name', tree)

  expect(result).toEqual({ actual: '<span />', count: 1, expected: '<div />', pass: false })
})

test('does not fail if update is true', () => {
  const tree = { type: 'div' }
  snapguidist('name', tree)

  tree.type = 'span'
  const update = true
  const result = snapguidist('name', tree, update)

  expect(result).toEqual({ pass: true })
})
