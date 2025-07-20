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
  let account = new Account(event.params.owner.toHex())
  account.save()

  let domain = new Domain(event.params.node.toHex())
  domain.owner = account.id
  domain.subdomainCount = 0
  domain.isMigrated = true
  domain.createdAt = event.block.timestamp
  domain.save()

  let domainEvent = new DomainEvent(createEventID(event.transaction.hash, event.logIndex))
  domainEvent.domain = domain.id
  domainEvent.blockNumber = event.block.number
  domainEvent.blockTimestamp = event.block.timestamp
  domainEvent.transactionHash = event.transaction.hash
  domainEvent.save()
}

export function handleNewResolver(event: NewResolverEvent): void {
  let domain = Domain.load(event.params.node.toHex())
  if (domain == null) {
    domain = new Domain(event.params.node.toHex())
    domain.subdomainCount = 0
    domain.isMigrated = true
    domain.createdAt = event.block.timestamp
  }

  let resolver = new Resolver(event.params.resolver.toHex())
  resolver.domain = domain.id
  resolver.address = event.params.resolver
  resolver.save()

  domain.resolver = resolver.id
  domain.save()

  let domainEvent = new DomainEvent(createEventID(event.transaction.hash, event.logIndex))
  domainEvent.domain = domain.id
  domainEvent.blockNumber = event.block.number
  domainEvent.blockTimestamp = event.block.timestamp
  domainEvent.transactionHash = event.transaction.hash
  domainEvent.save()
}

export function handleNewTTL(event: NewTTLEvent): void {
  let domain = Domain.load(event.params.node.toHex())
  if (domain == null) {
    domain = new Domain(event.params.node.toHex())
    domain.subdomainCount = 0
    domain.isMigrated = true
    domain.createdAt = event.block.timestamp
  }

  domain.ttl = event.params.ttl
  domain.save()

  let domainEvent = new DomainEvent(createEventID(event.transaction.hash, event.logIndex))
  domainEvent.domain = domain.id
  domainEvent.blockNumber = event.block.number
  domainEvent.blockTimestamp = event.block.timestamp
  domainEvent.transactionHash = event.transaction.hash
  domainEvent.save()
}
