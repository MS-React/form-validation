import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="navbar bg-light box-shadow">
          <div className="container d-flex justify-content-between">
            <a
              className="navbar-brand d-flex align-items-center text-dark"
              href="#">Directly starter app
            </a>
          </div>
        </div>
      </header>
    );
  }
}
