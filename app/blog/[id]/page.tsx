"use client";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import CommentForm from "components/CommentForm";
import { Button } from "components/ui/button";
import { MoreHorizontal } from "lucide-react";

type BlogPostProps = {
  params: {
    id: string;
  };
};

interface PostInterface {
  id?: string;
  img?: string;
  title?: string;
  content?: string;
  author?: string; // Add author field to Post interface
}

interface CommentInterface {
  id?: string;
  post?: string;
  author?: string;
  content?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [post, setPost] = useState<PostInterface | null>(null); // Initialize with null and correct type
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const axiosAuth = useAxiosAuth();
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // console.log(
  //   JSON.stringify(session) +
  //     "-----------------------------------session--BlogPage------------------------------------"
  // );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosAuth.get<PostInterface>(`/test/user/1/posts/${id}`);
        setPost(res.data);
        // setPost({
        //   title: "newjjj",
        //   content: "This are my content",
        //   author: "author",
        // });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        // const res = await axiosAuth.get<Comment[]>(`/api/comments/${id}`);
        const res = await axiosAuth.get(`/api/comments/${id}`);
        setComments(res.data);
        // setComments([
        //   {
        //     post: "1",
        //     content: "This is a comment.",
        //   },
        //   {
        //     post: "1",
        //     content: "This is a comment.",
        //   },
        // ]);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchPost();
    fetchComments();
    // if (session) {
    //   fetchPost();
    //   fetchComments();
    //   // console.log(
    //   //   JSON.stringify(session) +
    //   //     "-----------------------------------session--BlogPage------------------------------------"
    //   // );
    // } else {
    //   // console.log(
    //   //   JSON.stringify(session) +
    //   //     "-----------------------------------No--session--BlogPage------------------------------------"
    //   // );
    //   router.push("/login");
    // }
  }, [session, axiosAuth, id, router]);

  if (!session) {
    return null; // Return null while redirecting
  }

  // if (!post) {
  //   return notFound();
  // }

  const handleComment = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="w-full h-full min-h-dvh pt-8">
      <Wrapper>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-col">
            <div className="h-auto min-h-[400px] w-full relative bg-slate-200 py-4 px-0">
              <h1 className="absolute inset-0 grid place-content-center font-semibold text-3xl md:text-4xl lg:text-5xl px-8 text-center">
                {post?.title}
              </h1>
              <span className="absolute bottom-0 right-0 text-left text-sm text-slate-500">
              author:{post?.author}
            </span>
            </div>
            
            <div>{post?.content}</div>
            <div className="py-4 pl-4 text-left flex flex-col items-start">
              <span
                className=" animate-pulse text-blue-200 text-lg cursor-pointer "
                onClick={handleComment}
              >
                Leave A comment
              </span>
              {showForm ? (
                <CommentForm
                  postId={Number(id)}
                  author={session?.user?.user?.username}
                />
              ) : null}
            </div>
            <div className=" flex overflow-x-scroll h-auto w-full px-4 gap-12 ">
              {comments.length > 0
                ? comments.map((comment, key) => (
                    <div
                      key={key}
                      className="relative w-[320px] h-[200px] border border-slate-500 rounded-md bg-slate-100 p-4 "
                    >
                      <div className="w-full absolute inset-0 py-2 px-1">
                        {comment?.content}
                      </div>
                      <span className="w-auto absolute bottom-0 right-0 text-xs   ">
                        ...{comment?.author}
                      </span>
                      {comment?.author === session?.user?.user?.username &&
                      "a" === "a" ? (
                        <>
                          <Button
                            variant="ghost"
                            className="cursor-pointer z-10 absolute top-0 right-0"
                            // onClick={handleShow}
                          >
                            <MoreHorizontal className="rotate-90" />
                          </Button>
                        </>
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default BlogPost;
