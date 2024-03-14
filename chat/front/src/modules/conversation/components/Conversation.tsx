import { ConversationCard } from "./ConversationCard/ConversationCard";

const conversations = [1, 2, 3];

export const Conversations = () => {
  return conversations.length ? <div>{conversations?.map((el) => <ConversationCard key={el} />)}</div> : <div>нет диалогов</div>;
};
