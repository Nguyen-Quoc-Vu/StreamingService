const Info = ({ userData }) => (
  <div className="title font-bold text-center">
    <div className="name break-words">{userData.name}</div>
    <div className="add font-semibold text-sm italic dark">
      {userData.email}
    </div>
  </div>
);
export default Info;
