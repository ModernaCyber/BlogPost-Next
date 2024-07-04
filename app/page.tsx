"use client";
import BlogCard from "components/Blogcard";
import Wrapper from "components/Wrapper";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface Post {
  // Define the structure of a post object
  id?: string;
  img?: string;
  title?: string;
  content?: string;
  // Add other fields as needed
}

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]); // Initialize with empty array of Post type
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  useEffect(() => {
    fetchPost();
  }, []); // Fetch posts on component mount

  const fetchPost = async () => {
    try {
      // const res = await axiosAuth.get("/api/posts/");
      // console.log(res)
      // setPosts(res.data); // Assuming res.data is an array of posts
      setPosts([
        {
          id: "1",
          img: "https://example.com/image1.jpg",
          title: "Sample Post 1",
          content: "This is the content of sample post 1.",
        },
        {
          id: "2",
          img: "https://example.com/image2.jpg",
          title: "Sample Post 2",
          content: "This is the content of sample post 2.",
        },
        {
          id: "3",
          img: "https://example.com/image3.jpg",
          title: "Sample Post 3",
          content: "This is the content of sample post 3.",
        },
        {
          id: "4",
          img: "https://example.com/image4.jpg",
          title: "Sample Post 4",
          content: "This is the content of sample post 4.",
        },
      ]);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); // Handle error by setting posts to empty array
    }
  };

  if (!session) {
    router.push("/login");
  }
  return (
    <div className="w-full h-full pt-8">
      <Wrapper>
        {posts.length === 0 ? (
          <div className="">No blogs at the moment</div>
        ) : (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, key) => (
              <BlogCard post={post} key={key} />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default HomePage;
