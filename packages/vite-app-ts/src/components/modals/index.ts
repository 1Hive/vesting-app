export * from './add-form';
export * from './redeem-form';
export * from './wrap-form';

export type ModalType = {
  underlyingTokenAddress: string;
  vestedAdress: string;
  address: string;
};

export type RedeemType = Omit<ModalType, 'underlyingTokenAddress'>;

export type AddType = ModalType;

export type WrapType = Pick<ModalType, 'vestedAdress' | 'underlyingTokenAddress'>;
