import type { MDXProviderComponentsProp } from "@mdx-js/react";
import NextImage from "next/image";

export const mdxComponents: MDXProviderComponentsProp = {
  img: (props) => {
    console.log("NextImage Props: ", props);
    return <NextImage {...props} layout="responsive" />;
  },
};
