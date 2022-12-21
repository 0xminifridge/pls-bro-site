export function parseWalletAddress(address) {
  if (address) {
    return (
      address.substring(0, 5) + "..." + address.substring(address.length - 4)
    );
  }
  return "";
}
