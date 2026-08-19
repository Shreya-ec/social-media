import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    axios.get("http://localhost:3000/get-posts")
    .then((res)=>{
        setPosts(res.data.posts)
    })
  }, []);

  return (
    <section className="feed-section">
      <h1>Your Feed</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.caption} />
              <p>{post.caption}</p>
            </div>
          ))
        ) : (
            <p>No posts available.</p>
        )
      }
    </section>
  );
};

export default Feed;
