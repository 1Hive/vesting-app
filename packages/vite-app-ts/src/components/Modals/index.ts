export * from './add';
export * from './redeem';
export * from './wrap';

export type ModalType = {
  underlyingTokenAddress: string;
  vestedAdress: string;
  address: string;
};

export type RedeemType = Omit<ModalType, 'underlyingTokenAddress'>;

export type AddType = ModalType;

export type WrapType = Pick<ModalType, 'vestedAdress' | 'underlyingTokenAddress'>;
