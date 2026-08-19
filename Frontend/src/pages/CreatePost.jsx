import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    axios.post("http://localhost:3000/create-post", formData)
    .then((res)=> {
      alert(res.data.message)
      navigate("/feed") // navigate to feed page after successful submission
      e.target.reset() // reset the form after successful submission
    })
    .catch((err)=> {
      console.error(err)
      alert("Error creating post")
    })
  }

  return (
    <section className="create-post-section">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <input type="text" name="caption" placeholder="Write a caption..." required />
        <button type="submit">Post</button>
      </form>
    </section>
  )
}

export default CreatePost;
