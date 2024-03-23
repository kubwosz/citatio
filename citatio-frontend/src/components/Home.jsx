import { useState, useContext, useEffect, useCallback } from "react";
import TextboxCitation from "./TextboxCitation"

const Home = (props) => {
  const [doiValue, setDoiValue] = useState("");
  const [doiData, setDoiData] = useState("");
  const [doiDataFormat1, setDoiData1] = useState("");
  const [doiDataFormat2, setDoiData2] = useState("");
  const [citations, setCitations] = useState([
    { type: "AAA", isActive: false, citation: "AAADefault" },
    { type: "APA", isActive: false, citation: "APADefault" },
    { type: "APA", isActive: false, citation: "APADefault" },
    { type: "APA", isActive: false, citation: "APADefault" },
    { type: "APA", isActive: false, citation: "APADefault" },
  ]);

  const delegate = {
    setDoiData: function (doiObject) {
      setDoiData(doiObject);
    },
    setDoiData1: function (doiObject) {
      setDoiData1(doiObject);
    },
    setDoiData2: function (doiObject) {
      setDoiData2(doiObject);
    },
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
    let resAAA = await getDoiData("reference/aaa", delegate.setDoiData);
    let resAPA = await getDoiData("reference/apa", delegate.setDoiData1);

    setCitationByType("AAA", resAAA);
    setCitationByType("APA", resAPA);

    event.preventDefault();
  }

  const doiInputChangeHandler = (data) => {
    setDoiValue(data.target.value);
  };

  async function getDoiData(url, delegatee) {
    const response = await fetch("api/" + url + "/" + doiValue, {
      method: "GET",
    });
    let createdReference = await response.json();
    delegatee(createdReference);
    return createdReference;
  }

  function setCitationActivityByIndex(index) {
    const nextActivityButtons = citations.map((btn, i) => {
      if (i === index) {
        btn.isActive = !btn.isActive;
      }

      return btn;
    });
    setCitations(nextActivityButtons);
  }

  function setCitationByType(type, citation) {
    const nextCitations = citations.map((c) => {
      if (c.type === type) {
        c.citation = citation;
      }
      return c;
    });
    setCitations(nextCitations);
  }

  return (
    <div className="grid grid-rows-2 gap-4 font-myFont">
      <div className="top-panel flex justify-center flex-col mt-5">
        <h1 className="max-w-40 self-center p-2 mt-10">Put here your DOI: </h1>
        <input
          id="title"
          className="block bg-rose-200 w-3/12 hover:bg-green-500 text-white py-2 rounded m-3 self-center"
          placeholder=" DOI..."
          type="text"
          required
          value={doiValue}
          onChange={doiInputChangeHandler}
        ></input>
        <button
          onClick={submitHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 self-center"
        >
          Get DOI information
        </button>
      </div>
      <div className="botton-panel grid grid-cols-3 ">
        <div className="flex flex-col ">
          <h2>Information about your DOI:</h2>
          <div className="cit-type-buttons h-3/4">
            {citations.map((btn, idx) => (
              <div>
                <button
                  key={btn.name}
                  onClick={() => setCitationActivityByIndex(idx)}
                  className={
                    (btn.isActive ? "active " : "") +
                    "[&.active]:bg-blue-400 bg-red-400 rounded px-2 py-2 m-2"
                  }
                >
                  Citation type: {btn.type}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          {citations.map((c) => (
            <div>
          <span class="label label-default uppercase">{c.type}</span>{" "}
            <TextboxCitation citation={c.citation}/>
            {console.log(c.citation)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
