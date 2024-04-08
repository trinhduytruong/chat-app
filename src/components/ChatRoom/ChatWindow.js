import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip, Input, Alert } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentSyled = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

//

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);

  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    if (inputValue) {
      addDocument("messages", {
        text: inputValue,
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
      });
      // setInputValue('');
      form.resetFields(["message"]);
    }
  };

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);
  console.log({ messages });

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__description">
                {selectedRoom?.description}
              </span>
            </div>
            <div>
              <ButtonGroupStyled>
                <Button
                  onClick={() => setIsInviteMemberVisible(true)}
                  icon={<UserAddOutlined />}
                  type="text"
                >
                  Mời
                </Button>
                <Avatar.Group size="small" maxCount={2}>
                  {members.map((member) => (
                    <Tooltip key={member?.id} title={member?.displayName}>
                      <Avatar src={member?.photoURL}>
                        {member.photoURL
                          ? ""
                          : member.displayName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </ButtonGroupStyled>
            </div>
          </HeaderStyled>

          <ContentSyled>
            <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  displayName={mes.displayName}
                  photoURL={mes.photoURL}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Nhập tin nhắn ..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button onClick={handleOnSubmit} type="primary">
                Gửi
              </Button>
            </FormStyled>
          </ContentSyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
