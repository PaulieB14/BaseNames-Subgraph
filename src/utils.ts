import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"

export function createEventID(event: ethereum.Event): string {
  return event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
}

export function createDomainID(node: Bytes): string {
  return node.toHexString()
}

export function createResolverID(node: Bytes, resolver: Bytes): string {
  return node.toHexString() + "-" + resolver.toHexString()
}

export function createAccountID(address: Bytes): string {
  return address.toHexString()
}

export function createRegistrationID(labelHash: Bytes): string {
  return labelHash.toHexString()
}

export function createWrappedDomainID(tokenId: BigInt): string {
  return tokenId.toString()
}

export function concat(a: string, b: string): string {
  return a + "-" + b
}

export function byteArrayFromHex(s: string): Bytes {
  if (s.length == 0) {
    return new Bytes(0)
  }
  // Ensure even length
  if (s.length % 2 == 1) {
    s = "0" + s
  }
  let len = s.length / 2
  let result = new Bytes(len)
  for (let i = 0; i < len; i++) {
    result[i] = parseInt(s.substr(i * 2, 2), 16) as u8
  }
  return result
}

export function uint256ToByteArray(i: BigInt): Bytes {
  let hex = i.toHexString()
  // Remove leading "0x"
  hex = hex.substr(2)
  // Ensure even length
  if (hex.length % 2 == 1) {
    hex = "0" + hex
  }
  return byteArrayFromHex(hex)
} 