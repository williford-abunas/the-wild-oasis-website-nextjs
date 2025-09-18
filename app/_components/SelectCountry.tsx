import { getCountries } from "@/app/_lib/data-service";


type Country = {
  name: string;
  flag: string;
};

type SelectCountryProps = {
  defaultCountry: string;
  defaultFlag: string;
  name: string;
  id: string;
  className?: string;
};

async function SelectCountry({
  defaultCountry,
  defaultFlag,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries: Country[] = await getCountries();

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${defaultFlag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
