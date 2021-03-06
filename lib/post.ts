import fs from "fs";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import path from "path";
import { promisify } from "util";
import { mdxComponents } from "../components/mdx";
import imageMetadata from "../plugins/image-metadata";
import { PostData } from "./types";

export async function getPostById(id: string): Promise<PostData> {
  const allFiles = fs.readdirSync(path.join(process.cwd(), "posts"));
  const file = allFiles
    .filter((file) => /\.mdx$/.test(file))
    .find((fileName) => fileName.replace(/\.mdx$/, "") === id);

  if (!file) return undefined;

  const data = (
    await promisify(fs.readFile)(path.join(process.cwd(), "posts", `${id}.mdx`))
  ).toString();

  const { content, data: metadata } = matter(data);

  return {
    id,
    frontMatter: metadata as PostData["frontMatter"],
    body: await renderToString(content, {
      components: mdxComponents,
      scope: metadata,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mdxOptions: {
        rehypePlugins: [imageMetadata],
      },
    }),
  };
}

export async function getPostIds(): Promise<string[]> {
  const allFiles = fs.readdirSync(path.join(process.cwd(), "posts"));
  return allFiles
    .filter((file) => /\.mdx$/.test(file))
    .map((file) => file.replace(/\.mdx$/, ""));
}
