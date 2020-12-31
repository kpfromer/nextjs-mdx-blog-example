import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";
import { mdxComponents } from "../../components/mdx";
import { getPostById, getPostIds } from "../../lib/post";
import { PostData } from "../../lib/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIds();
  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const file = await getPostById(props.params.id as string);

  return { props: file };
};

export interface BlogPostProps extends PostData {}

const BlogPost: React.FC<BlogPostProps> = ({ frontMatter, body }) => {
  const content = hydrate(body, { components: mdxComponents });
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", flexGrow: 1, maxWidth: 750 }}>
        <h1>{frontMatter.name}</h1>
        <small>{frontMatter.updated}</small>
        <div style={{ marginTop: "50px" }}>{content}</div>
      </div>
    </div>
  );
};

export default BlogPost;
