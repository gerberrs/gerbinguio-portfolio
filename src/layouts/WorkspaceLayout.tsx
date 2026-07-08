import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Facebook,
  FileText,
  FolderKanban,
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageSquare,
  PanelLeft,
  Phone,
  X,
} from "lucide-react";
import { projects } from "../data/projects";
import { careerRoles } from "../data/career";

const navItems = [
  { name: "Projects", to: "/work/projects", icon: FolderKanban },
  { name: "Career", to: "/work/career", icon: Briefcase },
  { name: "Contact", to: "/work/contact", icon: Mail },
];

const contactLinks = [
  { label: "gerbinguio@gmail.com", href: "mailto:gerbinguio@gmail.com", icon: Mail },
  { label: "+63 994 040 1002", href: "tel:+639940401002", icon: Phone },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gerb-victorino-41a183366/",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/gerberrs", icon: Github },
  {
    label: "Facebook",
    href: "https://facebook.com/gerbinguio.victorino.3",
    icon: Facebook,
  },
  {
    label: "OnlineJobs",
    href: "https://www.onlinejobs.ph/jobseekers/info/4175877",
    icon: Globe,
  },
  { label: "Download resume", href: "/Victorino-2026-CV.pdf", icon: FileText },
];

const sideItemClass =
  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-white/5 hover:text-ink-900 transition-colors group";
const sideIconClass =
  "w-3.5 h-3.5 flex-shrink-0 text-ink-500 group-hover:text-blue-deep transition-colors";

/** Contextual list under the nav — mirrors whichever section is open. */
const SidebarRecents = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/work/career")) {
    return (
      <>
        <p className="px-3 text-[11px] uppercase tracking-widest text-ink-500 font-semibold mb-2">
          Career history
        </p>
        <div className="space-y-0.5">
          {careerRoles.map((role) => (
            <Link
              key={role.slug}
              to={`/work/career?r=${role.slug}`}
              onClick={onNavigate}
              className={sideItemClass}
            >
              <Briefcase className={sideIconClass} />
              <span className="min-w-0">
                <span className="block truncate">{role.title}</span>
                <span className="block text-[10px] text-ink-500 truncate">
                  {role.period}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (pathname.startsWith("/work/contact")) {
    return (
      <>
        <p className="px-3 text-[11px] uppercase tracking-widest text-ink-500 font-semibold mb-2">
          Reach me
        </p>
        <div className="space-y-0.5">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              download={link.href.endsWith(".pdf") || undefined}
              className={sideItemClass}
            >
              <link.icon className={sideIconClass} />
              <span className="truncate">{link.label}</span>
            </a>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <p className="px-3 text-[11px] uppercase tracking-widest text-ink-500 font-semibold mb-2">
        Recent projects
      </p>
      <div className="space-y-0.5">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/work/projects?p=${project.slug}`}
            onClick={onNavigate}
            className={sideItemClass}
          >
            <MessageSquare className={sideIconClass} />
            <span className="truncate">{project.title}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
      <span className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-base-950 font-display text-sm flex-shrink-0">
        G
      </span>
      <span className="font-display text-ink-900 text-sm tracking-wide">
        GERBINGUIO
      </span>
    </div>

    {/* Back to home — styled like Claude's "New chat" */}
    <div className="px-3 pb-2">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-deep font-semibold text-sm hover:bg-blue-soft/60 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
    </div>

    {/* Main nav */}
    <nav className="px-3 space-y-0.5">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? "glass text-ink-900 font-semibold"
                : "text-ink-700 hover:bg-white/5 hover:text-ink-900"
            }`
          }
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          {item.name}
        </NavLink>
      ))}
    </nav>

    {/* Contextual list — recent projects / career history / contact links */}
    <div className="mt-6 px-3 flex-1 overflow-y-auto scrollbar-hide">
      <SidebarRecents onNavigate={onNavigate} />
    </div>

    {/* Profile footer */}
    <div className="border-t border-white/10 px-4 py-3 flex items-center gap-3">
      <img
        src="/devPicture.png"
        alt="Gerbinguio"
        className="w-9 h-9 rounded-full object-cover border-2 border-blue flex-shrink-0"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink-900 truncate">
          Gerbinguio
        </p>
        <p className="text-[11px] text-ink-500 truncate">
          CRM &amp; Automation Specialist
        </p>
      </div>
    </div>
  </div>
);

const WorkspaceLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  // Reset panel scroll when switching pages
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const currentPage =
    navItems.find((item) => location.pathname.startsWith(item.to))?.name ??
    "Workspace";

  return (
    <div className="h-screen w-full text-ink-900 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[rgba(11,11,17,0.95)] z-30">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open sidebar"
          className="p-2 -ml-2 rounded-lg text-ink-700 hover:bg-white/5 transition-colors"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <span className="font-display text-sm text-ink-900">{currentPage}</span>
        <span className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-base-950 font-display text-xs">
          G
        </span>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[rgba(11,11,18,0.97)] border-r border-white/10 shadow-2xl animate-[slideInLeft_0.25s_ease-out]">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close sidebar"
              className="absolute top-4 right-3 p-1.5 rounded-lg text-ink-500 hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 h-full border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Main panel */}
      <main className="flex-1 min-h-0 min-w-0 p-2 md:p-3 md:pl-0">
        <div
          ref={mainRef}
          className="workspace-scroll glass-panel h-full w-full rounded-3xl overflow-y-auto overflow-x-hidden"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
