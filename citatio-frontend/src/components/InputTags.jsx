import { useState } from "react";

const InputTags = (props) => {
    const [tags, setTags] = useState([]);

    const addIfIsATag = (stringValue) => {
        let re = new RegExp('(10[.][0-9]{4,}[^\s"/<>]*/[^\s"<>]+)');

        console.log(re.test(stringValue));
        if(re.test(stringValue)){
            tags.push(stringValue);
        }
        console.log(tags);
      };

    const inputChangeHandler = (data) => {
        addIfIsATag(data.target.value)
        props.doiInputChangeHandler(data);
      };

    return (
            <input
          id="title"
          className="block bg-rose-200 w-3/12 hover:bg-green-500 text-white py-2 rounded m-3 self-center"
          placeholder=" DOI..."
          type="text"
          required
          value={props.doiValue}
          onChange={inputChangeHandler}
        ></input>
        )
};

export default InputTags;
