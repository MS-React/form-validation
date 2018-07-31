import React from 'react';
import './Footer.css';

const Footer = () => {
  const githubRepo = 'https://github.com/makingsensetraining/DirectlyTraining';
  return (
    <footer className="footer">
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Directly starter app in React Redux.
          See this project @ <a className="footer__github-link" href={githubRepo}>GitHub</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
