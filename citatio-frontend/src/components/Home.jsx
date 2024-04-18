import { useState, useContext, useEffect, useCallback } from "react";
import TextboxCitation from "./TextboxCitation"
import InputTags from "./InputTags"

const Home = (props) => {
  const [doiValue, setDoiValue] = useState("");
  const [doiData, setDoiData] = useState("");
  const [citations, setCitations] = useState([
    { type: "AAA", isActive: false, citation: "AAADefault" },
    { type: "APA", isActive: false, citation: "APADefault" },
    { type: "APSA", isActive: false, citation: "APSADefault" },
    { type: "ASA", isActive: false, citation: "ASADefault" },
  ]);
  const [doiNotFound, setDoiNotFound] = useState(false);

  const populateFields = useCallback(() => {
    if (props.post) {
      setDoiValue(props.post.Title);
    }
  }, [props.post]);

  useEffect(() => {
    populateFields();
  }, [populateFields]);

  async function submitHandler(event) {
    let resMany = await postGetDoiData("references");
    resMany?.map(r => {
      setCitationByType(r.Type, r.Value);
    })
    event.preventDefault();
  }

  const doiInputChangeHandler = (data) => {
    setDoiValue(data.target.value);
  };

  async function getDoiData(url) {
    const response = await fetch("api/" + url + "/" + doiValue, {
      method: "GET",
    });
    let createdReference = await response.json();
    return createdReference;
  }

  async function postGetDoiData(url) {
    let activeCitTypes = citations.flatMap(c => c.isActive ? c.type.toLowerCase() : []);

    const response = await fetch("api/" + url, {
      method: "POST",
      body: JSON.stringify({ value: doiValue.toString(), citTypes: activeCitTypes })
    });
    if (response.status !== 200) {
      setDoiNotFound(true);
      return null;
    }
    let createdReference = await response.json();
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
      if (c?.type.toLowerCase() == type.toLowerCase()) {
        c.citation = citation;
      }
      return c;
    });
    setCitations(nextCitations);
  }

  return (
    <div className="grid grid-rows-8 gap-12 w-screen h-screen bg-orange-100">
      <div className="col-span-1 top-nav-bar grid grid-cols-3 gp-2 h-1/10 justify-between bg-orange-100 border-b-4 border-b-indigo-500">
        <ul className="flex justify-start border-r-4 border-r-indigo-500">
          <li className="m-3"><a href="#">Home</a></li>
        </ul>
        <div className="m-3">
          <span class="dot"></span>
          CITATIO

        </div >
        <ul className="flex justify-end border-l-4 border-l-indigo-500">
          <li className="m-3"><a href="#">About</a></li>
        </ul>
      </div>

      <div className="top-panel flex content-center flex-col mt-5">
        <h1 className="max-w-40 self-center p-2 mt-10">Put here your DOI: </h1>
        <InputTags
          doiValue={doiValue}
          doiInputChangeHandler={doiInputChangeHandler}
        />
        <div className="flex flex-col gap-3">
          <h1>Citation type:</h1>
          <div className="flex flex-row cit-type-buttons basis-3/4 items-end">
            {citations.map((btn, idx) => (
              <div className="p-5">
                <button
                  key={btn.name}
                  onClick={() => setCitationActivityByIndex(idx)}
                  className={
                    (btn.isActive ? "active " : "") +
                    "[&.active]:bg-blue-400 bg-red-400 rounded px-4 py-2 m-2"
                  }
                >
                  {btn.type}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-col pb-3">
          <button
            onClick={submitHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 self-center"
          >
            Get DOI information
          </button>
          <p className="text-red-800">{doiNotFound ? "Doi not found" : ""}</p>
        </div>
      </div>
      <div className="botton-panel flex-row justify-center pt-16">
        <div>
          {citations.map((c) => {
            if (c.isActive) {
              return (
                <div className="flex flex-col pb-5 items-center">
                  <span className="label label-default uppercase">{c.type}</span>
                  <TextboxCitation citation={c.citation} />
                </div>
              )
            }
          }
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
