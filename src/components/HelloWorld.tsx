import { AppLayout } from "./AppLayout";

export function HelloWorld(): JSX.Element {
  return (
    <AppLayout title="Hello world">
      <div class="m-8">Hello World</div>
    </AppLayout>
  );
}
