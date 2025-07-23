import {
  NewOwner as NewOwnerEvent,
  NewResolver as NewResolverEvent,
  NewTTL as NewTTLEvent
} from "../generated/Registry/Registry"
import {
  Domain,
  Account,
  Resolver,
  DomainEvent
} from "../generated/schema"
import { createEventID } from "./utils"

export function handleNewOwner(event: NewOwnerEvent): void {
  const account = new Account(event.params.owner.toHex())
  account.save()

  const domain = new Domain(event.params.node.toHex())
  domain.owner = account.id
  // For registry domains, we don't have direct access to labelhash
  // The node is the namehash, and labelhash would need to be derived
  // For now, we'll leave it null and it can be populated later if needed
  domain.subdomainCount = 0
  domain.isMigrated = true
  domain.createdAt = event.block.timestamp
  domain.save()

  const domainEvent = new DomainEvent(createEventID(event.transaction.hash, event.logIndex))
  domainEvent.domain = domain.id
  domainEvent.blockNumber = event.block.number
  domainEvent.blockTimestamp = event.block.timestamp
  domainEvent.transactionHash = event.transaction.hash
  domainEvent.save()
}

export function handleNewResolver(event: NewResolverEvent): void {
  const domain = Domain.load(event.params.node.toHex())
  if (domain == null) {
    // Don't create a new domain here since we don't have the owner information
    // The domain should be created by other handlers (NewOwner, NameRegistered, etc.)
    // that have access to the owner information
    return
  }

  const resolver = new Resolver(event.params.resolver.toHex())
  resolver.domain = domain.id
  resolver.address = event.params.resolver
  resolver.save()

  domain.resolver = resolver.id
  domain.save()

  // Note: Resolver events will be handled when resolvers are set up

  const domainEvent = new DomainEvent(createEventID(event.transaction.hash, event.logIndex))
  domainEvent.domain = domain.id
  domainEvent.blockNumber = event.block.number
  domainEvent.blockTimestamp = event.block.timestamp
  domainEvent.transactionHash = event.transaction.hash
  domainEvent.save()
}

export function handleNewTTL(event: NewTTLEvent): void {
  const domain = Domain.load(event.params.node.toHex())
  if (domain == null) {
    // Don't create a new domain here since we don't have the owner information
    // The domain should be created by other handlers (NewOwner, NameRegistered, etc.)
    // that have access to the owner information
    return
  }

  domain.ttl = event.params.ttl
  domain.save()

  const domainEvent = new DomainEvent(createEventID(event.transaction.hash, event.logIndex))
  domainEvent.domain = domain.id
  domainEvent.blockNumber = event.block.number
  domainEvent.blockTimestamp = event.block.timestamp
  domainEvent.transactionHash = event.transaction.hash
  domainEvent.save()
}
