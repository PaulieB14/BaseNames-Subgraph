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
  // Add more known domains here
  if (labelhash == "0x117c5db9461f638ca759a2665f70027c66e7c9d57f30ee44fcccfee3cbf97a24") {
    return "crypto"
  }
  if (labelhash == "0x144b03a9f213f42c974de61cf2bc229ea0e45254ceebf5781c95f16cbf14f39") {
    return "base"
  }
  if (labelhash == "0x15076f080cbd80cf843d9a2cda4eb13d43e2357869b1ddf482667acc6740e764") {
    return "eth"
  }
  if (labelhash == "0x15b8f4f8c1df207b5e9e4272b55d90c7a3d5340128f94f90b6b754614e0225bc") {
    return "web3"
  }
  if (labelhash == "0x179a67c04371ed7628228c51fe736f7ed0f636840bc9db9de778344660cbaf43") {
    return "defi"
  }
  if (labelhash == "0x1aa87a0c102aa21722a3268e6f5346638099173c4185b840d23b694901d9d69d") {
    return "nft"
  }
  if (labelhash == "0x1ae665ce4e7e214eb121a426c145630b5c5f6c39c4c0543c413902d3ddc35f96") {
    return "dao"
  }
  if (labelhash == "0x1d55373014d6f653d56ba3e973409bf5236efe4f4664e503545fefef1ded04d6") {
    return "meta"
  }
  if (labelhash == "0x1f74c3719850e81c49867204a7a30b1df1ec03b0b5acc228fd4000886d0d865a") {
    return "game"
  }
  return ""
}
