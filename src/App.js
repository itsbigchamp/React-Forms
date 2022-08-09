
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [validForm,setValidForm] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDiscription] = useState("your description")
    const [author,setAuthor] = useState("other")

    useEffect(() => {
      // fetch stuff
      if(title.length > 3 && description.length > 10) {
        setValidForm(true);
        }else{
          setValidForm(false);
        }
      // console.log("its ready to be submitted")
    },[title,description,author])

    // console.log(title)

    // const formSubmit
    
    async function formSubmit(e) {
      e.preventDefault();

      if (!validForm) {
        setErrorMessage("Not a valid form")
        return
      } 
      
      setErrorMessage("")

      try {
      // console.log("form submitted")
      // const comment = {
      //   title:title,
      //   description:description,
      //   author:author,
      // }
      const comment = {
        title,
        description,
        author,
      }
      console.log("form submitted with",comment)

      // really submitted it to an api
      const results = await fetch(`https://sql.bocacode.com/comments`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
      console.log(results)
      const data = await results.json()
      console.log(data)

      setFormSubmitted(true);
      setErrorMessage("");
      setValidForm(true);
      alert("Wow!It's been submitted!");
        } catch (error) {
          console.error(error);
          setErrorMessage("there was an error submitting your comment" + error.toString());
        }
    }

    return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>
        <label>Title</label>
        <input type="text" 
        // required
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}/>
        <h3>{title}</h3>
        <label>Description</label>
        <textarea
        value={description}
        onChange={(e)=>{setDiscription(e.target.value)}}>
        </textarea>
        <h3>{description}</h3>  

        <label>Author</label>
        <select value={author}
        onChange={(e)=> {setAuthor(e.target.value)}}>
          <option value="" selected>Choose One</option>
          <option value="todd">Todd</option>
          <option value="ludwigson">Ludwigson</option>
          <option value="other">Other</option>
        </select>
        <h3>{author}</h3>

        {!formSubmitted &&
        <button>Submit form</button>
        }

        {errorMessage &&
             <h1>There was an error:<br/>{errorMessage}</h1>
        }


      </form>
    </div>
  );
}

export default App;
