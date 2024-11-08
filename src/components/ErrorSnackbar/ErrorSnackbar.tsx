// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../app/store";
import { string } from "prop-types";
type Props = {};
export const ErrorSnackbar = (props: Props) => {
  const error = useSelector<AppRootState, string | null>((state) => state.app.error);

  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {open && error !== null && (
        <div className="errorSnackbar">
          <span>{error}</span>

          <button onClick={handleClose}> x </button>
        </div>
      )}
    </>
  );
};
