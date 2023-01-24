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

  function setSorting() {
    let reversedCountriesArr = [...countriesArr].reverse();
    setCountriesArr(reversedCountriesArr);
    setSorted(!sorted);
  }

  //65300 LITHUANIA AREA

  return (
    <div>
      <button onClick={setSorting}>Sort Z-A</button>
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
