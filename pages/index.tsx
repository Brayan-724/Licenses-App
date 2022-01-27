import { Layout, Page } from "@typing/page";
import { page } from "@utils/page";

const pageInfo = page(
  ({}) => {
    return <div className="">A</div>;
  },
  {
    layout: Layout.Default,
  }
);

export default pageInfo.page;
