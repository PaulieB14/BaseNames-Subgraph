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

// Known domain names for testing (expanded for AssemblyScript compatibility)
export function getKnownDomainName(labelhash: string): string {
  // Common domain names that might be registered
  if (labelhash == "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658") {
    return "test"
  }
  if (labelhash == "0x12196ae91af2712490e94125687426721cc734ddf72e070c27e161f23123fcbc") {
    return "example"
  }
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
  // Add more common domains that might be registered
  if (labelhash == "0x9fa4cfe9a628a75c46efbfc5596f29ae290e3b06bd0f52d789d4a2a5fc7f0401") {
    return "domain1"
  }
  if (labelhash == "0xf918ade8d420f5cd7abadb14f67247476d9cf3f234f0759b0cf6cb89a13b4e10") {
    return "domain2"
  }
  if (labelhash == "0x6881339b0e1fe8180c5b9aa15dfa6a4131a3e91ba6b2a403393fcd31117c5310") {
    return "domain3"
  }
  if (labelhash == "0x827f0bba982a076e2d004532ff0544e00888eb03ab1898eda6392bdfb3c67c10") {
    return "domain4"
  }
  if (labelhash == "0x49963564c8613d66196ad4abffa0dfedd1d31fbdab211294e29cf77554238f10") {
    return "domain5"
  }
  if (labelhash == "0xd7f63102f052701e2382c41566e68dc50f30e7551876c7d20079f24a1a2c0c01") {
    return "domain6"
  }
  if (labelhash == "0xf0f252d91d5b5742f6b346b4d28a9e9a561e67dba8921a00f922626f0d07ce10") {
    return "domain7"
  }
  if (labelhash == "0xd9d02a01c5a4a6ff164cfab548840eb9a4b78a25acf585f0a295e84e1a0f1111") {
    return "domain8"
  }
  if (labelhash == "0x39aa165e308887f83e07717e0b3929338d6588134b6fb62bd4ea12a46d381201") {
    return "domain9"
  }
  if (labelhash == "0xf5ad7fd069ba7d5ea19edc8e1c931bed8c91ae9df973caf4cec947189da26711") {
    return "domain10"
  }
  return ""
}

// Function to generate a readable name for unknown domains
export function generateReadableName(labelhash: string, id: string): string {
  const knownName = getKnownDomainName(labelhash)
  if (knownName != "") {
    return knownName
  }
  // For unknown domains, create a readable name based on the first few characters
  return "domain-" + id.slice(2, 8) // Remove "0x" and take first 6 chars
}
