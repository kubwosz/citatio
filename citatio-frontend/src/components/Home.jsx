import { useState, useContext, useEffect, useCallback } from 'react';

const Home = (props) => {

  const [doiValue, setDoiValue] = useState('');
  const [doiData, setDoiData] = useState('');

  const populateFields = useCallback(() => {
    if (props.post) {
      setDoiValue(props.post.Title);
    }
  }, [props.post]);

  useEffect(() => {
    populateFields();
  }, [populateFields]);

  async function submitHandler(event) {
    const response = await fetch('api/hello',
    {
      method: 'GET',
    }
  );
  setDoiData(await response.json());

    event.preventDefault();
  };

  const doiInputChangeHandler = (data) => { setDoiValue(data) }

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
        {doiData}
      </div>
    </section>
  );
}

export default Home;