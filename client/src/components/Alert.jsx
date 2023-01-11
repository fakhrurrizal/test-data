import { useState, Fragment } from "react";
import { Alert, Button } from "@material-tailwind/react";
 
export default function Alerts() {
  const [show, setShow] = useState(true);
 
  return (
    <Fragment>
      {/* {!show && (
        <Button
          variant="gradient"
          className="absolute"
          onClick={() => setShow(true)}
        >
          Show Alert
        </Button>
      )} */}
      <Alert
     
        show={show}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        dismissible={{
          onClose: () => setShow(false),
        }}
      >
        A dismissible alert with custom animation.
      </Alert>
    </Fragment>
  );
}