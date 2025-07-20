# Base Name Service Subgraph

A Graph Protocol subgraph for indexing Base Name Service contracts on Base network.

## Overview

This subgraph tracks domain registrations, transfers, and resolver events for Base Name Service, similar to 
how the ENS subgraph works for Ethereum mainnet.

## Project Structure

```
base-names/
├── abis/                    # Contract ABIs
│   ├── Registry.json
│   ├── BaseRegistrar.json
│   ├── RegistrarController.json
│   ├── L2Resolver.json
│   └── ReverseRegistrar.json
├── src/                     # Mapping files
│   ├── registry.ts         # Registry contract events
│   ├── registrar.ts        # Registrar contract events
│   ├── controller.ts       # Controller contract events
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

### Contract Addresses (Base Mainnet)
The subgraph is configured with the official Base Name Service contract addresses:

- **Registry**: `0xb94704422c2a1e396835a571837aa5ae53285a95`
- **BaseRegistrar**: `0x03c4738ee98ae44591e1a4a4f3cab6641d95dd9a`
- **RegistrarController**: `0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5`
- **Launch Price Oracle**: `0xd53b558e1f07289acedf028d226974abba258312`
- **Price Oracle**: `0x508CFE43aa84b8048cB6d39037cE0dc96d8aDc75`
- **ReverseRegistrar**: `0x79ea96012eea67a83431f1701b3dff7e37f9e282`
- **L2Resolver**: `0xC6d566A56A1aFf6508b41f6c90ff131615583BCD`

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

## Live Deployment

The subgraph is currently deployed and live:

- **Studio URL**: https://thegraph.com/studio/subgraph/base-names
- **Query Endpoint**: https://api.studio.thegraph.com/query/111767/base-names/0.11
- **Current Version**: 0.11

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
- [Base Name Service](https://basenames.domains/)
