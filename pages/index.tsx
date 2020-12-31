import NextLink from "next/link";

export default function Home() {
  return (
    <div>
      <NextLink href="/blog/example">
        <a>Blog Post</a>
      </NextLink>
    </div>
  );
}
