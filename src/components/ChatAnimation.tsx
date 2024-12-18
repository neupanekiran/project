import Logo from "../assets/Logo.png"; 
export function ChatAnimation() {
    return (
      <>
        <div className="chat chat-start bg-inherit flex flex-row items-center align-center rounded-full">
          <div className=" text-white h-10 w-10 rounded-full items-center ">
            <img src={Logo} alt="Danfetea Logo" className="rounded-full w-full h-full object-cover" />
          </div>
          <div className="chat-bubble border-r-2 bg-yellow-400 border-surfacea30">
            <span className="loading loading-dots loading-md text-yellow-500"></span>
          </div>
        </div>
      </>
    );
  }
  