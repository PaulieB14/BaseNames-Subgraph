# Base Name Service Subgraph

A Graph Protocol subgraph for indexing Base Name Service contracts on Base network.

## Overview

This subgraph tracks domain registrations, transfers, and resolver events for Base Name Service, similar to how the ENS subgraph works for Ethereum mainnet.

## Project Structure

```
base-names/
├── abis/                    # Contract ABIs
│   ├── Registry.json
│   ├── BaseRegistrar.json
│   ├── RegistrarController.json
│   ├── NameWrapper.json
│   ├── L2Resolver.json
│   └── ReverseRegistrar.json
├── src/                     # Mapping files
│   ├── registry.ts         # Registry contract events
│   ├── registrar.ts        # Registrar contract events
│   ├── controller.ts       # Controller contract events
│   ├── wrapper.ts          # NameWrapper contract events
│   ├── resolver.ts         # Resolver contract events
│   ├── reverse.ts          # Reverse registrar events
│   └── utils.ts            # Utility functions
├── schema.graphql          # GraphQL schema
├── subgraph.yaml           # Subgraph manifest
└── README.md              # This file
```

## Entities

### Core Entities
- **Domain**: Represents a domain name with owner, resolver, and metadata
- **Account**: Represents an address that owns domains or registrations
- **Registration**: Represents a domain registration with expiry and cost
- **Resolver**: Represents a resolver contract with address records and metadata
- **WrappedDomain**: Represents ERC-1155 wrapped domains

### Event Entities
- **NameRegistered**: Domain registration events
- **NameRenewed**: Domain renewal events
- **NameTransferred**: Domain transfer events
- **AddrChanged**: Address record changes
- **TextChanged**: Text record changes
- **ContenthashChanged**: Content hash changes
- And many more resolver events...

## Setup

### Prerequisites
- Node.js v20+ (recommended) or v18+ (with warnings)
- Graph CLI: `npm install -g @graphprotocol/graph-cli`

### Installation
```bash
# Install dependencies
npm install

# Generate types
graph codegen

# Build subgraph
graph build
```

## Configuration

### Contract Addresses
⚠️ **IMPORTANT**: The contract addresses in `subgraph.yaml` are currently placeholder addresses. You need to replace them with the actual Base Name Service contract addresses.

Current contract addresses:
- Registry: `0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a` ✅
- BaseRegistrar: `0x0000000000000000000000000000000000000001` ⏳
- RegistrarController: `0x0000000000000000000000000000000000000002` ⏳
- NameWrapper: `0x0000000000000000000000000000000000000003` ⏳
- L2Resolver: `0x0000000000000000000000000000000000000004` ⏳
- ReverseRegistrar: `0x0000000000000000000000000000000000000005` ⏳

### Finding Correct Addresses
1. Check [basescan.org](https://basescan.org) for Base Name Service contracts
2. Look for official Base Name Service documentation
3. Check if Base Name Service is actually deployed on Base
4. Verify contract addresses are on Base network, not Ethereum mainnet

## Deployment

### To Graph Studio (Recommended for testing)
```bash
# Authenticate with Graph Studio
graph auth 197473b84a136c4b515a57659d8f710f

# Deploy to Studio
graph deploy base-names
```

### To Hosted Service
```bash
# Authenticate with hosted service
graph auth https://api.thegraph.com/deploy/ <access-token>

# Deploy
graph deploy --product hosted-service <username>/base-names
```

## Example Queries

Once deployed, you can query the subgraph with GraphQL:

```graphql
# Get all domains
{
  domains {
    id
    name
    labelName
    owner {
      id
    }
    resolver {
      address
    }
  }
}

# Get registrations
{
  registrations {
    id
    labelName
    registrationDate
    expiryDate
    registrant {
      id
    }
  }
}

# Get resolver events
{
  addrChangeds {
    id
    a
    resolver {
      domain {
        name
      }
    }
  }
}
```

## Development

### Adding New Events
1. Add event to the appropriate ABI file
2. Add event handler to `subgraph.yaml`
3. Implement handler in the corresponding mapping file
4. Add entity to `schema.graphql` if needed
5. Run `graph codegen` and `graph build`

### Testing
```bash
# Run tests
npm test

# Test specific mapping
graph test
```

## Troubleshooting

### Node.js Version Issues
If you encounter Node.js version warnings, consider upgrading to Node.js v20+:
```bash
# Using nvm
nvm install 20
nvm use 20
```

### Contract Address Issues
- Ensure addresses are 42 characters (including 0x)
- Verify addresses are on Base network
- Check for hidden characters in addresses

### Build Issues
- Run `graph codegen` before `graph build`
- Check TypeScript errors in mapping files
- Ensure all imported entities exist in schema

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `graph build`
5. Submit a pull request

## License

MIT License

## Resources

- [Graph Protocol Documentation](https://thegraph.com/docs/)
- [ENS Subgraph Reference](https://github.com/ensdomains/ens-subgraph)
- [Base Network Documentation](https://docs.base.org/)
- [Base Block Explorer](https://basescan.org/) 