import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();

  return (
    <div>
      <select 
        value={router.locale}
        onChange={(e) =>
          router.push(
            router.asPath,
            undefined,
            { locale: e.target.value }
          )
        }
      >
        <option value='en'>English</option>
        <option value='ru'>Русский</option>
        <option value='az'>Azərbaycan</option>
      </select>
    </div>
  );
}