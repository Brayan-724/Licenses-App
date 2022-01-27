import * as React from "react";
import { page } from "~/app/utils/page";

export default page(() => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="py-5 px-3 text-3xl text-neutral-700 border-solid border-0 border-r-4 border-r-neutral-700">
        404
      </div>
      <div className="px-3 text-xl text-neutral-500">Not found</div>
    </div>
  );
});
