function Pagination(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.total / props.perPage); i++) {
    pageNumbers.push(i);
  }

  console.log(`props.currentPage = `, props.currentPage);
  // setFocusedNumber(props.currentPage);
  return (
    <ul className='pagination'>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            className={`pagination-number ${
              number == props.currentPage ? 'pagination-current' : ''
            }`}
            onClick={() => {
              props.paginate(number);
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
