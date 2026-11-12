
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import logo from '../../../assets/vayro.png';
import { authClient } from '@/lib/auth-client';

import {
  FiGrid,
  FiShoppingBag,
  FiPlus,
  FiPackage,
  FiLayers,
  FiArchive,
  FiMenu,
  FiImage,
  FiCreditCard,
  FiUsers,
  FiSettings,
  FiUser,
  FiLogOut,
  FiX,
  FiChevronRight,
} from 'react-icons/fi';


// ==========================================
// ADMIN NAVIGATION
// ==========================================

const adminMenu = [
  {
    title: 'WORKSPACE',
    items: [
      { key: 'overview', label: 'Overview', href: '/dashboard/admin', icon: FiGrid },
      { key: 'orders', label: 'Orders', href: '/dashboard/orders', icon: FiShoppingBag },
      { key: 'manual-order', label: 'Create Manual Order', href: '/dashboard/orders/new', icon: FiPlus },
    ],
  },
  {
    title: 'CATALOG',
    items: [
      { key: 'products', label: 'Products', href: '/dashboard/admin/products', icon: FiPackage },
      { key: 'categories', label: 'Categories & Variants', href: '/dashboard/admin/categories', icon: FiLayers },
      { key: 'inventory', label: 'Inventory', href: '/dashboard/admin/inventory', icon: FiArchive },
    ],
  },
  {
    title: 'STOREFRONT',
    items: [
      { key: 'navigation', label: 'Navigation Menu', href: '/dashboard/admin/navigation', icon: FiMenu },
      { key: 'banners', label: 'Homepage Banners', href: '/dashboard/admin/banners', icon: FiImage },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { key: 'payments', label: 'Payments & COD', href: '/dashboard/admin/payments', icon: FiCreditCard },
      { key: 'staff', label: 'Staff Management', href: '/dashboard/admin/staff', icon: FiUsers },
      { key: 'settings', label: 'Store Settings', href: '/dashboard/admin/settings', icon: FiSettings },
    ],
  },
];


// ==========================================
// STAFF NAVIGATION
// ==========================================

const staffMenu = [
  {
    title: 'WORKSPACE',
    items: [
      { key: 'overview', label: 'Overview', href: '/dashboard/staff', icon: FiGrid },
      { key: 'orders', label: 'Orders', href: '/dashboard/orders', icon: FiShoppingBag },
      { key: 'manual-order', label: 'Create Manual Order', href: '/dashboard/orders/new', icon: FiPlus },
      { key: 'account', label: 'My Account', href: '/dashboard/account', icon: FiUser },
    ],
  },
];


// ==========================================
// LOADING SCREEN
// ==========================================

function LoadingScreen() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#F7F7F7]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-black" />
        <p className="text-sm text-[#737373]">
          Loading workspace...
        </p>
      </div>
    </div>
  );
}


// ==========================================
// DASHBOARD LAYOUT
// ==========================================

