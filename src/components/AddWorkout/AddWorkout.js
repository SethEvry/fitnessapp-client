import { useContext, useState } from "react";
import { Modal } from "..";
import { ModalContext } from "../../context/ModalContext";
import { WorkoutContext } from "../../context/WorkoutContext";
import { Title, SetsnReps, Description } from "./subcomponents";
import { uid } from "uid";

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
