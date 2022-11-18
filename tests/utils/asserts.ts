import React, { ComponentType, isValidElement } from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import { randomTestId } from './fns'

export const assertComponent = <TProps extends Record<string, any>>(Component: ComponentType<TProps>, props: TProps) => {
  it('should create a valid React element', () => {
    const element = React.createElement(Component, props)

    expect(isValidElement(element)).to.be.true
  })

  it('should display the provided className', () => {
    const className = randomTestId()
    const { baseElement } = render(React.createElement(Component, { ...props, className }))
    const element = baseElement.querySelector(`.${className}`)

    expect(element).to.exist
    expect(element!.classList.contains(className)).to.be.true
  })

  it('should be possible to provide a custom style', () => {
    const style = { width: 50 }
    const { baseElement } = render(React.createElement(Component, { ...props, style }))
    const html = baseElement.innerHTML

    expect(html).to.not.be.empty
    expect(html.includes('style="width: 50px;"')).to.be.true
  })
}

export const expectEventOfType = <TEvent extends {}>(target: any, event: TEvent) => {
  expect(target).to.have.property('nativeEvent')
  expect(target.nativeEvent).to.be.instanceOf(event)
}
