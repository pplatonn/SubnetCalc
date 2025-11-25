export interface MaskOption {
  value: string;
  label: string;
  cidr: number;
}

export interface NetworkInfo {
  ip: string;
  mask: string;
  networkAddress: string;
  addressesCount: number;
}
