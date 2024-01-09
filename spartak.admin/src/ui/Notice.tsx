import { Alert } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { noticeSelector } from "store/notice/noticeSelector";
import styled from "styled-components";

export const Notice = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(noticeSelector);

  return (
    <Container>
      {items.map(({ timeout, ...item }) => {
        timeout && setTimeout(() => dispatch(noticeActions.remove(item.key)), timeout);

        return <Alert type="success" onClose={() => dispatch(noticeActions.remove(item.key))} {...item} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  bottom: 20px;
  left: 50%;
  min-width: 400px;
  max-width: calc(100vw - 300px);
  width: max-content;
  transform: translateX(-50%);

  & > * {
    margin-top: 5px;
  }
`;
