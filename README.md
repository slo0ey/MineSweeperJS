# MineSweeperJS
MineSweeper Module for JS

## How to use?

Follow this example

```js
const MineSweeper = require('MineSweeper').MineSweeper();

var ms = new MineSweeper(16, 16, 40);
ms.setMine(); //then ready :)

ms.open(0, 3); //open(1, 4) tile
ms.open(8, 11); //open(9, 12) tile

ms.flag(4, 5); //flagging(5, 6) tile

console.log(ms); //get some info
````

## Credit
DenFade and ```5 idiots```