export default function DashboardLayout({ children }) {

  const router = useRouter();
  const pathname = usePathname();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar after navigation

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);


  // Get authenticated session

  useEffect(() => {

    let mounted = true;

    const getSession = async () => {

      try {

        const { data, error } = await authClient.getSession();

        if (!mounted) return;

        if (error || !data?.user) {
          router.replace('/signin');
          return;
        }

        setSession(data);

      } catch (error) {

        console.error('Session Error:', error);

        if (mounted) {
          router.replace('/signin');
        }

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }

    };

    getSession();

    return () => {
      mounted = false;
    };

  }, [router]);


  // User and role

  const user = session?.user;

  const role = String(user?.role || '')
    .toLowerCase()
    .trim();

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';

  const userDashboard = isAdmin
    ? '/dashboard/admin'
    : isStaff
      ? '/dashboard/staff'
      : null;


  // Role protection

  const isBlockedRoute =
    (isAdmin && pathname.startsWith('/dashboard/staff')) ||
    (isStaff && pathname.startsWith('/dashboard/admin'));

  useEffect(() => {

    if (loading) return;

    if (!user) {
      router.replace('/signin');
      return;
    }

    if (!userDashboard) { 
      router.replace('/');
      return;
    }

    if (pathname === '/dashboard' || isBlockedRoute) {
      router.replace(userDashboard);
    }

  }, [
    loading,
    user,
    userDashboard,
    pathname,
    isBlockedRoute,
    router,
  ]);


  // Loading and redirect

  if (
    loading ||
    !user ||
    !userDashboard ||
    pathname === '/dashboard' ||
    isBlockedRoute
  ) {
    return <LoadingScreen />;
  }


  // Role based navigation

  const menu = isAdmin ? adminMenu : staffMenu;

  const allItems = menu.flatMap(group => group.items);

  const activeItem = allItems
    .filter(item =>
      pathname === item.href ||
      pathname.startsWith(item.href + '/')
    )
    .sort((a, b) => b.href.length - a.href.length)[0];


  // Logout

  const handleLogout = async () => {

    try {

      await authClient.signOut();

      router.replace('/signin');
      router.refresh();

    } catch (error) {

      console.error('Logout Error:', error);

    }

  };


  // User avatar

  const UserAvatar = ({ size = 'normal' }) => {

    const dimensions = size === 'large'
      ? 'h-10 w-10'
      : 'h-9 w-9';

    if (user.image) {
      return (
        <img
          src={user.image}
          alt={user.name || 'User'}
          className={`${dimensions} shrink-0 rounded-full border border-[#E5E5E5] object-cover`}
        />
      );
    }

    return (
      <div className={`
        ${dimensions}
        flex shrink-0 items-center justify-center
        rounded-full bg-[#F0F0F0] text-[#3C3C3C]
      `}>
        <FiUser size={18} />
      </div>
    );

  };


  // ==========================================
  // MAIN LAYOUT
  // ==========================================

  return (

    <div className="
      min-h-dvh w-full overflow-x-clip
      bg-[#F7F7F7]
      lg:grid lg:grid-cols-[260px_minmax(0,1fr)]
      lg:gap-4 lg:p-4
    ">


      {/* MOBILE OVERLAY */}

      {mobileOpen && (

        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />

      )}


      {/* ==================================
          SIDEBAR
      ================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-[min(86vw,270px)]
          flex-col overflow-hidden
          border-r border-[#E5E5E5]
          bg-white
          transition-transform duration-300 ease-in-out

          lg:sticky lg:top-4
          lg:h-[calc(100dvh-2rem)]
          lg:w-[260px]
          lg:translate-x-0
          lg:rounded-2xl
          lg:border

          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* BRAND */}

        <div className="
          flex h-[66px] shrink-0
          items-center justify-between
          border-b border-[#EEEEEE]
          px-5
        ">

          <Link href={userDashboard}>
            <div className="rounded-md bg-black px-3 py-1.5">
              <Image
                src={logo}
                alt="VAYRO"
                width={105}
                height={38}
                priority
                className="h-auto w-[105px] object-contain"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-[#3C3C3C] hover:bg-[#F7F7F7] lg:hidden"
          >
            <FiX size={20} />
          </button>

        </div>


        {/* USER PROFILE + SIGN OUT (TOP) */}

        <div className="
          shrink-0 border-b border-[#EEEEEE]
          px-4 py-4
        ">

          <div className="flex items-center gap-3">

            <UserAvatar size="large" />

            <div className="min-w-0 flex-1">

              <p className="truncate text-[13px] font-semibold text-[#171717]">
                {user.name || 'VAYRO User'}
              </p>

              <p className="mt-0.5 truncate text-[11px] text-[#737373]">
                {user.email}
              </p>

              <div className="mt-1.5 flex items-center gap-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#3C3C3C]" />

                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">
                  {role} workspace
                </span>

              </div>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign Out"
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg border border-[#E5E5E5]
                text-[#737373]
                transition-colors
                hover:border-black
                hover:bg-black
                hover:text-white
              "
            >
              <FiLogOut size={17} />
            </button>

          </div>

        </div>


        {/* SCROLLABLE NAVIGATION */}

        <nav
          aria-label="Dashboard navigation"
          className="
            min-h-0 flex-1
            overflow-x-hidden overflow-y-auto
            overscroll-contain
            px-3 py-6
          "
        >

          <div className="space-y-7">

            {menu.map(group => (

              <div key={group.title}>

                <p className="
                  mb-3 px-3
                  text-[10px] font-bold
                  tracking-[0.16em]
                  text-[#999999]
                ">
                  {group.title}
                </p>

                <div className="space-y-1">

                  {group.items.map(item => {

                    const Icon = item.icon;

                    const active = activeItem?.key === item.key;

                    return (

                      <Link
                        key={item.key}
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`
                          group flex min-h-[46px] w-full
                          items-center gap-3
                          rounded-lg px-3.5 py-3
                          text-[13px] font-medium
                          transition-all duration-200
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#3C3C3C]

                          ${
                            active
                              ? 'bg-black text-white'
                              : 'text-[#555555] hover:bg-[#F3F3F3] hover:text-black'
                          }
                        `}
                      >

                        <Icon
                          size={18}
                          strokeWidth={1.8}
                          className="shrink-0"
                        />

                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>

                        {active && (
                          <FiChevronRight
                            size={15}
                            className="shrink-0"
                          />
                        )}

                      </Link>

                    );

                  })}

                </div>

              </div>

            ))}

          </div>

        </nav>


        {/* SIDEBAR FOOTER */}

        <div className="
          shrink-0 border-t border-[#EEEEEE]
          px-4 py-3
        ">

          <p className="text-center text-[10px] font-medium tracking-wider text-[#999999]">
            VAYRO COMMERCE © 2026
          </p>

        </div>

      </aside>


      {/* ==================================
          MAIN FRAME
      ================================== */}

      <div className="
        flex min-h-dvh min-w-0
        flex-col bg-white

        lg:min-h-[calc(100dvh-2rem)]
        lg:rounded-2xl
        lg:border lg:border-[#E5E5E5]
      ">


        {/* ==================================
            TOPBAR
        ================================== */}

        <header className="
          sticky top-0 z-30
          flex h-[68px] shrink-0
          items-center justify-between
          gap-3
          border-b border-[#EEEEEE]
          bg-white
          px-4 sm:px-6 lg:px-7
          lg:rounded-t-2xl
        ">


          {/* LEFT SIDE */}

          <div className="flex min-w-0 items-center gap-3">

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg border border-[#E5E5E5]
                text-[#3C3C3C]
                transition hover:bg-[#F7F7F7]
                lg:hidden
              "
            >
              <FiMenu size={19} />
            </button>


            {/* PAGE TITLE */}

            <div className="min-w-0">

              <div className="hidden items-center gap-2 sm:flex">

                <span className="text-[10px] font-medium tracking-wider text-[#999999]">
                  VAYRO
                </span>

                <span className="text-[#CCCCCC]">/</span>

                <span className="text-[10px] font-medium uppercase tracking-wider text-[#737373]">
                  {role}
                </span>

              </div>

              <h1 className="
                truncate text-sm font-semibold
                text-[#171717]
                sm:mt-1 sm:text-base
              ">
                {activeItem?.label || 'Dashboard'}
              </h1>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">


            {/* SEPARATOR */}

            <div className="hidden h-7 w-px bg-[#E5E5E5] sm:block" />


            {/* USER PROFILE */}

            <div className="flex items-center gap-2.5">

              <div className="hidden text-right sm:block">

                <p className="max-w-[150px] truncate text-xs font-semibold text-[#171717]">
                  {user.name || user.email}
                </p>

                <p className="mt-0.5 text-[10px] capitalize text-[#888888]">
                  {role}
                </p>

              </div>

              <UserAvatar />

            </div>

          </div>

        </header>


        {/* ==================================
            PAGE CONTENT
        ================================== */}

        <main className="
          min-h-0 flex-1
          bg-[#F7F7F7]
          p-4 sm:p-6 lg:p-7
          lg:rounded-b-2xl
        ">

          <div className="
            mx-auto w-full
            max-w-[1600px]
            min-w-0
          ">

            {children}

          </div>

        </main>

      </div>

    </div>

  );

}
