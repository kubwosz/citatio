import { useState, useContext, useEffect, useCallback } from 'react';



const Home = (props) => {

  const [doiValue, setDoiValue] = useState('');
  const [doiData, setDoiData] = useState('');
  const [doiDataFormat1, setDoiData1] = useState('');
  const [doiDataFormat2, setDoiData2] = useState('');
  const [butonActivity, setButton] = useState('');

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
    await getDoiData('reference/aaa', delegate.setDoiData);
    await getDoiData('reference/apa', delegate.setDoiData1);
    // await getDoiData('reference/format2', delegate.setDoiData2);

    event.preventDefault();
  };

  const doiInputChangeHandler = (data) => { setDoiValue(data.target.value) }

  async function getDoiData(url, delegatee) {
    const response = await fetch('api/' + url + '/' + doiValue,
    {
      method: 'GET',
    }
  );
  let createdReference = await response.json();
  delegatee(createdReference);
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
        <div class="flex">
  <div class="flex-none w-14 h-14">
    01
  </div>
  <div class="flex-initial w-64">
    02
  </div>
  <div class="flex-initial w-32 ">
    03
  </div>
</div>        
<button type="button" class="btn btn-primary btn-aaa" data-toggle="button" aria-pressed="false" autocomplete="off">
  Single toggle
</button>
<button type="button" class="btn btn-primary btn-apa" data-toggle="button" aria-pressed="false" autocomplete="off">
  Single toggle
</button>
<button type="button" class="btn btn-primary btn-" data-toggle="button" aria-pressed="false" autocomplete="off">
  Single toggle
</button>
<button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
  Single toggle
</button>
  <li class="list-group-item"><span class="label label-default">Your reference AAA:</span>   {doiData} </li>
  <li class="list-group-item"><span class="label label-default">Your reference APA:</span>   {doiDataFormat1} </li>
</ul>
      </div>
    </section>
  );
}

export default Home;