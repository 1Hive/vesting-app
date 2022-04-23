export * from './Add';
export * from './Redeem';
export * from './Wrap';

export type ModalType = {
  vestedId: string;
  address: string;
  closeModal: () => void;
};

export type RedeemType = ModalType;

export type AddType = Pick<ModalType, 'closeModal'>;

export type WrapType = Pick<ModalType, 'vestedId' | 'closeModal'>;
