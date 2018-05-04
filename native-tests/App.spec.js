/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../native/App'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.skip('App', () => {
  it('renders without crashing', () => {
    const rendered = render.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  })
})
