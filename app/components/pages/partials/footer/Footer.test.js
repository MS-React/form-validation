import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

function setup(props) {
  return shallow(<Footer {...props} />);
}

describe('<Footer /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup();
    const linkToGitHub = wrapper.find('.footer__github-link');

    // Assert
    expect(wrapper.find('footer')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(2);
    expect(linkToGitHub).toHaveLength(1);
    expect(linkToGitHub.text()).toBe('GitHub');
  });
});
