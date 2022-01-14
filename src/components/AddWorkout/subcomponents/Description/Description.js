import { useEffect, useRef } from 'react';

const Description = ({ setDescription, handleAdd }) => {
  const focusEl = useRef("")
  useEffect(()=>{
    focusEl.current.focus()
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Comments (Optional)"
        ref={focusEl}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
};

export default Description;
