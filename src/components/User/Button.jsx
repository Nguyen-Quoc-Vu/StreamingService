import {
  acceptFriendRequestOnFirebase,
  addFriendOnFirebase,
  removeFriendOnFirebase,
  unsentFriendRequestOnFirebase,
  DeclineFriendRequestOnFirebase,
} from "../../utils/friend";
import { useDispatch } from "react-redux";
import {
  addToFriendList,
  addToSentRequestList,
  removeFriend,
  removeFromReceivedRequestList,
  removeFromSentRequestList,
} from "../../redux/actions/userData";
import { RELATION } from "../../utils/constant";

const Button = ({ relation, adminUID, userUID }) => {
  const dispatch = useDispatch();

  const onAddFriendClick = async (adminUID, userUID) => {
    try {
      await addFriendOnFirebase(adminUID, userUID);
      dispatch(addToSentRequestList(userUID));
    } catch (e) {
      console.log(e);
    }
  };

  const onAcceptFriendRequest = async (adminUID, receiverUID) => {
    try {
      await acceptFriendRequestOnFirebase(receiverUID, adminUID);
      dispatch(removeFromReceivedRequestList(receiverUID));
      dispatch(addToFriendList(receiverUID));
    } catch (e) {
      console.log(e);
    }
  };

  const onUnsentFriendRequest = async (adminUID, receiverUID) => {
    try {
      await unsentFriendRequestOnFirebase(receiverUID, adminUID);
      dispatch(removeFromSentRequestList(receiverUID));
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveFriendRequest = async (adminUID, senderUID) => {
    try {
      await DeclineFriendRequestOnFirebase(senderUID, adminUID);
      dispatch(removeFromReceivedRequestList(senderUID));
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveFriend = async (adminUID, receiverUID) => {
    try {
      await removeFriendOnFirebase(receiverUID, adminUID);
      dispatch(removeFriend(receiverUID));
    } catch (e) {
      console.log(e);
    }
  };

  switch (relation) {
    case RELATION.FRIEND:
      return (
        <div
          onClick={() => onRemoveFriend(adminUID, userUID)}
          className="w-full bg-red-700 hover:bg-red-600 py-2 text-center rounded-full cursor-pointer"
        >
          Remove friend
        </div>
      );
    case RELATION.SENT_REQUEST:
      return (
        <div
          onClick={() => onUnsentFriendRequest(adminUID, userUID)}
          className="w-full bg-blue-700 hover:bg-blue-600 py-2 text-center rounded-full cursor-pointer"
        >
          Unsent request
        </div>
      );
    case RELATION.REQUEST_RECEIVED:
      return (
        <div className="w-full flex font-semibold gap-2">
          <div
            onClick={() => onAcceptFriendRequest(adminUID, userUID)}
            className="w-1/2 bg-green-700 hover:bg-green-600 py-2 text-center rounded-full cursor-pointer"
          >
            Accept
          </div>
          <div
            onClick={() => onRemoveFriendRequest(adminUID, userUID)}
            className="w-1/2 bg-red-700 hover:bg-red-600 py-2 text-center rounded-full cursor-pointer"
          >
            Remove
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full flex font-semibold gap-2">
          <button
            onClick={() => onAddFriendClick(adminUID, userUID)}
            className="w-full bg-green-700 hover:bg-green-600 py-2 text-center rounded-full cursor-pointer"
          >
            Add friend
          </button>
        </div>
      );
  }
};

export default Button;
