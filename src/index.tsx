import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { HelloWorld } from "./HelloWorld";
import { getComposersByPeriods } from "./db/queries/composersByPeriods";
import { dbConnect } from "./db/connect";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => <HelloWorld></HelloWorld>)
  .get("/composers", async () => await getComposersByPeriods(dbConnect()))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
