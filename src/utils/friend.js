//

import {
  getUserData,
  updateFriendList,
  updatePendingFriendRequests,
  updateSentRequests,
} from "../firebase/firebase";

//Add friend features
export const addFriendOnFirebase = async (senderID, receiverID) => {
  const senderData = await getUserData(senderID);
  const receiverData = await getUserData(receiverID);
  const newSenderSentRequests = [...senderData.sentFriendRequests, receiverID];
  const newReceiverPendingRequests = [
    ...receiverData.pendingFriendRequests,
    senderID,
  ];
  updateSentRequests(newSenderSentRequests, senderID);
  updatePendingFriendRequests(newReceiverPendingRequests, receiverID);
};

//Accept request from others
export const acceptFriendRequestOnFirebase = async (senderID, receiverID) => {
  const senderData = await getUserData(senderID);
  const receiverData = await getUserData(receiverID);

  const newSenderSentRequests = senderData.sentFriendRequests.filter(
    (request) => request !== receiverID
  );
  const newReceiverPendingRequests = receiverData.pendingFriendRequests.filter(
    (request) => request !== senderID
  );

  const newSenderFriendList = [...senderData.friends, receiverID];

  const newReceiverFriendList = [...receiverData.friends, senderID];
  updateSentRequests(newSenderSentRequests, senderID);
  updatePendingFriendRequests(newReceiverPendingRequests, receiverID);
  updateFriendList(newSenderFriendList, senderID);
  updateFriendList(newReceiverFriendList, receiverID);
};

//Remove friend
export const removeFriendOnFirebase = async (senderID, receiverID) => {
  const senderData = await getUserData(senderID);
  const receiverData = await getUserData(receiverID);

  const newSenderFriendList = senderData.friends.filter(
    (request) => request !== receiverID
  );
  const newReceiverFriendList = receiverData.friends.filter(
    (request) => request !== senderID
  );

  updateFriendList(newSenderFriendList, senderID);
  updateFriendList(newReceiverFriendList, receiverID);
};

//Remove sent friend request

export const unsentFriendRequestOnFirebase = async (senderID, receiverID) => {
  const senderData = await getUserData(senderID);
  const receiverData = await getUserData(receiverID);

  const newSenderSentRequests = senderData.sentFriendRequests.filter(
    (request) => request !== receiverID
  );
  const newReceiverPendingRequests = receiverData.pendingFriendRequests.filter(
    (request) => request !== senderID
  );

  updateSentRequests(newSenderSentRequests, senderID);
  updatePendingFriendRequests(newReceiverPendingRequests, receiverID);
};

//Decline request from others
export const DeclineFriendRequestOnFirebase = async (senderID, receiverID) => {
  const senderData = await getUserData(senderID);
  const receiverData = await getUserData(receiverID);

  const newSenderSentRequests = senderData.sentFriendRequests.filter(
    (request) => request !== receiverID
  );
  const newReceiverPendingRequests = receiverData.pendingFriendRequests.filter(
    (request) => request !== senderID
  );

  updateSentRequests(newSenderSentRequests, senderID);
  updatePendingFriendRequests(newReceiverPendingRequests, receiverID);
};

export const isFriend = (admin, userUID) => {
  const isFound = admin.friends.find((friendID) => {
    return friendID === userUID;
  });
  return isFound ? true : false;
};

export const hasSentRequest = (admin, userUID) => {
  const isFound = admin.sentFriendRequests.find((uid) => uid === userUID);
  return isFound ? true : false;
};

export const hasReceiveRequest = (admin, userUID) => {
  const isFound = admin.pendingFriendRequests.find((uid) => {
    return uid === userUID;
  });

  return isFound ? true : false;
};
