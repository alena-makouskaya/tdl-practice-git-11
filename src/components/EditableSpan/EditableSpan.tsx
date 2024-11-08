// @flow
import * as React from "react";
import { KeyboardEvent } from "react";
type EditableSpanPropsType = {
  title: string;
  callBack: (title: string) => void
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan is called");

  const { title, callBack} = props;

  let [editMode, setEditMode] = React.useState(false);
  let [inputValue, setInputValue] = React.useState("");

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
    setInputValue(title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    callBack(inputValue);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
        activateViewMode()
    }

  }

  return editMode ? (
    <input
      type="text"
      value={inputValue}
      onChange={changeInputValueHandler}
      onBlur={activateViewMode}
      onKeyDown={onKeyDown}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
});
