import React from 'react'
import '../css/Service.css'
const Service = () => {
  return (
    <div style={{backgroundImage: ("./images/background(3).jpg")}}>
            <div className="row">
                <h1 style={{fontSize:60,color:"black"}}>Our Services</h1>
            </div>
            <div></div>
            <div className='row-1'>  

            </div>
            <div className="container">
                <div className="box">
                    <h2>01</h2>
                    <h3>Fastest Turn-Around</h3>
                    <p>
Over years we have built a strong network of skilled and verified mechanics to assist you at the earliest</p>
                </div>
                <div className="box">
                    <h2>02</h2>
                    <h3>One of the Top Rated</h3>
                    <p>We are committed towards your safety, and aim at giving the most hassle free experience. </p>
                </div>
                <div className="box">
                    <h2>03</h2>
                    <h3>Bike Tune-up</h3>
                    <p>A comprehensive inspection and adjustment of the bike's key components such as brakes, gears, and wheels to ensure the bike is safe and operates efficiently. </p>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="box">
                    <h2>04</h2>
                    <h3>Bike Fit</h3>
                    <p>A service that ensures the bike is correctly adjusted to fit the rider's body, maximizing comfort and performance.</p>
                </div>
                <div className="box">
                    <h2>05</h2>
                    <h3>Bike Cleaning</h3>
                    <p>A thorough cleaning of the bike, including the frame, wheels, drivetrain, and components, to keep it looking and functioning like new.</p>
                </div>
                <div className="box">
                    <h2>06</h2>
                    <h3>E-Bike Service</h3>
                    <p>Maintenance or repair of electric bike components, such as the battery, motor, and controller</p>
                </div>
            </div>
        </div>
  )
}
export default Service;
