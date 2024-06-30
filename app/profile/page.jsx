// "use client"

// import Profile from "@components/Profile"
// import { useSession } from "next-auth/react"
// import { useEffect, useState } from "react";


// const MyProfile = () => {

//   const {data:session} = useSession();
//   const [posts,setPosts] = useState([]);

//   useEffect(()=>{
//     const fetchPosts  = async()=>{
//       const response = await fetch (`/api/users/${session?.user.id}/posts`);
//       const data = await response.json();
//       setPosts(data);
//     }
//     if (session?.user.id) fetchPosts();
//   },[])

//   const handleEdit = () => {

//   }
  
//   const handleDelete = async () => {
    
//   } 



//   return (
//     <Profile
//         name="My"
//         desc = "Welcome to your personalized profile page "
//         data={posts}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//     />
//   )
// }

// export default  MyProfile;






"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else {
            console.error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [session?.user.id]); // Add session?.user.id as a dependency to the useEffect


  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)

  };

  const handleDelete = async (post) => {
    const hasConfirmed =  confirm ("Are you sure you want to delete this Prompt ?")
    if(hasConfirmed){
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`,{
          method:'DELETE'
        })
        // console.log(response);

        // console.log(posts,'this is the curent posts');
        const filteredPosts = posts.filter((p)=> p._id !== post._id);
        // console.log('this is the filtered posts',filteredPosts);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
