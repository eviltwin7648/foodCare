import { useState } from "react";
export default function Form() {
  const [page, setPage] = useState(0);
  const pages = [
    "What do u Want to do?",
    "Register as Volunteer",
    "Register as Donor",
    "Register as Receiver",
  ];
  return (
    <div>
      <h1>{pages[page]}</h1>
      <form>
        <button type="button" onClick={() => setPage((prev) => prev + 1)}>
          Continue
        </button>
        {page !== 0 && (
          <button
            type="button"
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            Back
          </button>
        )}
      </form>
    </div>
  );
}
