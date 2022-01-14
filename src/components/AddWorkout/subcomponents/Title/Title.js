import { useState, useRef, useEffect } from "react";

const Title = ({ title, setTitle, setStep }) => {
  const [isError, setIsError] = useState(false);
  const focusEl = useRef("")
  useEffect(()=>{
    focusEl.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      setIsError(false);
      setStep(1);
    } else {
      setIsError(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {isError ? <p>It needs a title!</p> : null}
        <input
          type="text"
          placeholder="Title"
          value={title}
          ref={focusEl}
          onChange={(e) => setTitle(e.target.value)}
        />
    </form>
  );
};

export default Title;
