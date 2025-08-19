import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

// set to 0 so no cache - then in prod you increase the revalidate so that the pages become static from the cached data
// NB you cannot however run a build with revalidate 0 and a generateStaticParams function - these two do not mix
export const revalidate = 10;

// type Props = {
//   params: { postId: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// };

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const post = await getPostByName(`blogposts/${postId}.mdx`); //deduped

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const post = await getPostByName(`blogposts/${postId}.mdx`); //deduped

  if (!post) notFound();

  const { meta, content } = post;

  const pubDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <h2 className="text-white text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="text-white mt-0 text-sm">{pubDate}</p>
      <article className="text-white">{content}</article>
      <section className="text-white">
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10 text-white">
        <Link href="/">Back to home</Link>
      </p>
    </>
  );
}
