// @flow
import * as React from "react";
import { KeyboardEvent } from "react";

type AddItemFormPropsType = {
  callBack: (value: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemForm is called");

  let { callBack } = props;

  let [inputValue, setInputValue] = React.useState("");
  let [error, setError] = React.useState<null | string>(null);

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    if (error) {
      setError(null);
    }
  };

  const callBackHandler = () => {
    if (inputValue.trim() !== "") {
      callBack(inputValue.trim());
      setInputValue("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      callBackHandler();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={changeInputValueHandler}
        onKeyDown={onKeyDown}
        className={error ? "error" : ""}
      />
      <button onClick={callBackHandler}> + </button>
      {error && <div className="errorText">{error}</div>}
    </div>
  );
});
