declare module "bun" {
  interface Env {
    IMAGES_URL: string;
    POSTGRES_CONNECTION_STRING: string;
  }
}
