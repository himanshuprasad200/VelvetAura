import React from "react";
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import './Footer.css'

const footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="plastore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>MultiverseMarket</h1>
        <p>High Quality is our priority</p>
        <p>Copyrights 2024 &copy; All Rights Reserved</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/himanshuprasad200">Github</a>
        <a href="https://twitter.com/himanshu1902_">X</a>
        <a href="">LinkedIn</a> 
      </div>
    </footer>
  );
};

export default footer;
