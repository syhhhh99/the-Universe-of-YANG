import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS, SITE_NAME } from '@/constants/navigation';

export function Navigation() {
  return (
    <header className="site-header">
      <nav className="container site-nav" aria-label="Main navigation">
        <NavLink className="site-brand" to="/">
          {SITE_NAME}
        </NavLink>
        <div className="nav-links">
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink className="nav-link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
