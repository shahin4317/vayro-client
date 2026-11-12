
'use client';

import { useState } from 'react';

import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiFolder,
  FiMenu,
  FiX,
  FiChevronRight,
} from 'react-icons/fi';


// DEMO CATEGORY DATA
const initialCategories = [
  { id: '1', name: 'Shirt', slug: 'shirt', parentId: null, showInNav: true },
  { id: '2', name: 'Denim Shirt', slug: 'denim-shirt', parentId: '1', showInNav: true },
  { id: '3', name: 'Solid Shirt', slug: 'solid-shirt', parentId: '1', showInNav: true },
  { id: '4', name: 'Checked Shirt', slug: 'checked-shirt', parentId: '1', showInNav: true },
  { id: '5', name: 'Panjabi', slug: 'panjabi', parentId: null, showInNav: true },
  { id: '6', name: 'Kabli', slug: 'kabli', parentId: '5', showInNav: true },
  { id: '7', name: 'T-Shirt', slug: 't-shirt', parentId: null, showInNav: true },
  { id: '8', name: 'Jacket', slug: 'jacket', parentId: null, showInNav: true },
  { id: '9', name: 'Pant', slug: 'pant', parentId: null, showInNav: true },
];


// CREATE SLUG
const makeSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};


export default function NavigationPage() {

  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    id: null,
    name: '',
    slug: '',
    parentId: '',
    showInNav: true,
  });

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');


  // MAIN CATEGORIES
  const mainCategories = categories.filter(
    (item) => !item.parentId
  );


  // SUBCATEGORY COUNT
  const subcategoryCount = categories.filter(
    (item) => item.parentId
  ).length;


  // SEARCH
  const filteredCategories = mainCategories.filter((item) => {

    const children = categories.filter(
      (child) => child.parentId === item.id
    );

    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      children.some((child) =>
        child.name.toLowerCase().includes(search.toLowerCase())
      )
    );

  });


  // ADD CATEGORY
  const handleAdd = (parentId = '') => {

    setForm({
      id: null,
      name: '',
      slug: '',
      parentId,
      showInNav: true,
    });

    setEditing(false);
    setMessage('');

  };


  // EDIT CATEGORY
  const handleEdit = (category) => {

    setForm({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId || '',
      showInNav: category.showInNav,
    });

    setEditing(true);
    setMessage('');

  };


  // SAVE CATEGORY
  const handleSubmit = (e) => {

    e.preventDefault();

    const name = form.name.trim();
    const slug = makeSlug(form.slug || form.name);

    if (!name || !slug) {
      setMessage('Please enter category name.');
      return;
    }

    // CHECK DUPLICATE SLUG
    const duplicate = categories.find(
      (item) =>
        item.slug === slug &&
        item.id !== form.id
    );

    if (duplicate) {
      setMessage('This category URL already exists.');
      return;
    }

    // CHECK PARENT CATEGORY
    if (form.parentId) {

      const parentExists = categories.some(
        (item) =>
          item.id === form.parentId &&
          !item.parentId
      );

      if (!parentExists || form.parentId === form.id) {
        setMessage('Please select a valid main category.');
        return;
      }

    }

    const categoryData = {
      name,
      slug,
      parentId: form.parentId || null,
      showInNav: form.showInNav,
    };


    if (editing) {

      setCategories((previous) =>
        previous.map((item) =>
          item.id === form.id
            ? { ...item, ...categoryData }
            : item
        )
      );

      setMessage('Category updated successfully!');

    } else {

      const newCategory = {
        id: Date.now().toString(),
        ...categoryData,
      };

      setCategories((previous) => [
        ...previous,
        newCategory,
      ]);

      setMessage('Category added successfully!');

    }


    setForm({
      id: null,
      name: '',
      slug: '',
      parentId: '',
      showInNav: true,
    });

    setEditing(false);

  };


  // DELETE CATEGORY
  const handleDelete = (category) => {

    const hasChildren = categories.some(
      (item) => item.parentId === category.id
    );

    if (hasChildren) {
      setMessage('Delete subcategories first.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${category.name}?`
    );

    if (!confirmDelete) return;

    setCategories((previous) =>
      previous.filter((item) => item.id !== category.id)
    );

    if (form.id === category.id) {
      handleAdd();
    }

    setMessage('Category deleted successfully!');

  };


  // SHOW / HIDE CATEGORY
  const toggleVisibility = (id) => {

    setCategories((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, showInNav: !item.showInNav }
          : item
      )
    );

  };


  const hasChildren = form.id
    ? categories.some((item) => item.parentId === form.id)
    : false;


  return (

    <div className="min-w-0 space-y-5 sm:space-y-6">


      {/* PAGE HEADER */}

      <div className="
        flex flex-col gap-3
        sm:flex-row sm:items-center sm:justify-between
      ">

        <div className="min-w-0">

          <p className="text-[10px] font-medium tracking-[0.15em] text-[#888888]">
            STOREFRONT / MANAGEMENT
          </p>

          <h1 className="mt-1.5 text-base font-semibold tracking-tight text-[#171717] sm:text-lg">
            Navigation Menu
          </h1>

          <p className="mt-1 text-xs text-[#777777] sm:text-[13px]">
            Manage your store categories and subcategories.
          </p>

        </div>

        <button
          type="button"
          onClick={() => handleAdd()}
          className="
            flex h-10 w-full shrink-0
            items-center justify-center gap-2
            bg-[#171717] px-4
            text-xs font-medium text-white
            transition hover:bg-[#383838]
            sm:w-auto
          "
        >
          <FiPlus size={16} />
          Add Main Category
        </button>

      </div>


      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">

        <div className="rounded-xl border border-[#E8E8E8] bg-white p-4">

          <div className="flex items-center justify-between">

            <p className="text-xs text-[#777777]">
              Main Categories
            </p>

            <FiFolder className="text-[#777777]" size={18} />

          </div>

          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            {mainCategories.length}
          </h2>

        </div>


        <div className="rounded-xl border border-[#E8E8E8] bg-white p-4">

          <div className="flex items-center justify-between">

            <p className="text-xs text-[#777777]">
              Subcategories
            </p>

            <FiMenu className="text-[#777777]" size={18} />

          </div>

          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            {subcategoryCount}
          </h2>

        </div>


        <div className="rounded-xl border border-[#E8E8E8] bg-white p-4">

          <div className="flex items-center justify-between">

            <p className="text-xs text-[#777777]">
              Visible in Menu
            </p>

            <FiEye className="text-[#777777]" size={18} />

          </div>

          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            {categories.filter((item) => item.showInNav).length}
          </h2>

        </div>

      </div>


      {/* MENU PREVIEW */}

      <div className="
        overflow-hidden rounded-xl
        bg-[#171717] p-4 text-white
        sm:p-5
      ">

        <div className="mb-3 flex items-center gap-2">

          <FiMenu size={16} />

          <p className="text-[10px] font-medium tracking-[0.15em] text-white/60">
            STOREFRONT MENU PREVIEW
          </p>

        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3">

          {mainCategories
            .filter((item) => item.showInNav)
            .map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-1.5"
              >

                <span className="text-xs font-medium uppercase tracking-wider sm:text-[13px]">
                  {item.name}
                </span>

                {categories.some(
                  (child) =>
                    child.parentId === item.id &&
                    child.showInNav
                ) && (

                  <FiChevronRight
                    size={13}
                    className="rotate-90 text-white/50"
                  />

                )}

              </div>

            ))}

          {mainCategories.every((item) => !item.showInNav) && (

            <p className="text-xs text-white/50">
              No visible categories.
            </p>

          )}

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="
        grid min-w-0 grid-cols-1
        items-start gap-4
        sm:gap-5
        xl:grid-cols-[minmax(0,1.25fr)_minmax(290px,0.75fr)]
      ">


        {/* CATEGORY LIST */}

        <div className="
          min-w-0 overflow-hidden
          rounded-xl border border-[#E8E8E8]
          bg-white
        ">


          {/* LIST HEADER */}

          <div className="border-b border-[#EEEEEE] p-4 sm:p-5">

            <div className="
              flex flex-col gap-3
              sm:flex-row sm:items-center sm:justify-between
            ">

              <div>

                <h2 className="text-sm font-semibold text-[#171717]">
                  Category Structure
                </h2>

                <p className="mt-1 text-xs text-[#888888]">
                  Organize your storefront navigation.
                </p>

              </div>


              {/* SEARCH */}

              <div className="relative w-full sm:w-52 lg:w-56">

                <FiSearch
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-[#888888]
                  "
                  size={15}
                />

                <input
                  type="text"
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    h-9 w-full min-w-0
                    border border-[#E5E5E5]
                    bg-[#FAFAFA]
                    pl-9 pr-3
                    text-xs text-[#333333]
                    outline-none
                    placeholder:text-[#999999]
                    focus:border-[#777777]
                  "
                />

              </div>

            </div>

          </div>


          {/* CATEGORY ITEMS */}

          <div className="space-y-3 p-3 sm:p-4">

            {filteredCategories.length === 0 && (

              <div className="py-10 text-center text-xs text-[#888888]">
                No categories found.
              </div>

            )}


            {filteredCategories.map((category) => {

              const children = categories.filter(
                (item) => item.parentId === category.id
              );

              return (

                <div
                  key={category.id}
                  className="min-w-0 overflow-hidden border border-[#EAEAEA]"
                >


                  {/* MAIN CATEGORY */}

                  <div className="
                    flex flex-col gap-3
                    bg-[#FAFAFA] p-3
                    sm:flex-row sm:items-center sm:justify-between
                    sm:p-4
                  ">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        bg-white text-[#333333]
                      ">
                        <FiFolder size={17} />
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate text-[13px] font-semibold text-[#171717]">
                            {category.name}
                          </h3>

                          <span className="text-[9px] font-medium tracking-wide text-[#999999]">
                            MAIN CATEGORY
                          </span>

                        </div>

                        <p className="mt-1 truncate text-[11px] text-[#888888]">
                          /{category.slug}
                        </p>

                      </div>

                    </div>


                    {/* ACTION BUTTONS */}

                    <div className="
                      flex flex-wrap items-center gap-1.5
                      sm:justify-end
                    ">

                      <button
                        type="button"
                        onClick={() => handleAdd(category.id)}
                        className="
                          flex h-8 items-center gap-1.5
                          border border-[#DDDDDD]
                          bg-white px-2.5
                          text-[11px] font-medium
                          text-[#333333]
                          hover:bg-[#F0F0F0]
                        "
                      >
                        <FiPlus size={13} />
                        Subcategory
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleVisibility(category.id)}
                        title="Toggle visibility"
                        aria-label="Toggle category visibility"
                        className="
                          flex h-8 w-8 items-center justify-center
                          border border-[#DDDDDD]
                          bg-white text-[#555555]
                          hover:bg-[#F0F0F0]
                        "
                      >
                        {category.showInNav ? (
                          <FiEye size={15} />
                        ) : (
                          <FiEyeOff size={15} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                        title="Edit category"
                        aria-label="Edit category"
                        className="
                          flex h-8 w-8 items-center justify-center
                          border border-[#DDDDDD]
                          bg-white text-[#555555]
                          hover:bg-[#F0F0F0]
                        "
                      >
                        <FiEdit2 size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(category)}
                        title="Delete category"
                        aria-label="Delete category"
                        className="
                          flex h-8 w-8 items-center justify-center
                          border border-[#DDDDDD]
                          bg-white text-[#B42318]
                          hover:bg-red-50
                        "
                      >
                        <FiTrash2 size={14} />
                      </button>

                    </div>

                  </div>


                  {/* SUBCATEGORIES */}

                  <div className="divide-y divide-[#EEEEEE] px-3 sm:px-4">

                    {children.map((child) => (

                      <div
                        key={child.id}
                        className="
                          flex flex-col gap-2.5
                          py-3 pl-2
                          sm:flex-row sm:items-center sm:justify-between
                        "
                      >

                        <div className="flex min-w-0 items-center gap-2.5">

                          <FiChevronRight
                            size={15}
                            className="shrink-0 text-[#999999]"
                          />

                          <div className="min-w-0">

                            <p className="truncate text-xs font-medium text-[#333333]">
                              {child.name}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-[#999999]">
                              /{child.slug}
                            </p>

                          </div>

                        </div>


                        <div className="
                          flex items-center gap-1.5
                          pl-6 sm:pl-0
                        ">

                          <span className={`
                            mr-1 text-[9px] font-semibold tracking-wide
                            ${child.showInNav
                              ? 'text-[#36805B]'
                              : 'text-[#999999]'
                            }
                          `}>
                            {child.showInNav ? 'VISIBLE' : 'HIDDEN'}
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleVisibility(child.id)}
                            title="Toggle visibility"
                            aria-label="Toggle subcategory visibility"
                            className="
                              flex h-8 w-8 items-center justify-center
                              text-[#777777] hover:bg-[#F5F5F5]
                            "
                          >
                            {child.showInNav ? (
                              <FiEye size={14} />
                            ) : (
                              <FiEyeOff size={14} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(child)}
                            title="Edit subcategory"
                            aria-label="Edit subcategory"
                            className="
                              flex h-8 w-8 items-center justify-center
                              text-[#777777] hover:bg-[#F5F5F5]
                            "
                          >
                            <FiEdit2 size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(child)}
                            title="Delete subcategory"
                            aria-label="Delete subcategory"
                            className="
                              flex h-8 w-8 items-center justify-center
                              text-[#B42318] hover:bg-red-50
                            "
                          >
                            <FiTrash2 size={14} />
                          </button>

                        </div>

                      </div>

                    ))}


                    {children.length === 0 && (

                      <p className="py-3 pl-2 text-[11px] text-[#AAAAAA]">
                        No subcategories yet.
                      </p>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </div>


        {/* ADD / EDIT FORM */}

        <div className="
          min-w-0 overflow-hidden
          rounded-xl border border-[#E8E8E8]
          bg-white
          xl:sticky xl:top-6
        ">


          {/* FORM HEADER */}

          <div className="border-b border-[#EEEEEE] p-4 sm:p-5">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-sm font-semibold text-[#171717]">
                  {editing ? 'Edit Category' : 'Create Category'}
                </h2>

                <p className="mt-1 text-xs text-[#888888]">
                  {editing
                    ? 'Update your category information.'
                    : 'Add a new category to your store.'}
                </p>

              </div>

              {editing && (

                <button
                  type="button"
                  onClick={() => handleAdd()}
                  className="flex h-8 w-8 items-center justify-center text-[#888888] hover:bg-[#F5F5F5] hover:text-black"
                  title="Cancel editing"
                  aria-label="Cancel editing"
                >
                  <FiX size={18} />
                </button>

              )}

            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 sm:space-y-5 sm:p-5"
          >


            {/* CATEGORY NAME */}

            <div>

              <label className="
                mb-2 block
                text-[10px] font-semibold
                tracking-[0.08em]
                text-[#555555]
              ">
                CATEGORY NAME *
              </label>

              <input
                type="text"
                placeholder="Example: Shirt"
                value={form.name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                    slug: makeSlug(e.target.value),
                  });
                }}
                className="
                  h-10 w-full min-w-0
                  border border-[#DDDDDD]
                  bg-white px-3
                  text-xs text-[#333333]
                  outline-none
                  placeholder:text-[#AAAAAA]
                  focus:border-[#333333]
                "
                required
              />

            </div>


            {/* CATEGORY SLUG */}

            <div>

              <label className="
                mb-2 block
                text-[10px] font-semibold
                tracking-[0.08em]
                text-[#555555]
              ">
                URL SLUG *
              </label>

              <div className="
                flex h-10 min-w-0
                items-center border border-[#DDDDDD]
              ">

                <span className="pl-3 text-xs text-[#999999]">
                  /
                </span>

                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: makeSlug(e.target.value),
                    })
                  }
                  placeholder="shirt"
                  className="
                    h-full min-w-0 w-full
                    bg-transparent px-2
                    text-xs text-[#333333]
                    outline-none
                  "
                  required
                />

              </div>

              <p className="mt-1.5 text-[10px] text-[#999999]">
                This will be used in your category URL.
              </p>

            </div>


            {/* PARENT CATEGORY */}

            <div>

              <label className="
                mb-2 block
                text-[10px] font-semibold
                tracking-[0.08em]
                text-[#555555]
              ">
                PARENT CATEGORY
              </label>

              <select
                value={form.parentId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    parentId: e.target.value,
                  })
                }
                disabled={hasChildren}
                className="
                  h-10 w-full min-w-0
                  border border-[#DDDDDD]
                  bg-white px-3
                  text-xs text-[#333333]
                  outline-none
                  focus:border-[#333333]
                  disabled:bg-[#F5F5F5]
                "
              >

                <option value="">
                  None (Main Category)
                </option>

                {mainCategories
                  .filter((item) => item.id !== form.id)
                  .map((item) => (

                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>

                  ))}

              </select>

              <p className="mt-1.5 text-[10px] text-[#999999]">
                Select a parent to create a subcategory.
              </p>

            </div>


            {/* SHOW IN NAVIGATION */}

            <div className="
              flex items-center justify-between
              gap-3 border border-[#EEEEEE]
              p-3
            ">

              <div className="min-w-0">

                <p className="text-xs font-medium text-[#333333]">
                  Show in Navigation
                </p>

                <p className="mt-1 text-[10px] text-[#888888]">
                  Display this category in the store menu.
                </p>

              </div>

              <input
                type="checkbox"
                checked={form.showInNav}
                onChange={(e) =>
                  setForm({
                    ...form,
                    showInNav: e.target.checked,
                  })
                }
                className="h-4 w-4 shrink-0 cursor-pointer accent-black"
              />

            </div>


            {/* MESSAGE */}

            {message && (

              <div className="
                border border-[#E5E5E5]
                bg-[#F8F8F8] p-3
                text-xs text-[#444444]
              ">
                {message}
              </div>

            )}


            {/* ACTION BUTTONS */}

            <div className="
              grid grid-cols-[1fr_auto]
              gap-2 pt-1
            ">

              <button
                type="submit"
                className="
                  flex min-h-10 min-w-0
                  items-center justify-center gap-2
                  bg-[#171717] px-3
                  text-xs font-medium text-white
                  transition hover:bg-[#383838]
                "
              >
                {editing ? (
                  <FiEdit2 size={14} />
                ) : (
                  <FiPlus size={15} />
                )}

                {editing ? 'Update Category' : 'Create Category'}

              </button>

              <button
                type="button"
                onClick={() => handleAdd()}
                className="
                  min-h-10 border border-[#DDDDDD]
                  px-4 text-xs text-[#555555]
                  hover:bg-[#F5F5F5]
                "
              >
                Clear
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}
