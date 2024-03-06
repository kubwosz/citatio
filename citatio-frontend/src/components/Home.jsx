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
    const response = await fetch('api/doi/' + doiValue,
    {
      method: 'GET',
    }
  );
  let doiResponse = JSON.parse(await response.json());
  console.log(doiResponse);
  console.log(doiResponse["message-type"]);
  let doiObject = {
    doi: doiResponse.message.DOI,
    type: doiResponse.message.type,
    publisher: doiResponse.message.publisher,
    referenceCount: doiResponse.message["reference-count"],
    abstract: doiResponse.message.abstract,
  }
  console.log(doiObject);
  setDoiData(doiObject);

    event.preventDefault();
  };

  const doiInputChangeHandler = (data) => { setDoiValue(data.target.value) }

  return (
    <section>
      <div className="container w-75 pb-4">
        <form onSubmit={submitHandler}>
          <div className="form-group pb-3">
            <label htmlFor="title">Put here your DOI</label>
            <input id="title" type="text" className="form-control" required value={doiValue} onChange={doiInputChangeHandler}></input>
          </div>
          <button type="button" onClick={submitHandler} className="btn btn-success">Get DOI information</button>
        </form>
        <h2>Information about your DOI:</h2>
        <ul class="list-group">
  <li class="list-group-item"><span class="label label-default">DOI:</span>   {doiData.doi}</li>
  <li class="list-group-item"><span class="label label-default">Type:</span>   {doiData.type}</li>
  <li class="list-group-item"><span class="label label-default">Publisher:</span>   {doiData.publisher}</li>
  <li class="list-group-item"><span class="label label-default">ReferenceCount:</span>   {doiData.referenceCount}</li>
  <li class="list-group-item"><span class="label label-default">Abstract:</span>   </li>
  <textarea>{doiData.abstract}</textarea>
</ul>
      </div>
    </section>
  );
}

export default Home;