import styled from 'styled-components';

type PopoverProps = React.PropsWithChildren<{
  title: string;
  isOpen?: boolean;
}>;

const PopoverWrapper = styled.div`
  position: absolute;
  z-index: 3;
  padding: 16px;
  background: #fff;
  min-width: 376px;
  margin-top: 30px;
  box-shadow: inset 0 -1px 0 0 #bcc3cf, 0 4px 4px 0 rgb(130 146 173 / 16%);
  border: 1px solid #e0e8f8;
  border-radius: 4px;
`;

export const Popover = ({ title, isOpen, children }: PopoverProps) => {
  return isOpen ? (
    <PopoverWrapper>
      <p>{title}</p>
      {children}
    </PopoverWrapper>
  ) : null;
};
