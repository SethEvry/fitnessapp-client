import { useContext, useState } from "react";
import { uid } from "uid";

//context
import { ModalContext } from "../../context/ModalContext";
import { WorkoutContext } from "../../context/WorkoutContext";

//components
import { Modal } from "..";
import { Title, SetsnReps, Description } from "./subcomponents";


//react-icons
import { ImArrowLeft } from "react-icons/im";
import { IconContext } from "react-icons/lib";
//
export default function AddWorkout({ date }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState([]);
  const [description, setDescription] = useState("");
  const { setWorkOuts } = useContext(WorkoutContext);
  const { dispatch } = useContext(ModalContext);

  const handleAdd = () => {
    const exercise = {
      id: uid(),
      title,
      sets,
      description,
      date,
    };
    setWorkOuts((oldWorkOuts) => [...oldWorkOuts, exercise]);
    dispatch({ type: "CLOSE" });
  };

  return (
    <Modal>
      {step > 0 ? (
        <IconContext.Provider
          value={{ className: "header_left", size: "1.5em" }}
        >
          <ImArrowLeft onClick={() => setStep((oldStep) => oldStep - 1)} />
        </IconContext.Provider>
      ) : null}
      {
        [
          <Title title={title} setTitle={setTitle} setStep={setStep} />,
          <SetsnReps sets={sets} setSets={setSets} setStep={setStep} />,
          <Description
            description={description}
            setDescription={setDescription}
            handleAdd={handleAdd}
          />,
        ][step]
      }
    </Modal>
  );
}
