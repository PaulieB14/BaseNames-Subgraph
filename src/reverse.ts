import {
  ReverseClaimed as ReverseClaimedEvent
} from "../generated/ReverseRegistrar/ReverseRegistrar"
import {
  Domain,
  Account,
  DomainEvent
} from "../generated/schema"
import { createEventID, createAccountID, createDomainID } from "./utils"

export function handleReverseClaimed(event: ReverseClaimedEvent): void {
  let account = new Account(createAccountID(event.params.addr))
  account.save()

  let domain = new Domain(createDomainID(event.params.node))
  domain.owner = account.id
  domain.save()
} 