import { useState, useContext, useEffect, useCallback } from "react";
import TextboxCitation from "./TextboxCitation"
import CustomDropdown from "./CustomDropdown"
import InputTags from "./InputTags"
import { FormProvider, useForm } from 'react-hook-form'

const Home = (props) => {
  const [doiValue, setDoiValue] = useState("");
  const [doiData, setDoiData] = useState("");
  const [citations, setCitations] = useState([
    { type: "AAA", isActive: true, citation: "AAADefault" },
    { type: "APA", isActive: true, citation: "APADefault" },
    { type: "APSA", isActive: true, citation: "APSADefault" },
    { type: "ASA", isActive: true, citation: "ASADefault" },
  ]);
  const [typesOfEnumeration, setTypesOfEnumerations] = useState([
    { type: "Dot", isActive: true },
    { type: "Number", isActive: true },
  ]);
  const [citationType, setCitationType] = useState();
  const [citationTypeChanged, setCitationTypeChanged] = useState(false);
  const [enumerationType, setEnumerationType] = useState();
  const [enumerationTypeChanged, setEnumerationTypeChanged] = useState(false);

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
    console.log(3);
    const nextActivityButtons = citations.map((btn, i) => {
      if (i === index) {
        btn.isActive = !btn.isActive;
      }

      return btn;
    });
    setCitations(nextActivityButtons);
  }

  function setCitationByType(type, citation) {
    console.log(2);
    const nextCitations = citations.map((c) => {
      if (c?.type.toLowerCase() == type.toLowerCase()) {
        c.citation = citation;
      }
      return c;
    });
    setCitations(nextCitations);
  }

  const createResponses = () => {
    if(enumerationType === "Number"){
      return citations.map((c, idx) => <h3> {idx+1 + ". "+ c.citation + "\n"} </h3>) ;
    }
    else if(enumerationType === "Dot"){
      return citations.map((c) => <h3>&bull;  {c.citation} </h3>);
    }
  }

  const methods = useForm()

  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
    console.log(citationTypeChanged)
    console.log(enumerationTypeChanged)
  })

  const setCitationTypeCustom = (e) => {
    setCitationType(e);
    setCitationTypeChanged(true);
  }

  const setEnumerationTypeCustom = (e) => {
    setEnumerationType(e);
    setEnumerationTypeChanged(true);
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

      <div className="h-1/2 top-panel flex items-center justify-center"> 
      <FormProvider>
        <form onSubmit={e => e.preventDefault()} noValidate className="border-4 border-stone-300 h-3/4 w-1/3">
          <InputTags
            doiValue={doiValue}
            doiInputChangeHandler={doiInputChangeHandler}
          />
          <div className="flex flex-col space-around">
            <CustomDropdown values={citations} changeHandler={setCitationTypeCustom} inputInfo={citationType ?? "Citation Type"} />
            <CustomDropdown values={typesOfEnumeration} changeHandler={setEnumerationTypeCustom} inputInfo={enumerationType ?? "Type of enumeration"} />
          </div>
          <div className="flex-col pb-3">
            <button
              onClick={onSubmit}
              disabled={!enumerationTypeChanged || !citationTypeChanged}
              className="bg-stone-500 hover:enabled:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 self-center"
            >
              New Citation
            </button>
            <p className="text-red-800">{doiNotFound ? "Doi not found" : ""}</p>
          </div>
        </form>
        </FormProvider>
      </div>
      <div className=" h-1/3 botton-panel flex justify-center">
        <div className="h-7/8 w-3/4 border-4 border-stone-400">
              <div className="flex flex-col h-full w-full pb-5 items-start justify-start bg-stone-300 hover:bg-stone-200">
                {doiValue ? createResponses() : " DOIs..."}
              </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
