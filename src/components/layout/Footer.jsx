import React from "react";
import rxLogo from "../../assets/images/rx.png";
function Footer() {
  return (
    <footer className="footer bg-gradient-to-b from-black to-gray-700 text-base-content p-10">
      <aside>
        <img height="75" width="75" src={rxLogo} className="mt-2 mb-2" />
        <p>
          Rupesh Jha
          <br />
          Made by Passion and love.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
}

export default Footer;
