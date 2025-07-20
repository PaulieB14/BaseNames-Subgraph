import {
  BaseReverseClaimed as BaseReverseClaimedEvent
} from "../generated/ReverseRegistrar/ReverseRegistrar"
import {
  Domain,
  Account
} from "../generated/schema"

export function handleBaseReverseClaimed(event: BaseReverseClaimedEvent): void {
  let account = new Account(event.params.addr.toHex())
  account.save()

  let domain = new Domain(event.params.node.toHex())
  domain.owner = account.id
  domain.save()
}
