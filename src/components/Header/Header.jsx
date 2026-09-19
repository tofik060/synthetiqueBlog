import { Container, LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const isCurrent = (slug) =>
    slug === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(slug);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <Container>
        <nav className="flex min-h-16 items-center gap-4 py-3">
          <Logo />
          <ul className="ml-auto flex flex-wrap items-center gap-1 sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => navigate(item.slug)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isCurrent(item.slug)
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
