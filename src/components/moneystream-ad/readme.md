# moneystream-ad



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type     | Default |
| ------------ | ------------ | ----------- | -------- | ------- |
| `duration`   | `duration`   |             | `string` | `''`    |
| `mediatitle` | `mediatitle` |             | `string` | `''`    |
| `price`      | `price`      |             | `number` | `0`     |
| `vid`        | `vid`        |             | `string` | `''`    |


## Dependencies

### Depends on

- [moneystream-dash](../moneystream-dash)
- [moneystream-offer](../moneystream-offer)
- vime-player
- vime-youtube

### Graph
```mermaid
graph TD;
  moneystream-ad --> moneystream-dash
  moneystream-ad --> moneystream-offer
  moneystream-ad --> vime-player
  moneystream-ad --> vime-youtube
  vime-youtube --> vime-embed
  style moneystream-ad fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
