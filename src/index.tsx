import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { helmet } from "elysia-helmet";
import { isHtml } from "@elysiajs/html";
import { HelloWorld } from "./HelloWorld";
import { getComposersByPeriods } from "./db/queries/composersByPeriods";
import { dbConnect } from "./db/connect";

const app = new Elysia()
  .use(helmet())
  .use(staticPlugin())
  .onAfterHandle(({ response, set }) => {
    if (isHtml(response)) {
      set.headers["Cache-Control"] = "max-age:300, private";
      set.headers["Content-Type"] = "text/html; charset=utf8";
    }
  })
  .get("/", () => <HelloWorld></HelloWorld>)
  .get("/composers", async () => await getComposersByPeriods(dbConnect()))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
