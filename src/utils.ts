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

// Known domain names for testing (simplified for AssemblyScript)
export function getKnownDomainName(labelhash: string): string {
  // Simple if-else approach for AssemblyScript compatibility
  if (labelhash == "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658") {
    return "test"
  }
  if (labelhash == "0x12196ae91af2712490e94125687426721cc734ddf72e070c27e161f23123fcbc") {
    return "example"
  }
  return ""
}
