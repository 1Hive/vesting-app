export * from './Add';
export * from './Redeem';
export * from './Wrap';

export type ModalType = {
  underlyingTokenAddress: string;
  vestedAdress: string;
  address: string;
  closeModal: () => void;
};

export type RedeemType = Omit<ModalType, 'underlyingTokenAddress'>;

export type AddType = Pick<ModalType, 'closeModal'>;

export type WrapType = Pick<ModalType, 'vestedAdress' | 'closeModal' | 'underlyingTokenAddress'>;
