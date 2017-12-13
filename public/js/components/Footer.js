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
            <Link to="/"><i className="fa fa-facebook"></i></Link>
                <Link to="/"><i className="fa fa-twitter"></i></Link>
                <Link to="/"><i className="fa fa-instagram"></i></Link>
            </span>
        </p>
    </div>
</footer>
    );
  }
}

export default Footer;
