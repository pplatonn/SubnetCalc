/* eslint-disable prettier/prettier */
export function getNetworkAddress(ip: string, mask: string): string {
  const ipOctets = ip.split('.').map(Number);
  const maskOctets = mask.split('.').map(Number);
  const result: number[] = [];

  for (let i = 0; i < 4; i++) {
    result.push(ipOctets[i] & maskOctets[i]);
  }

  return result.join('.');
}

export function getAddressesCount(mask: string): number {
  let binaryMask = '';

  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0');
  }
  const zeros = 32 - binaryMask.replace(/0/g, '').length;

  if (zeros === 0) return 1;
  if (zeros === 1) return 2;

  return Math.pow(2, zeros) - 2;
}
