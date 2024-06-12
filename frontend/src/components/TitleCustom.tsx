import React from "react";
import { Tooltip, Icon } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import styled from "styled-components";

export const TitleCustom = () => {
  return (
    <Container>
      <Sp>カスタム編集画面</Sp>
      <Tooltip
        label="ドリンクに対して3つまでカスタム、トッピングを追加することができます。カスタムは後から自由に変更可能！"
        aria-label="カスタム説明"
        hasArrow
      >
        <IconButton>
          <InfoOutlineIcon />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Sp = styled.p`
  font-weight: bold; /* 太字にする */
  font-size: 24px; /* 文字の大きさ */
  text-align: center; /* テキストを中央に配置する */
  margin: 0; /* 上下のマージンをなくす */
  padding: 20px; /* 余白を追加する */
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3182ce; /* アイコンの色 */
  &:hover {
    color: #2b6cb0; /* ホバー時の色 */
  }
`;
