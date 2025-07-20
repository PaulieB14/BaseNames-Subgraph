import {
  NewOwner as NewOwnerEvent,
  NewResolver as NewResolverEvent,
  NewTTL as NewTTLEvent,
  Transfer as TransferEvent
} from "../generated/Registry/Registry"
import {
  Domain,
  Account,
  Resolver
} from "../generated/schema"
import { createDomainID, createResolverID, createAccountID } from "./utils"

export function handleNewOwner(event: NewOwnerEvent): void {
  let account = new Account(createAccountID(event.params.owner))
  account.save()

  let domain = Domain.load(createDomainID(event.params.node))
  if (domain == null) {
    domain = new Domain(createDomainID(event.params.node))
    domain.subdomainCount = 0
    domain.isMigrated = true
    domain.createdAt = event.block.timestamp
    domain.name = "" // Root domain has no name
  }
  domain.owner = account.id
  domain.save()
}

export function handleNewResolver(event: NewResolverEvent): void {
  let domain = Domain.load(createDomainID(event.params.node))
  if (domain != null) {
    domain.resolver = createResolverID(event.params.node, event.params.resolver)
    domain.save()
  }

  let resolver = new Resolver(createResolverID(event.params.node, event.params.resolver))
  if (domain != null) {
    resolver.domain = domain.id
  }
  resolver.address = event.params.resolver
  resolver.save()
}

export function handleNewTTL(event: NewTTLEvent): void {
  let domain = Domain.load(createDomainID(event.params.node))
  if (domain != null) {
    domain.ttl = event.params.ttl
    domain.save()
  }
}

export function handleTransfer(event: TransferEvent): void {
  let account = new Account(createAccountID(event.params.to))
  account.save()

  // Convert tokenId to bytes for domain ID
  let domainId = event.params.tokenId.toHexString()
  let domain = Domain.load(domainId)
  if (domain != null) {
    domain.owner = account.id
    domain.save()
  }
}
