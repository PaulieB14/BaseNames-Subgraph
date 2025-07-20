import {
  NewOwner as NewOwnerEvent,
  NewResolver as NewResolverEvent,
  NewTTL as NewTTLEvent,
  Transfer as TransferEvent
} from "../generated/Registry/Registry"
import {
  Domain,
  Account,
  Resolver,
  DomainEvent
} from "../generated/schema"
import { createEventID, createDomainID, createResolverID, createAccountID } from "./utils"

export function handleNewOwner(event: NewOwnerEvent): void {
  let account = new Account(createAccountID(event.params.owner))
  account.save()

  let domain = new Domain(createDomainID(event.params.node))
  if (domain.labelName == null) {
    domain.labelName = event.params.label.toHexString()
  }
  domain.owner = account.id
  domain.parent = createDomainID(event.params.label)
  domain.save()

  let parent = Domain.load(createDomainID(event.params.label))
  if (parent != null) {
    parent.subdomainCount = parent.subdomainCount + 1
    parent.save()
  }
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
  let account = new Account(createAccountID(event.params.owner))
  account.save()

  let domain = Domain.load(createDomainID(event.params.node))
  if (domain != null) {
    domain.owner = account.id
    domain.save()
  }
}
