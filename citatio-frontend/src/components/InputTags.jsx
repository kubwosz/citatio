import { useState } from "react";

const InputTags = (props) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState(props.doiValue);
    const [bulkDoi, setBulkDoi] = useState(false);
    const [isInputValueDoi, setIsInputValueDoi] = useState(false);


    const addTags = (tagValues) => {
        tagValues.map(tag => {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        })
        console.log(tags);
        console.log(tagValues);
    };

    const getDois = (stringValue) => {
        let re = new RegExp('(10[.][0-9]{4,}[^\s"/<>]*/[^\s"<>]+)');
        return re.exec(stringValue);
    };

    const isDoi = (stringValue) => {
        let re = new RegExp('(10[.][0-9]{4,}[^\s"/<>]*/[^\s"<>]+)');
        return re.test(stringValue);
    };

    const inputChangeHandler = (data) => {
        props.doiInputChangeHandler(data);
        setInputValue(data.target.value.replace(/\s/g, ''));
        if (isDoi(data.target.value)) {
            setIsInputValueDoi(true);
        }
        else {
            setIsInputValueDoi(false);
        }
    };

    const inputDoiBulkChangeHandler = (data) => {
        console.log(bulkDoi);
        let dois = getDois(data.target.value);
        setInputValue(data.target.value);
    };

    return (
        <div className="flex flex-row justify-center relative">
            {/* <div className="absolute z-2">
                {tags.map((tag, idx) => (
                    <span className=" border-2 rounded-sm border-red-950">{tag}</span>
                ))}
            </div> */}
            {bulkDoi ?
                <textarea
                    id="title"
                    className={`resize-y max-h-32 min-h-12 block self-center bg-amber-100 w-3/12 hover:bg-amber-200 py-2 rounded m-3 self-center inline-block`}
                    placeholder=" DOIs..."
                    type="text"
                    required
                    value={inputValue}
                    onChange={inputDoiBulkChangeHandler}
                />
                :
                <input
                    id="title"
                    className={`block bg-amber-100 w-3/12 hover:bg-amber-200 py-2 rounded m-3 self-center inline-block ${isInputValueDoi ? 'border-2 bg-green-100 hover:bg-green-200 border-green-500' : ''}`}
                    placeholder=" DOI..."
                    type="text"
                    required
                    value={inputValue}
                    onChange={inputChangeHandler}
                />
            }
            <label class="sticky left-0 cursor-pointer flex items-center">
                <input type="checkbox" value={bulkDoi} onChange={() => setBulkDoi(!bulkDoi)} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Bulk dois</span>
            </label>
        </div>
    )
};

export default InputTags;
