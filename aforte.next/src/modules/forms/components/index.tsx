import { ReactElement } from "react";
import { ChooseLocation } from "./ChooseLocation";
import { OrderCourierDelivery } from "./OrderCourierDelivery";
import { AddComment } from "./AddComment";
import { AddReview } from "./AddReview";
import { AskQuestion } from "./AskQuestion";

interface IProps {
  children: ReactElement;
}

const Forms = ({ children }: IProps) => {
  return <form>{children}</form>;
};

Forms.ChooseLocation = ChooseLocation;
Forms.OrderCourierDelivery = OrderCourierDelivery;
Forms.AddComment = AddComment;
Forms.AddReview = AddReview;
Forms.AskQuestion = AskQuestion;

export { Forms };
