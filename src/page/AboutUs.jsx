import React from "react";
import "../css/AboutUs.css";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="container1">
      <h1 className="bg-color2">About us</h1>
      <br />
      <div className="row">
        <div>
          <h2 className="x2">
            <b>
              We're GarageWorks,
              <br />
              a doorstep service provider
              <br />
              for two wheelers - Convenient,
              <br />
              Transparent, and Cost Effective.
            </b>
          </h2>
        </div>
      </div>
      <br />
      <div className="x1">
        <p>
          Welcome to our garage! We are a team of experienced mechanics who are
          passionate about bikes and helping our customers keep their vehicles
          in top condition. Our mission is to provide high-quality services and
          honest advice at affordable prices.
        </p>
        <p>
          Our services include regular maintenance, repair, and customizations
          of all kinds of bikes. From a simple oil change to a major engine
          overhaul, we've got you covered. We use state-of-the-art equipment and
          technology to diagnose and fix any issues with your bike.
        </p>
        <p>
          At GarageWorks, we are committed to building long-term relationships
          with our clients and ensuring their satisfaction with every visit. Our
          team of experts is always ready to assist you with any questions or
          concerns you may have.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
