# jsOverload
Page Injection Library for JavaScript

# Usage
```js
// @require     https://cdn.jsdelivr.net/gh/4675BBD614B6/jsOverload/index.min.js
```

# Examples

Run a function before and after loading the page
```js
await jsOverload.inject(beforeLoad).original().inject(afterLoad).run();
```

Load a completely unrelated page (CORS applies)
```js
await jsOverload.load(fetch("https://example.com")).run();
```

# Notes
- The `run` function returns a promise; either `.then` or `await` can be used.
- jsOverload removes itself from `window` after `run` is called.
- This should work outside of a user script.
- `@run-at document-start` should be used.
