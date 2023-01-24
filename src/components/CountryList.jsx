import { useEffect, useState } from 'react';
import SingleCountryCard from './SingleCountryCard';
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
        setCountriesArr(
          data.sort((a, b) => a.name.localeCompare(b.name, undefined))
        );
        setOriginalCountriesArr(
          data.sort((a, b) => a.name.localeCompare(b.name, undefined))
        );
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
    <section>
      <button onClick={handleSortFilter} className='btn sort-btn'>
        {filters.sorted ? 'Sort A-Z' : 'Sort Z-A'}
      </button>
      <div className='flex countries-section'>
        <div className='flex filter-panel'>
          <h2>Filters</h2>
          <button onClick={handleSizeFilter} className='btn'>
            Countries smaller than Lithuania{' '}
            <i
              className={`fa ${
                filters.size ? 'fa-check-square-o' : 'fa-square-o'
              }`}
              aria-hidden='true'
            ></i>
          </button>
          <button onClick={handleOceaniaFilter} className='btn'>
            Countries inside Oceania{' '}
            <i
              className={`fa ${
                filters.region ? 'fa-check-square-o' : 'fa-square-o'
              }`}
              aria-hidden='true'
            ></i>
          </button>
        </div>
        {countriesArr.length ? (
          <ul className='countries-list'>
            {countriesArr.map((countryObj) => (
              <li key={countryObj.name} className='country-card'>
                <SingleCountryCard
                  name={countryObj.name}
                  region={countryObj.region}
                  area={countryObj.area}
                />
              </li>
            ))}
          </ul>
        ) : (
          <h2>Loading countries...</h2>
        )}
      </div>
    </section>
  );
}
export default CountryList;
