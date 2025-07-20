import {
  BaseReverseClaimed as BaseReverseClaimedEvent
} from "../generated/ReverseRegistrar/ReverseRegistrar"
import {
  Domain,
  Account,
  ReverseRegistration
} from "../generated/schema"
import { Address } from "@graphprotocol/graph-ts"

export function handleBaseReverseClaimed(event: BaseReverseClaimedEvent): void {
  let account = new Account(event.params.addr.toHex())
  account.save()

  let domain = new Domain(event.params.node.toHex())
  domain.owner = account.id
  domain.subdomainCount = 0
  domain.isMigrated = true
  domain.createdAt = event.block.timestamp
  
  // Set up reverse domain name (e.g., "0x1234...abcd.addr.reverse")
  let addrHex = event.params.addr.toHex()
  let addrShort = addrHex.slice(2, 6) + "..." + addrHex.slice(-4)
  domain.name = addrShort + ".addr.reverse"
  domain.labelName = addrShort
  
  domain.save()

  // Create reverse registration for easy wallet lookup
  let reverseRegistration = new ReverseRegistration(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  reverseRegistration.domain = domain.id
  reverseRegistration.owner = account.id
  reverseRegistration.blockNumber = event.block.number
  reverseRegistration.blockTimestamp = event.block.timestamp
  reverseRegistration.transactionHash = event.transaction.hash
  reverseRegistration.save()
}
