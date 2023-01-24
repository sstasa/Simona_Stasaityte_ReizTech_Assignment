import { useEffect, useState } from 'react';
function CountryList(props) {
  const url = 'https://restcountries.com/v2/all?fields=name,region,area';
  const [originalCountriesArr, setOriginalCountriesArr] = useState([]);
  const [countriesArr, setCountriesArr] = useState([]);
  const [filters, setFilters] = useState({
    sorted: false,
    size: false,
    region: false,
  });

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCountriesArr(data);
        setOriginalCountriesArr(data);
      });
  }, [url]);

  function filterSize(array) {
    let filteredArray = array.filter((country) => country.area < 65300);
    return filteredArray;
  }
  function filterRegion(array) {
    let filteredArray = array.filter((country) => country.region === 'Oceania');
    return filteredArray;
  }

  function handleSortFilter() {
    setCountriesArr([...countriesArr].reverse());
    setFilters({ ...filters, sorted: !filters.sorted });
  }

  function handleSizeFilter() {
    if (filters.size) {
      if (filters.region && filters.sorted) {
        setCountriesArr(filterRegion(originalCountriesArr).reverse());
      } else if (filters.region) {
        setCountriesArr(filterRegion(originalCountriesArr));
      } else if (filters.sorted) {
        setCountriesArr(originalCountriesArr.reverse());
      } else {
        setCountriesArr(originalCountriesArr);
      }
    } else {
      setCountriesArr(filterSize(countriesArr));
    }
    setFilters({ ...filters, size: !filters.size });
  }

  function handleOceaniaFilter() {
    if (filters.region) {
      if (filters.size && filters.sorted) {
        setCountriesArr(filterSize(originalCountriesArr).reverse());
      } else if (filters.size) {
        setCountriesArr(filterSize(originalCountriesArr));
      } else if (filters.sorted) {
        setCountriesArr(originalCountriesArr.reverse());
      } else {
        setCountriesArr(originalCountriesArr);
      }
    } else {
      setCountriesArr(filterRegion(countriesArr));
    }
    setFilters({ ...filters, region: !filters.region });
  }

  return (
    <div>
      <button onClick={handleSortFilter}>
        {filters.sorted ? 'Sort A-Z' : 'Sort Z-A'}
      </button>
      <button
        onClick={handleSizeFilter}
        className={filters.size ? 'btn-selected' : ''}
      >
        Countries smaller than Lithuania
      </button>
      <button
        onClick={handleOceaniaFilter}
        className={filters.region ? 'btn-selected' : ''}
      >
        Countries inside Oceania
      </button>
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
