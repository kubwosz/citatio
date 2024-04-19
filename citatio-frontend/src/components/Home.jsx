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
    <div className="w-screen h-screen bg-orange-50">
      <div className="top-nav-bar grid grid-cols-3 gp-2 justify-between border-b-4 border-stone-400">
        <ul className="flex justify-start border-r-4 border-r-stone-400">
          <li className="m-3 align-center"><a href="#">Home</a></li>
        </ul>
        <div className="m-3">
          <span class="dot"></span>
          CITATIO

        </div >
        <ul className="flex justify-end border-l-4 border-l-stone-400">
          <li className="m-3"><a href="#">About</a></li>
        </ul>
      </div>

      <div className="h-1/2 top-panel flex items-center justify-center space-around flex-col mt-5">
        <div className="border-4 border-stone-300 h-1/2 w-1/3">
        <input
                    id="title"
                    className="block bg-amber-100 w-3/12 hover:bg-amber-200 py-2 rounded m-3 self-center inline-block"
                    placeholder=" DOI..."
                    type="text"
                />
        <input
                    id="title"
                    className="block bg-amber-100 w-3/12 hover:bg-amber-200 py-2 rounded m-3 self-center inline-block"
                    placeholder=" DOI..."
                    type="text"
                />
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
            className="bg-stone-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 self-center"
          >
            New Citation
          </button>
          <p className="text-red-800">{doiNotFound ? "Doi not found" : ""}</p>
        </div>
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
