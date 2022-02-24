import { useState } from "react";
import NoImg from "../../assets/non-avatar.png";
const Avatar = ({ userData }) => {
  const [avatar,setAvatar] = useState(userData.photoURL);
  return (<div className="w-28 h-28 flex m-3text-white">
    <img onError={()=>setAvatar(NoImg)}
      className="p-1 rounded-full object-cover border-4"
      src={avatar ?avatar : NoImg}
      alt=""
    />
  </div>)
  
};

export default Avatar;
