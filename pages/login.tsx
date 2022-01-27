import { Layout } from "~/app/types/page";
import { page } from "~/app/utils/page";

export default page(
  () => {
    return (
      <div>
        <h1>Login</h1>
      </div>
    );
  },
  {
    layout: Layout.None,
  }
);
