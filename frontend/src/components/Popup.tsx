import { FC, ReactNode } from 'react';
import { styled } from 'styled-components';
import { Button } from "@chakra-ui/react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <SOverlay>
      <SContent>
        <STitle>{title}</STitle>
        <SBody>{children}</SBody>
        <ButtonGroup>
          <SButton onClick={onClose}>キャンセル</SButton>
          <SButton onClick={onConfirm} colorScheme="red">
            ログアウト
          </SButton>
        </ButtonGroup>
      </SContent>
    </SOverlay>
  );
};

const SOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const STitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const SBody = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  &:hover {
    background-color: #45a049;
  }
`;

export default Popup;
