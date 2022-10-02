// preload page
let origPage = fetch(document.location.href);

// wipe existing page
document.close();
document.open();

// support both non-userscript and @grant unsafeWindow
let _w;
try { _w = unsafeWindow; }
catch { _w = window; }

_w.jsOverload = {
  __steps: [],

  run,
  load: __pusher(load),
  inject: __pusher(inject),
  original: __pusher(original),
};

function __pusher(func) {
  return function(...args) {
    this.__steps.push([func, args]);
    return this;
  }
}

async function run() {
  delete _w.jsOverload;
  for (let [step, args] of this.__steps)
    await step.apply(this, args);
  document.close();
}

async function load(req) {
  if (req instanceof Promise)
    req = await req;
  if (req instanceof Response)
    document.write(await req.text());
  else throw "req is not a reponse";
}

function inject(func) {
  func();
}

function original() {
  this.load(origPage);
}
