
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import logo from '../assets/vayro.png';
import { categories } from '@/data/navigation';
import { authClient } from '@/lib/auth-client';

import { IoPersonOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import { VscHeartFilled } from 'react-icons/vsc';

import {
  FiSearch,
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiPhoneCall,
  FiGrid,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';


// ==========================================
// BRAND COLORS
// ==========================================

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  charcoal: '#3C3C3C',
  surface: '#F7F7F7',
  border: '#E5E5E5',
  muted: '#737373',
};


// ==========================================
// PROMO IMAGES
// ==========================================

const promoImages = [
  {
    src: '/images/banners/hero-1.png',
    title: 'THE VAYRO EDIT',
    subtitle: 'Discover the collection',
  },
  {
    src: '/images/banners/hero-2.png',
    title: 'NEW SEASON',
    subtitle: 'Find your everyday style',
  },
];

function AccountDropdown({
  user,
  role,
  isAdmin,
  isStaff,
  isPending,
  onNavigate,
  onSignOut,
}) {

  return (

    <div className="w-[260px] overflow-hidden rounded-xl border border-[#E5E5E5] bg-white text-black shadow-xl">

      {/* HEADER */}

      <div className="border-b border-[#E5E5E5] bg-[#F7F7F7] p-4">

        {isPending ? (

          <p className="text-sm text-[#737373]">
            Checking account...
          </p>

        ) : user ? (

          <>
            <p className="truncate text-sm font-semibold text-black">
              {user.name || 'VAYRO Customer'}
            </p>

            <p className="mt-1 truncate text-xs text-[#737373]">
              {user.email}
            </p>

            <span className="mt-3 inline-block rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3C3C3C]">
              {role || 'Customer'}
            </span>
          </>

        ) : (

          <>
            <p className="text-sm font-semibold">
              Welcome to VAYRO
            </p>

            <p className="mt-1 text-xs text-[#737373]">
              Sign in to access your account.
            </p>
          </>

        )}

      </div>


      {/* MENU ITEMS */}

      <div className="p-2">

        {!isPending && !user && (

          <>
            <Link
              href="/signin"
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#3C3C3C] transition hover:bg-[#F7F7F7] hover:text-black"
            >
              <FiLogIn size={18} />
              Sign In
            </Link>

            <Link
              href="/signup"
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#3C3C3C] transition hover:bg-[#F7F7F7] hover:text-black"
            >
              <FiUserPlus size={18} />
              Create Account
            </Link>
          </>

        )}


        {!isPending && user && (

          <>

            {/* ADMIN DASHBOARD */}

            {isAdmin && (

              <Link
                href="/dashboard/admin"
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#3C3C3C] transition hover:bg-[#F7F7F7] hover:text-black"
              >
                <FiGrid size={18} />
                Admin Dashboard
              </Link>

            )}


            {/* STAFF DASHBOARD */}

            {isStaff && (

              <Link
                href="/dashboard/staff"
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#3C3C3C] transition hover:bg-[#F7F7F7] hover:text-black"
              >
                <FiGrid size={18} />
                Staff Dashboard
              </Link>

            )}


            {/* CUSTOMER ACCOUNT */}

            {!isAdmin && !isStaff && (

              <Link
                href="/account"
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#3C3C3C] transition hover:bg-[#F7F7F7] hover:text-black"
              >
                <FiUser size={18} />
                My Account
              </Link>

            )}

          </>

        )}

      </div>


      {/* SIGN OUT */}

      {!isPending && user && (

        <div className="border-t border-[#E5E5E5] p-2">

          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#3C3C3C] transition hover:bg-[#F7F7F7] hover:text-black"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>

        </div>

      )}

    </div>

  );
}


// ==========================================
// MAIN NAVBAR
// ==========================================

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const desktopAccountRef = useRef(null);
  const mobileAccountRef = useRef(null);


  // ========================================
  // AUTHENTICATION & ROLE
  // ========================================

  const user = session?.user;

  const role = String(user?.role || '').toLowerCase();

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';



  useEffect(() => {

    const handleOutsideClick = (event) => {

      const insideDesktop =
        desktopAccountRef.current?.contains(event.target);

      const insideMobile =
        mobileAccountRef.current?.contains(event.target);

      if (!insideDesktop && !insideMobile) {
        setAccountMenuOpen(false);
      }

    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false);
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };

  }, []);


  // Close dropdown when navigating

  useEffect(() => {
    setAccountMenuOpen(false);
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);


  const toggleAccountMenu = () => {

    setAccountMenuOpen((prev) => !prev);

    setActiveMenu(null);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);

  };


  // ========================================
  // SIGN OUT
  // ========================================

  const handleSignOut = async () => {

    try {

      await authClient.signOut();

      setAccountMenuOpen(false);

      router.replace('/signin');
      router.refresh();

    } catch (error) {

      console.error('Sign out failed:', error);

    }

  };


  // ========================================
  // CATEGORY HELPERS
  // ========================================

  const activeCategory = categories.find(
    (category) => category.id === activeMenu
  );

  const categoryUrl = (category, slug) =>
    `/shop?category=${category}&subcategory=${slug}`;


  const toggleCategory = (id) => {

    setActiveMenu((prev) => prev === id ? null : id);

    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);

  };


  // ========================================
  // MOBILE SEARCH
  // ========================================

  const toggleMobileSearch = () => {

    setMobileSearchOpen((prev) => !prev);

    setMobileMenuOpen(false);
    setActiveMenu(null);
    setAccountMenuOpen(false);

  };


  const callHref = process.env.NEXT_PUBLIC_STORE_PHONE
    ? `tel:${process.env.NEXT_PUBLIC_STORE_PHONE}`
    : '/contact';


  // ========================================
  // ACCOUNT DROPDOWN PROPS
  // ========================================

  const accountProps = {
    user,
    role,
    isAdmin,
    isStaff,
    isPending,
    onNavigate: () => setAccountMenuOpen(false),
    onSignOut: handleSignOut,
  };


  // ========================================
  // RETURN
  // ========================================

  return (

    <>

      <header className="relative z-50 w-full">


        {/* =====================================
            DESKTOP NAVBAR
        ===================================== */}

        <div
          className="relative hidden bg-[#000000] text-white md:block"
          onMouseLeave={() => setActiveMenu(null)}
        >

          {/* TOP HEADER */}

          <div className="border-b border-white/10">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

              <div className="flex h-[68px] items-center justify-between gap-8">

                {/* LOGO */}

                <Link href="/" className="shrink-0">

                  <Image
                    src={logo}
                    alt="VAYRO"
                    width={150}
                    height={50}
                    priority
                    className="h-[42px] w-auto object-contain"
                  />

                </Link>


                {/* SEARCH */}

                <form
                  action="/shop"
                  method="GET"
                  className="flex flex-1 justify-center"
                >

                  <div className="relative w-full max-w-[620px]">

                    <input
                      type="search"
                      name="search"
                      placeholder="Search products..."
                      className="h-[42px] w-full rounded-full border border-[#E5E5E5] bg-white px-5 pr-12 text-sm text-black outline-none placeholder:text-[#737373] focus:border-[#3C3C3C]"
                    />

                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-[#3C3C3C]" />

                  </div>

                </form>


                {/* ICONS */}

                <div className="flex shrink-0 items-center gap-4">

                  {/* ACCOUNT DROPDOWN */}

                  <div className="relative" ref={desktopAccountRef}>

                    <button
                      type="button"
                      onClick={toggleAccountMenu}
                      aria-label="Account menu"
                      aria-expanded={accountMenuOpen}
                      className="flex h-10 w-10 items-center justify-center rounded-lg  text-[22px] transition hover:bg-white hover:text-black"
                    >
                      <IoPersonOutline />
                    </button>


                    {accountMenuOpen && (

                      <div className="absolute right-0 top-full z-[80] mt-3">

                        <AccountDropdown {...accountProps} />

                      </div>

                    )}

                  </div>


                  {/* WISHLIST */}

                  <Link
                    href="/wishlist"
                    aria-label="Wishlist"
                    className="flex h-10 w-10 items-center justify-center text-[22px] transition hover:text-gray-300"
                  >
                    <VscHeartFilled />
                  </Link>


                  {/* CART */}

                  <Link
                    href="/cart"
                    aria-label="Shopping Bag"
                    className="flex h-10 w-10 items-center justify-center text-[22px] transition hover:text-gray-300"
                  >
                    <BsHandbag />
                  </Link>

                </div>

              </div>

            </div>

          </div>


          {/* CATEGORY NAV */}

          <nav className="mx-auto max-w-7xl px-6 lg:px-8">

            <ul className="flex h-[42px] items-center justify-center gap-9 whitespace-nowrap text-[13px] font-semibold tracking-[0.12em] lg:gap-12">

              {categories.map((category) => (

                <li key={category.id}>

                  <button
                    type="button"
                    onMouseEnter={() => setActiveMenu(category.id)}
                    onFocus={() => setActiveMenu(category.id)}
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={activeMenu === category.id}
                    className={`relative py-3 transition-colors hover:text-[#E5E5E5] ${
                      activeMenu === category.id
                        ? 'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white'
                        : ''
                    }`}
                  >
                    {category.label}
                  </button>

                </li>

              ))}

            </ul>

          </nav>


          {/* DESKTOP MEGA MENU */}

          {activeCategory && (

            <div className="absolute left-0 right-0 top-full z-50 border-t border-[#E5E5E5] bg-white text-[#3C3C3C] shadow-xl">

              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-8 py-8">

                {/* LINKS */}

                <div className="col-span-2 grid grid-cols-2 gap-8">

                  {activeCategory.groups.map((group) => (

                    <div key={group.title}>

                      <h3 className="mb-4 text-xs font-semibold tracking-[0.08em] text-[#737373]">
                        {group.title}
                      </h3>

                      <ul className="space-y-3">

                        {group.links.map((link) => (

                          <li key={link.slug}>

                            <Link
                              href={categoryUrl(activeCategory.id, link.slug)}
                              onClick={() => setActiveMenu(null)}
                              className="text-sm text-[#3C3C3C] transition hover:text-black"
                            >
                              {link.name}
                            </Link>

                          </li>

                        ))}

                      </ul>

                    </div>

                  ))}

                </div>


                {/* PROMO IMAGES */}

                {promoImages.map((image) => (

                  <Link
                    href={`/shop?category=${activeCategory.id}`}
                    key={image.title}
                    onClick={() => setActiveMenu(null)}
                    className="group relative block aspect-[4/3] overflow-hidden bg-[#F7F7F7]"
                  >

                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 text-white">

                      <h3 className="text-base font-semibold">
                        {image.title}
                      </h3>

                      <p className="mt-1 text-xs">
                        {image.subtitle}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>


              {/* VIEW ALL */}

              <div className="border-t border-[#E5E5E5] px-8 py-4 text-center">

                <Link
                  href={`/shop?category=${activeCategory.id}`}
                  onClick={() => setActiveMenu(null)}
                  className="text-[11px] font-semibold tracking-[0.15em] text-[#3C3C3C] transition hover:text-black"
                >
                  VIEW ALL {activeCategory.label}
                </Link>

              </div>

            </div>

          )}

        </div>


        {/* =====================================
            MOBILE NAVBAR
        ===================================== */}

        <div className="bg-white text-[#000000] md:hidden">


          {/* MOBILE HEADER */}

          <div className="grid h-[62px] grid-cols-[40px_1fr_40px] items-center border-b border-[#E5E5E5] bg-black px-4 text-white">

            {/* MENU */}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setActiveMenu(null);
                setAccountMenuOpen(false);
                setMobileSearchOpen(false);
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-start"
            >

              {mobileMenuOpen
                ? <FiX size={25} />
                : <FiMenu size={25} />
              }

            </button>


            {/* LOGO */}

            <Link href="/" className="flex justify-center">

              <Image
                src={logo}
                alt="VAYRO"
                width={145}
                height={48}
                priority
                className="h-[38px] w-auto object-contain"
              />

            </Link>


            {/* CART */}

            <Link
              href="/cart"
              aria-label="Shopping Bag"
              className="flex h-10 w-10 items-center justify-end text-[23px]"
            >
              <BsHandbag />
            </Link>

          </div>


          {/* MOBILE CATEGORY NAV */}

          <nav className="border-b border-[#E5E5E5] bg-white px-3 py-2">

            <ul className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

              <li className="shrink-0">

                <Link
                  href="/shop"
                  onClick={() => setActiveMenu(null)}
                  className="flex h-[39px] items-center rounded-md border border-[#E5E5E5] px-4 text-xs font-semibold tracking-wide text-black transition hover:bg-[#F7F7F7]"
                >
                  SHOP NOW
                </Link>

              </li>


              {categories.map((category) => (

                <li key={category.id} className="shrink-0">

                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={activeMenu === category.id}
                    className={`flex h-[39px] items-center rounded-md border px-4 text-xs font-semibold tracking-wide transition ${
                      activeMenu === category.id
                        ? 'border-black bg-black text-white'
                        : 'border-[#E5E5E5] bg-white text-black hover:bg-[#F7F7F7]'
                    }`}
                  >
                    {category.label}
                  </button>

                </li>

              ))}

            </ul>

          </nav>


          {/* MOBILE SEARCH */}

          {mobileSearchOpen && (

            <form
              action="/shop"
              method="GET"
              className="border-b border-[#E5E5E5] bg-white p-3"
            >

              <div className="relative">

                <input
                  type="search"
                  name="search"
                  autoFocus
                  placeholder="Search products..."
                  className="h-11 w-full rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-4 pr-12 text-sm text-black outline-none focus:border-[#3C3C3C]"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <FiSearch size={20} />
                </button>

              </div>

            </form>

          )}


          {/* MOBILE CATEGORY DROPDOWN */}

          {activeCategory && (

            <div className="border-b border-[#E5E5E5] bg-white px-4 py-5">

              <div className="grid grid-cols-2 gap-x-5 gap-y-6">

                {activeCategory.groups.map((group) => (

                  <div key={group.title}>

                    <h3 className="mb-3 text-[11px] font-semibold tracking-wider text-[#737373]">
                      {group.title}
                    </h3>

                    <ul className="space-y-3">

                      {group.links.map((link) => (

                        <li key={link.slug}>

                          <Link
                            href={categoryUrl(activeCategory.id, link.slug)}
                            onClick={() => setActiveMenu(null)}
                            className="text-[13px] text-[#3C3C3C] transition hover:text-black"
                          >
                            {link.name}
                          </Link>

                        </li>

                      ))}

                    </ul>

                  </div>

                ))}

              </div>


              {/* PROMO IMAGES */}

              <div className="mt-5 grid grid-cols-2 gap-3">

                {promoImages.map((image) => (

                  <Link
                    href={`/shop?category=${activeCategory.id}`}
                    key={image.title}
                    onClick={() => setActiveMenu(null)}
                    className="group relative aspect-[4/3] overflow-hidden bg-[#F7F7F7]"
                  >

                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30" />

                    <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white">
                      {image.title}
                    </span>

                  </Link>

                ))}

              </div>


              <Link
                href={`/shop?category=${activeCategory.id}`}
                onClick={() => setActiveMenu(null)}
                className="mt-5 block border-t border-[#E5E5E5] pt-4 text-center text-[11px] font-semibold tracking-[0.15em] text-[#3C3C3C]"
              >
                VIEW ALL {activeCategory.label}
              </Link>

            </div>

          )}


          {/* MOBILE HAMBURGER MENU */}

          {mobileMenuOpen && (

            <div className="border-b border-[#E5E5E5] bg-white px-5 py-5">

              <div className="space-y-1">

                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-[#E5E5E5] text-sm font-semibold text-black"
                >
                  SHOP ALL
                  <FiGrid size={18} />
                </Link>


                {categories.map((category) => (

                  <button
                    type="button"
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className="flex min-h-12 w-full items-center justify-between border-b border-[#E5E5E5] text-left text-sm font-medium text-[#3C3C3C]"
                  >
                    {category.label}
                    <span className="text-lg">+</span>
                  </button>

                ))}


                {/* DASHBOARD */}

                {(isAdmin || isStaff) && (

                  <Link
                    href={isAdmin ? '/dashboard/admin' : '/dashboard/staff'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between border-b border-[#E5E5E5] text-sm font-semibold text-black"
                  >
                    {isAdmin ? 'ADMIN DASHBOARD' : 'STAFF DASHBOARD'}
                    <FiGrid size={18} />
                  </Link>

                )}

              </div>

            </div>

          )}

        </div>

      </header>


      {/* =====================================
          MOBILE BOTTOM NAVIGATION
      ===================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#E5E5E5] bg-white px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] md:hidden">

        <div className="mx-auto grid max-w-lg grid-cols-5 items-center">


          {/* HOME */}

          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 py-1 text-[10px] ${
              pathname === '/' ? 'text-black' : 'text-[#737373]'
            }`}
          >
            <FiHome size={21} strokeWidth={1.8} />
            <span>Home</span>
          </Link>


          {/* SEARCH */}

          <button
            type="button"
            onClick={toggleMobileSearch}
            aria-expanded={mobileSearchOpen}
            className={`flex flex-col items-center justify-center gap-1 py-1 text-[10px] ${
              mobileSearchOpen ? 'text-black' : 'text-[#737373]'
            }`}
          >
            <FiSearch size={21} strokeWidth={1.8} />
            <span>Search</span>
          </button>


          {/* BAG */}

          <Link
            href="/cart"
            className="flex flex-col items-center justify-center gap-1 py-1 text-[10px] text-[#737373]"
          >
            <BsHandbag size={21} />
            <span>Bag</span>
          </Link>


          {/* USER ACCOUNT DROPDOWN */}

          <div
            className="relative flex justify-center"
            ref={mobileAccountRef}
          >

            <button
              type="button"
              onClick={toggleAccountMenu}
              aria-label="Account menu"
              aria-expanded={accountMenuOpen}
              className={`flex flex-col items-center justify-center gap-1 py-1 text-[10px] ${
                accountMenuOpen ? 'text-black' : 'text-[#737373]'
              }`}
            >

              {isAdmin || isStaff
                ? <FiGrid size={21} />
                : <FiUser size={21} />
              }

              <span>
                {isAdmin || isStaff ? 'Dashboard' : 'User'}
              </span>

            </button>


            {/* MOBILE ACCOUNT POPUP */}

            {accountMenuOpen && (

              <div className="absolute bottom-[calc(100%+12px)] left-1/2 z-[80] -translate-x-1/2">

                <AccountDropdown {...accountProps} />

              </div>

            )}

          </div>


          {/* CALL */}

          <Link
            href={callHref}
            className="flex flex-col items-center justify-center gap-1 py-1 text-[10px] text-[#737373]"
          >
            <FiPhoneCall size={21} />
            <span>Call</span>
          </Link>

        </div>

      </nav>

    </>

  );

}
