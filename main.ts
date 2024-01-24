import { Hono } from "https://deno.land/x/hono@v3.12.6/mod.ts";
import { shouldCombine, combineIndex } from "./combine-index.ts";

const urlBase = "https://ncode.syosetu.com";

const app = new Hono({ strict: false });

// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });

app.get("/:ncode{n\\d.+}", async (c, next) => {
  const { ncode } = c.req.param();
  try {
    if (ncode && await shouldCombine(ncode)) {
      return c.html(await combineIndex(ncode));
    }
  } catch (e) { console.warn(e); }
  await next();
});
app.get("*", c => c.redirect(c.req.url.replace(new URL(c.req.url).origin, urlBase)));

export default app;

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  Deno.serve(app.fetch);
}
