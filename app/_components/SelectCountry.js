import { getCountries } from '@/app/_lib/data-service';
// // from permenant JSON data
// import jsonCountries from '@/app/_lib/countries.json';
// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  // const countries = jsonCountries;
  // console.log(countries);
  // const flag =
  //   countries.find((country) => country.names.common === defaultCountry)?.flag
  //   ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={defaultCountry}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.length > 0
        && countries.map((c) => (
          <option
            key={c.names.common}
            // {
            //   nationality: `${c.names.common}`,
            //   countryFlag: `${c.flag.url_svg}`,
            //   I will handle the flag in the actions.js
            // }
            value={`${c.names.common}%${c.flag.url_svg}`}
          // value={`${c.names.common}`}
          >
            {c.names.common}
          </option>
        ))}
    </select>
  );
}

export default SelectCountry;
