import { FaMobileAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsChatDots } from "react-icons/bs";

const Support = () => {
  return (
    <div className="content-container support">
      <h2>In Need of Support?</h2>
      <div className="support-options">
        <div className="mobile">
          <FaMobileAlt size={42} />
          <p>
            Give us a call! <span>(1)-000-000-0000</span>
          </p>
        </div>
        <div className="email">
          <AiOutlineMail size={42} />
          <p>
            Send an email! <span>centurybank@support.com</span>
          </p>
        </div>
        <a href="/">
          <div className="chat">
            <BsPerson size={42} />
            <BsChatDots className="dots" size={28} />

            <p>Chat with a representative!</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Support;
