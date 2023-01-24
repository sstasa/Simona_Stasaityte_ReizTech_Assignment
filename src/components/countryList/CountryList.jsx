import { useEffect, useState } from 'react';
function CountryList(props) {
  const url = 'https://restcountries.com/v2/all?fields=name,region,area';
  const [countriesArr, setCountriesArr] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setCountriesArr(data));
  }, [url]);

  function sorting() {
    let reversedCountriesArr = [...countriesArr].reverse();
    setCountriesArr(reversedCountriesArr);
    setSorted(!sorted);
  }

  function filterSmaller() {
    let smallerThanLTArr = [...countriesArr].filter(
      (country) => country.area < 65300
    );

    setCountriesArr(smallerThanLTArr);
  }

  function filterOceania() {
    let oceaniaArr = [...countriesArr].filter(
      (country) => country.region === 'Oceania'
    );

    setCountriesArr(oceaniaArr);
  }

  return (
    <div>
      <button onClick={sorting}>{sorted ? 'Sort A-Z' : 'Sort Z-A'}</button>
      <button onClick={filterSmaller}>Countries smaller than Lithuania</button>
      <button onClick={filterOceania}>Countries inside Oceania</button>
      {countriesArr.length && (
        <ul>
          {countriesArr.map((countryObj) => (
            <li key={countryObj.name}>
              {countryObj.name} Region:{countryObj.region} Area:
              {countryObj.area}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default CountryList;
