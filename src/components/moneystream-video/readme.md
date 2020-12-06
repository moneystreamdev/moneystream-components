# my-component



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute              | Description | Type     | Default                       |
| ---------------------- | ---------------------- | ----------- | -------- | ----------------------------- |
| `duration`             | `duration`             |             | `string` | `undefined`                   |
| `mediatitle`           | `mediatitle`           |             | `string` | `''`                          |
| `monetizationstrategy` | `monetizationstrategy` |             | `string` | `'required'`                  |
| `moneystreamdisplay`   | `moneystreamdisplay`   |             | `string` | `'show'`                      |
| `payto`                | `payto`                |             | `string` | `'fullcycle@moneybutton.com'` |
| `price`                | `price`                |             | `number` | `undefined`                   |
| `provider`             | `provider`             |             | `string` | `'youtube'`                   |
| `type`                 | `type`                 |             | `string` | `"video/mp4"`                 |
| `vid`                  | `vid`                  |             | `string` | `undefined`                   |


## Dependencies

### Depends on

- [moneystream-watchdog](../moneystream-watchdog)
- [moneystream-dash](../moneystream-dash)
- [moneystream-offer](../moneystream-offer)
- vime-player
- vime-youtube
- vime-vimeo
- vime-video

### Graph
```mermaid
graph TD;
  moneystream-video --> moneystream-watchdog
  moneystream-video --> moneystream-dash
  moneystream-video --> moneystream-offer
  moneystream-video --> vime-player
  moneystream-video --> vime-youtube
  moneystream-video --> vime-vimeo
  moneystream-video --> vime-video
  vime-youtube --> vime-embed
  vime-vimeo --> vime-embed
  vime-video --> vime-file
  style moneystream-video fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
