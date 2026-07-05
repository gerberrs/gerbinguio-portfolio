import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  FolderKanban,
  Mail,
  MessageSquare,
  PanelLeft,
  X,
} from "lucide-react";
import { projects } from "../data/projects";

const navItems = [
  { name: "Projects", to: "/work/projects", icon: FolderKanban },
  { name: "Career", to: "/work/career", icon: Briefcase },
  { name: "Contact", to: "/work/contact", icon: Mail },
];

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
      <span className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-sand-50 font-display text-sm flex-shrink-0">
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
                ? "bg-sand-50 text-ink-900 font-semibold shadow-sm"
                : "text-ink-700 hover:bg-sand-100/70 hover:text-ink-900"
            }`
          }
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          {item.name}
        </NavLink>
      ))}
    </nav>

    {/* Recents — fake recent chats linking to project case studies */}
    <div className="mt-6 px-3 flex-1 overflow-y-auto scrollbar-hide">
      <p className="px-3 text-[11px] uppercase tracking-widest text-ink-500 font-semibold mb-2">
        Recents
      </p>
      <div className="space-y-0.5">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/work/projects?p=${project.slug}`}
            onClick={onNavigate}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-sand-100/70 hover:text-ink-900 transition-colors group"
          >
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 text-ink-500 group-hover:text-blue-deep transition-colors" />
            <span className="truncate">{project.title}</span>
          </Link>
        ))}
      </div>
    </div>

    {/* Profile footer */}
    <div className="border-t border-sand-300 px-4 py-3 flex items-center gap-3">
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
    <div className="h-screen w-full bg-sand-200 text-ink-900 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-sand-300 bg-sand-200 z-30">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open sidebar"
          className="p-2 -ml-2 rounded-lg text-ink-700 hover:bg-sand-100 transition-colors"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <span className="font-display text-sm text-ink-900">{currentPage}</span>
        <span className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-sand-50 font-display text-xs">
          G
        </span>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-ink-900/40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sand-200 shadow-2xl animate-[slideInLeft_0.25s_ease-out]">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close sidebar"
              className="absolute top-4 right-3 p-1.5 rounded-lg text-ink-500 hover:bg-sand-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 h-full">
        <SidebarContent />
      </aside>

      {/* Main panel */}
      <main className="flex-1 min-h-0 min-w-0 p-2 md:p-3 md:pl-0">
        <div
          ref={mainRef}
          className="workspace-scroll h-full w-full bg-sand-50 border border-sand-300 rounded-2xl overflow-y-auto overflow-x-hidden"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
