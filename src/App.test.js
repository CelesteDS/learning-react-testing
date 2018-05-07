import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })


/**
 * Factory function to create shallow wrapper for the app component
 * @param  {Object} [props={}]   [description]
 * @param  {Object} [state=null] [description]
 * @return {ShallowWrapper}              [description]
 */
const setup = (props={}, state=null) => {
  const wrapper =  shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
}

/**
 * return shallowWrapper containing node(s) with the given data-test value
 * @param  {ShallowWrapper} wrapper [description]
 * @param  {string} val     [description]
 * @return {ShallowWrappers}         [description]
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without crashing', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
});

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test('clicking buttton increments counter display', () => {
  const counter = 7
  const wrapper = setup(null, { counter })
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  wrapper.update()

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1)
})
