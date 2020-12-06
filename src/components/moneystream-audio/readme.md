# moneystream-audio



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute              | Description | Type     | Default       |
| ---------------------- | ---------------------- | ----------- | -------- | ------------- |
| `duration`             | `duration`             |             | `string` | `undefined`   |
| `mediaType`            | `media-type`           |             | `string` | `'audio/mp3'` |
| `mediatitle`           | `mediatitle`           |             | `string` | `''`          |
| `monetizationstrategy` | `monetizationstrategy` |             | `string` | `'required'`  |
| `moneystreamdisplay`   | `moneystreamdisplay`   |             | `string` | `'show'`      |
| `payto`                | `payto`                |             | `string` | `undefined`   |
| `price`                | `price`                |             | `number` | `undefined`   |
| `src`                  | `src`                  |             | `string` | `undefined`   |


## Dependencies

### Depends on

- [moneystream-watchdog](../moneystream-watchdog)
- [moneystream-dash](../moneystream-dash)
- [moneystream-offer](../moneystream-offer)
- vime-player
- vime-audio

### Graph
```mermaid
graph TD;
  moneystream-audio --> moneystream-watchdog
  moneystream-audio --> moneystream-dash
  moneystream-audio --> moneystream-offer
  moneystream-audio --> vime-player
  moneystream-audio --> vime-audio
  vime-audio --> vime-file
  style moneystream-audio fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
