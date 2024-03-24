import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { helmet } from "elysia-helmet";
import { isHtml } from "@elysiajs/html";
import { IndexPage } from "./pages/IndexPage";
import { dbConnect } from "./db/connect";
import { ComposerPage } from "./pages/ComposerPage";
import { WorkPage } from "./pages/WorkPage";
import { searchComposers } from "./db/queries/searchComposers";

const app = new Elysia()
  .use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: [Bun.env.IMAGES_URL, "'self'", "data:"],
          scriptSrcElem: ["'self'", "http://localhost:5173/"],
          connectSrc: ["'self'", "ws://localhost:5173/"],
        },
      },
    }),
  )
  .use(
    staticPlugin({
      assets: "dist",
      prefix: "/public",
    }),
  )
  .onAfterHandle(({ response, set }) => {
    if (isHtml(response)) {
      set.headers["Cache-Control"] = "max-age:300, private";
      set.headers["Content-Type"] = "text/html; charset=utf8";
    }
  })
  .get("/", () => <IndexPage />)
  .get("/composer/:slug", ({ params: { slug } }) => (
    <ComposerPage slug={slug} />
  ))
  .get("/composer/:slug/work/:workId", ({ params: { workId } }) => (
    <WorkPage workId={Number(workId)} />
  ))
  .get("/composers/search", async () => await searchComposers(dbConnect()))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
