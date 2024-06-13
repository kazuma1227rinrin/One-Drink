import { FC, ReactNode } from 'react';
import { styled } from 'styled-components';
import { Button } from "@chakra-ui/react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <SOverlay>
      <SContent>
        {children}
        <ButtonGroup>
          <SButton onClick={onClose}>閉じる</SButton>
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
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SButton = styled(Button)`
  background-color: #FF4B2B;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  &:hover {
    background-color: #FF3C1A;
  }
`;

export default Popup;
