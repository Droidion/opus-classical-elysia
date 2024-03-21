declare module "bun" {
  interface Env {
    IMAGES_URL: string;
    DATABASE_URL: string;
    DATABASE_AUTH_TOKEN: string;
  }
}
