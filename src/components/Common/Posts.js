import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/actions";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsReducer.posts);
  const error = useSelector((state) => state.postsReducer.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
};

export default Posts;
