import { useState, useContext, useEffect, useCallback } from 'react';



const Home = (props) => {

  const [doiValue, setDoiValue] = useState('');
  const [doiData, setDoiData] = useState('');
  const [doiDataFormat1, setDoiData1] = useState('');
  const [doiDataFormat2, setDoiData2] = useState('');
  const [butonActivity, setActivityButtons] = useState([
    {name: 'AAA', isActive: false},
    {name: 'APA', isActive: false},
  ]);

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

  function handleActivityToggle(index) {
    const nextActivityButtons = butonActivity.map((btn, i) => {
      if (i === index) {
        btn.isActive = !btn.isActive;
      }

      return btn;
    });
    setActivityButtons(nextActivityButtons);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
    <div className="leftPanel">
      <label htmlFor="title">Put here your DOI</label>
      <input
        id="title"
        className="bg-green-300 hover:bg-green-500 text-white py-2 rounded"
        type="text"
        required
        value={doiValue}
        onChange={doiInputChangeHandler}
      ></input>
      <button
        onClick={submitHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get DOI information
      </button>
    </div>
    <div className="rightPanel grid grid-cols-2 ">
      <h2>Information about your DOI:</h2>
      {butonActivity.map((btn, idx) => (
    <button
    key={btn.name}
    onClick={() => handleActivityToggle(idx)}
    className={btn.isActive ? 'active' : ''}
  >
    Nazwa: {btn.name}
  </button>
  ))}
      <ul class="list-group">
        <button
          class="btn btn-primary btn-aaa"
        >
          Single toggle
        </button>
        <button
          type="button"
          class="btn btn-primary btn-apa"
          data-toggle="button"
          aria-pressed="false"
          autocomplete="off"
        >
          Single toggle
        </button>
        <button
          type="button"
          class="btn btn-primary btn-aaa"
          data-toggle="button"
          aria-pressed="false"
          autocomplete="off"
        >
          Single toggle
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
          autocomplete="off"
        >
          Single toggle
        </button>
        <li class="list-group-item">
          <span class="label label-default">Your reference AAA:</span>{" "}
          {doiData}{" "}
        </li>
        <li class="list-group-item">
          <span class="label label-default">Your reference APA:</span>{" "}
          {doiDataFormat1}{" "}
        </li>
      </ul>
    </div>
  </div>
  );
}

export default Home;