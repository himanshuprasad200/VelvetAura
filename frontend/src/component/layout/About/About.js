import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';
import PortraitIcon from '@mui/icons-material/Portrait';
const About = () => {
  const visitInstagram = () => {
    window.location = "https://twitter.com/himanshu1902_";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dqzuxurxk/image/upload/v1713088704/avatars/agwroctsqiash7zqajkk.jpg"
              alt="Founder"
            />
            <Typography>Himanshu Prasad</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit X
            </Button>
            <span>
              Welcome to Velvetaura - Your Ultimate Destination for Exquisite
              Fashion and Lifestyle Essentials! At Velvetaura, we believe in
              bringing sophistication, elegance, and style to your fingertips.
              
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://github.com/himanshuprasad200"
              target="blank"
            >
              <GitHubIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://himanshu468.freewebhostmost.com/" target="blank">
              <PortraitIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
