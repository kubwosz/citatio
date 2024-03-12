import { useState, useContext, useEffect, useCallback } from 'react';



const Home = (props) => {

  const [doiValue, setDoiValue] = useState('');
  const [doiData, setDoiData] = useState('');
  const [doiDataFormat1, setDoiData1] = useState('');
  const [doiDataFormat2, setDoiData2] = useState('');

  const delegate = {
    setDoiData: function(doiObject) {
      setDoiData(doiObject)
    },
    setDoiData1: function(doiObject) {
      setDoiData1(doiObject)
    },
    setDoiData2: function(doiObject) {
      setDoiData2(doiObject)
    }
  };
  
  const populateFields = useCallback(() => {
    if (props.post) {
      setDoiValue(props.post.Title);
    }
  }, [props.post]);

  useEffect(() => {
    populateFields();
  }, [populateFields]);

  async function submitHandler(event) {
    await getDoiData('doi', delegate.setDoiData);
    await getDoiData('reference/format1', delegate.setDoiData1);
    await getDoiData('reference/format2', delegate.setDoiData2);

    event.preventDefault();
  };

  const doiInputChangeHandler = (data) => { setDoiValue(data.target.value) }

  async function getDoiData(url, delegatee) {
    const response = await fetch('api/' + url + '/' + doiValue,
    {
      method: 'GET',
    }
  );
  let doiResponse = await response.json();
  console.log(doiResponse);
  let doiObject = {
    doi: doiResponse.Doi,
    type: doiResponse.Type,
    title: doiResponse.Title,
    authors: [],
    publisher: doiResponse.Publisher,
    abstract: doiResponse.Abstract,
    createdReference: doiResponse.CreatedReference
  }
  console.log(doiObject);
  delegatee(doiObject);
  // setDoiData(doiObject);
  }


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
  <li class="list-group-item"><span class="label label-default">Title:</span>   {doiData.title}</li>
  <li class="list-group-item"><span class="label label-default">Publisher:</span>   {doiData.publisher}</li>
  <li class="list-group-item"><span class="label label-default">ReferenceCount:</span>   {doiData.referenceCount}</li>
  <li class="list-group-item"><span class="label label-default">Abstract:</span>   </li>
  <textarea>{doiData.abstract}</textarea>

  <li class="list-group-item"><span class="label label-default">Your reference:</span>   {doiData.createdReference} </li>
  <li class="list-group-item"><span class="label label-default">Your reference:</span>   {doiDataFormat1.createdReference} </li>
  <li class="list-group-item"><span class="label label-default">Your reference:</span>   {doiDataFormat2.createdReference} </li>

</ul>
      </div>
    </section>
  );
}

export default Home;