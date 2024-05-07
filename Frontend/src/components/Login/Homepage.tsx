import { useNavigate } from "react-router-dom";
import "./Homepage.css";

import myImage from "./path/to/image.png";

export const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="text-container">
        <br></br>
        <br></br>
        <h1>Our Company Handles All Your Problems and More</h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br> <br></br>
        <h2>Looking to get a Reimbursement?</h2>
        <div>
          <img
            id="dimg_279"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7FujWUT36SqpZcM0ZpuB6rXL7lXVxInbX-Q&s"
            alt="Scammers Spending Money To Promote Fake ..."
          ></img>
        </div>
        <div className="input-container">
          <button className="add-button" onClick={() => navigate("/add")}>
            Get a Reimbursement
          </button>
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Login
          </button>
        </div>
        <h4>
          Welcome to Reims, where we <i>specialize</i> in combating scams and
          securing reimbursements for victims.
        </h4>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>
          <br></br>With the proliferation of online fraud and deceptive
          practices, individuals and businesses often find themselves ensnared
          in schemes designed to exploit their trust and financial resources.
          Our dedicated team of experts is committed to fighting back against
          these injustices, leveraging a combination of industry expertise,
          cutting-edge technology, and relentless determination.
        </p>
        <div>
          <img
            id="dimg_345"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8zpZggc2WpZZx33DhgNyXHP7wbSnOZ9HTjw&s"
            alt="Peer Support | Lincoln Behavioral Services"
          ></img>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>
          Whether you've fallen victim to a phishing scam, fraudulent investment
          scheme, or any other form of deception, we're here to provide
          comprehensive support every step of the way. From investigating the
          intricacies of each case to navigating complex legal frameworks, we
          work tirelessly to recover lost funds and hold perpetrators
          accountable.
        </p>
        <div>
          <img
            id="dimg_313"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROeNMJnUgmRM9Q_C3Iuaezi0Cof-CCZLBT7Q&s"
            alt="Black Money Images - Free Download on ..."
          ></img>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>
          At Reims, we understand the emotional and financial toll of being
          targeted by scams, which is why we prioritize transparency, empathy,
          and personalized solutions for each client. Trust us to be your
          steadfast ally in the battle against fraud, and let us help you
          reclaim what's rightfully yours.
        </p>
      </div>
    </div>
  );
};
