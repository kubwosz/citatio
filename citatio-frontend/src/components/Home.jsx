import { useState, useContext, useEffect, useCallback } from 'react';

const Home = (props) => {

  const [doiValue, setDoiValue] = useState('');

  const [errors, setErrors] = useState({});

  const populateFields = useCallback(() => {
    if (props.post) {
      setDoiValue(props.post.Title);
    }
  }, [props.post]);

  useEffect(() => {
    populateFields();
  }, [populateFields]);

  async function submitHandler(event) {
    event.preventDefault();
  };

  const doiInputChangeHandler = (event) => { setDoiValue(event.target.value) }

  const submitButtonText = props.onEditPost ? 'Update Post' : 'Add Post';

  return (
    <section>
      <div className="container w-75 pb-4">
        <form onSubmit={submitHandler}>
          <div className="form-group pb-3">
            <label htmlFor="title">Put here your DOI</label>
            <input id="title" type="text" className="form-control" required value={doiValue} onChange={doiInputChangeHandler}></input>
          </div>
          <button type="submit" className="btn btn-success">{submitButtonText}</button>
        </form>
      </div>
    </section>
  );
}

export default Home;