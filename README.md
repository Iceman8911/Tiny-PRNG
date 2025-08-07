# Tiny-PRNG

Tiny-PRNG is a tiny (1kb), mathematically correct, Javascript pseudorandom number generator, using the Lehmer / Park-Miller algorithm.

### Usage

```javascript
// Generate a random seed
const seed = Math.floor(Math.random() * (10 ** 12)

// Initialize PRNG with seed.  The seed can be any integer.
const generator = new PRNG(seed)

// Get the next pseudorandom int between 1 and 2147483646
let valueInt = generator.next()

// Get the next pseudorandom float between 0 and 1
let valueFloat = generator.nextFloat()

// Get the next pseudorandom number between 1000 and 9999
let valueBounded = generator.nextBoundedInt(1000, 9999)

// Get the current value of the seed for persistence
const currentSeed = generator.seed
```

#### NPM / Browserify / Webpack

##### Install
```
npm i @iceman8911/tiny-prng
```

##### Import
```javascript
import { PRNG } from 'tiny-prng'
```


#### Browser Script Tag

##### Import
```html
<script src="https://cdn.patricktriest.com/vendor/prng/prng.min.js"></script>
```

You can also view this distribution test at [https://cdn.patricktriest.com/vendor/prng/test/index.html](https://cdn.patricktriest.com/vendor/prng/test/index.html)
