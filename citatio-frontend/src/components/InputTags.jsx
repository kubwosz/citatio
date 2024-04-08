import { useState } from "react";

const InputTags = (props) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState(props.doiValue);


    const addTags = (tagValues) => {
        tagValues.map(tag => {
            if(tags.indexOf(tag) === -1) {
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

    const inputChangeHandler = (data) => {
        let dois = getDois(data.target.value);
        console.log(dois);
        if (dois?.length > 0) {
            addTags(dois)
            dois.map(doi => {
                let inputToUpdate = inputValue.replace(doi, '');
                setInputValue(inputToUpdate);
            })
        } else {
            setInputValue(data.target.value);
        }
    };

    return (
        <div className="relative">
            <div className="absolute z-2">
                {tags.map((tag, idx) => (
                    <span className=" border-2 rounded-sm border-red-950">{tag}</span>
                ))}
            </div>
            <input
                id="title"
                className="block bg-rose-200 w-3/12 hover:bg-green-500 text-white py-2 rounded m-3 self-center"
                placeholder=" DOI..."
                type="text"
                required
                value={inputValue}
                onChange={inputChangeHandler}
            >
            </input>
        </div>
    )
};

export default InputTags;
