import React from "react";
import { Link } from 'react-router-dom';




class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <footer>
    <div className="container">
        <p className="footer-info">© LES COWBOYS
            <span className="social pull-right">
            <a target="_blank" href="https://www.facebook.com"><i className="fa fa-facebook"></i></a>
                <a target="_blank" href="https://www.twitter.com"><i className="fa fa-twitter"></i></a>
                <a target="_blank" href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
            </span>
        </p>
    </div>
</footer>
    );
  }
}

export default Footer;
