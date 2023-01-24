function SingleCountryCard(props) {
  return (
    <>
      <div className='flex card-top'>
        <h3>{props.name}</h3>
        <h3>Region: {props.region}</h3>
      </div>
      <h4 className='card-bottom'>Area size: {props.area}km&#178;</h4>
    </>
  );
}
export default SingleCountryCard;
