import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"

export function createDomainID(id: BigInt): string {
  return id.toHex();
}

export function createAccountID(address: Address): string {
  return address.toHex();
}

export function createResolverID(node: Bytes, resolver: Address): string {
  return node.toHex() + "-" + resolver.toHex();
}

export function createEventID(event: Bytes, logIndex: BigInt): string {
  return event.toHex() + "-" + logIndex.toString();
}

export function createRegistrationID(id: BigInt): string {
  return id.toHex();
}

// Function to build full domain name
export function buildDomainName(labelName: string, parentName: string): string {
  if (parentName == "") {
    return labelName
  }
  return labelName + "." + parentName
}
