import ContactSelect from "@/components/ContactSelect/ContactSelect";
import FollowBlock from "@/components/FollowBlock/FollowBlock";
import Loader from "@/components/Loader/Loader";
import LanguageContext from "@/context/LanguageContext";
import { useGetContactQuery } from "@/services/api";

import { useState, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function Contact() {
  const { currentLanguage } = useContext(LanguageContext);
  const { data, isLoading } = useGetContactQuery({ language: currentLanguage });
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState("type 1");
  const [message, setMessage] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsNameValid(!!event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailValid(validateEmail(event.target.value));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (isNameValid && isEmailValid) {
      console.log("Form submitted:", { name, email, type, message });
    } else {
      console.log("Form validation failed.");
    }
  };

  return isLoading ? (
    <div className="flex w-full h-[70vh] items-center justify-center">
      <Loader customClass="w-[200px] h-[200px] mx-auto" />
    </div>
  ) : (
    data && (
      <>
        <div
          className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${data.featured_image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="md:-mt-[70px] font-bold text-5xl text-white font-Din">
            {data.title}
          </h2>
        </div>
        <div className="container">
          <div className="md:p-[30px] py-[20px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
            <div className="tb:mr-[50px] w-full font-light text-lg leading-6 font-Din text-[#363636]">
              <p>
                Eget metus sapien nunc aliquet ut id. Quis in facilisi lectus at
                amet. Et viverra sit blandit faucibus mattis laoreet senectus.
                Volutpat varius donec quam posuere ut a platea. Non fermentum
                velit tempus mauris nulla vivamus. Scelerisque mi nunc
                scelerisque orci nisl suspendisse in lectus nibh. Ut varius
                tempus nisl donec et consectetur.
              </p>
              <div className="flex flex-col md:flex-row items-center mt-[30px] gap-[15px] md:gap-[50px]">
                <label className="font-light text-lg leading-6 text-[#040303] w-full md:w-1/3 font-Din pl-[15px]">
                  Name
                  <input
                    className="bg-[#EBEBEB] rounded-[10px] h-[45px] w-full font-Din mt-[10px] outline-none border focus:border-none px-[10px] -ml-[15px]"
                    value={name}
                    onChange={handleNameChange}
                  />
                </label>
                <label className="font-light text-lg leading-6 text-[#040303] w-full md:w-1/3 font-Din pl-[15px]">
                  Email
                  <input
                    className="bg-[#EBEBEB] rounded-[10px] h-[45px] w-full font-Din mt-[10px] outline-none border focus:border-none px-[10px] -ml-[15px]"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
                <div className="font-light text-lg leading-6 text-[#040303] w-full md:w-1/3 font-Din pl-[15px]">
                  Type of Enquiry
                  <ContactSelect setType={setType} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-[15px] md:mt-[50px] gap-[15px] md:gap-[50px]">
                <label className="font-light text-lg leading-6 text-[#040303] w-full md:w-2/3 font-Din pl-[15px]">
                  Message
                  <textarea
                    className="bg-[#EBEBEB] rounded-[10px] w-full font-Din mt-[10px] outline-none border focus:border-none p-[10px] -ml-[15px]"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
                <div className="flex items-center">
                  <ReCAPTCHA sitekey="Your client site key" />
                </div>
              </div>
              <button
                className="bg-[#D0E5F2] font-Din font-normal text-base text-[#002C47] px-[20px] py-[10px] rounded-[10px] transition-all duration-300 hover:bg-[#0071BC] mt-[15px] md:mt-[50px]"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
              <div className="mt-[30px] tb:mt-[0]">
                <FollowBlock />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Contact;