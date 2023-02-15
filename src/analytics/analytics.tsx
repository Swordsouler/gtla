import { DataStore } from "aws-amplify";
import { Action, ActionType } from "../models";

export function performAction(
  type: ActionType,
  userID: string,
  reviewID?: string
) {
  DataStore.save(
    new Action({
      type: type,
      userID: userID,
      reviewID: reviewID,
    })
  );
  console.log("performAction", type, userID, reviewID);
}
