import { useState, Fragment } from "react";
import { Alert} from "@material-tailwind/react";
 
export default function Alerts({ show, title, color }) {

  return (
    <Fragment>
      <Alert
     
        show={show}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        // dismissible={{
        //   onClose: () => setShow(false),
        // }}
        className="fixed w-9/12 mx-48"
        color={color}
      >
        {title}
      </Alert>
    </Fragment>
  );
}