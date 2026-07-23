import type { InputHTMLAttributes } from 'react';
export function SearchBox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input" type="search" aria-label="Search" {...props} />;
}
