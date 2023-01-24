import { useState } from 'react';

function Pagination(props) {
  const pageNumbers = [];
  const [focusedNumber, setFocusedNumber] = useState(1);

  for (let i = 1; i <= Math.ceil(props.total / props.perPage); i++) {
    pageNumbers.push(i);
  }

  function setFocus(number) {
    setFocusedNumber(number);
  }

  return (
    <ul className='pagination'>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            className={`pagination-number ${
              number == focusedNumber ? 'pagination-current' : ''
            }`}
            onClick={() => {
              props.paginate(number);
              setFocus(number);
            }}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}
export default Pagination;
