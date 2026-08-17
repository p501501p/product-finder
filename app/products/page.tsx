import Link from 'next/link'
import { products } from '@/data/products'
import { filterProducts } from '@/lib/filter-products'
 
const PAGE_SIZE = 4
 
type PageProps = {
  searchParams: Promise<{
    q?: string
    category?: string
    sort?: string
    page?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q ?? ''
  const category = params.category ?? 'all'
  const sort =
    params.sort === 'price-asc' || params.sort === 'price-desc'
      ? params.sort
      : 'name'
  const minPriceInput = params.minPrice ?? ''
  const maxPriceInput = params.maxPrice ?? ''
  const minPrice = minPriceInput === '' ? undefined : Number(minPriceInput)
  const maxPrice = maxPriceInput === '' ? undefined : Number(maxPriceInput)

  const requestedPage = Number(params.page ?? '1')
  const filtered = filterProducts(products, {
    query,
    category,
    sort,
    minPrice,
    maxPrice,
  })
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1
  const start = (currentPage - 1) * PAGE_SIZE
  const visibleProducts = filtered.slice(start, start + PAGE_SIZE)
 
  function pageHref(page: number) {
    const nextParams = new URLSearchParams()
    if (query) nextParams.set('q', query)
    if (category !== 'all') nextParams.set('category', category)
    if (sort !== 'name') nextParams.set('sort', sort)
    if (minPriceInput) nextParams.set('minPrice', minPriceInput)
    if (maxPriceInput) nextParams.set('maxPrice', maxPriceInput)
    nextParams.set('page', String(page))
    return `/products?${nextParams.toString()}`
  }
 
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold text-black">Product Finder</h1>
 
      <form
        action="/products"
        method="get"
        className="mt-8 grid gap-4 rounded-2xl bg-slate-100 p-5 md:grid-cols-5"
      >
        <label className="md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-black">คำค้นหา</span>
          <input
            type="search"
            name="q"
            defaultValue={query}
            className="w-full rounded-lg border bg-white px-3 py-2
            text-black"
          />
        </label>
 
        <label>
          <span className="mb-1 block text-sm font-medium text-black">หมวดหมู่</span>
          <select
            name="category"
            defaultValue={category}
            className="w-full rounded-lg border bg-white px-3 py-2
            text-black"
          >
            <option value="all">ทั้งหมด</option>
            <option value="office">Office</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </label>
 
        <label>
          <span className="mb-1 block text-sm font-medium text-black">เรียงตาม</span>
          <select
            name="sort"
            defaultValue={sort}
            className="w-full rounded-lg border bg-white px-3 py-2
            text-black"
          >
            <option value="name">ชื่อ</option>
            <option value="price-asc">ราคาน้อยไปมาก</option>
            <option value="price-desc">ราคามากไปน้อย</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-black" >ราคาต่ำสุด</span>
          <input
            type="number"
            name="minPrice"
            defaultValue={minPriceInput}
            min="0"
            placeholder="0"
            className="w-full rounded-lg border bg-white px-3 py-2
            text-black"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-black">ราคาสูงสุด</span>
          <input 
            type="number"
            name="maxPrice"
            defaultValue={maxPriceInput}
            min="0"
            placeholder="ไม่จำกัด"
            className="w-full rounded-lg border bg-white px-3 py-2
            text-black"
          />
        </label>
 
        <div className="flex gap-3 md:col-span-5">
          <button className="rounded-lg bg-indigo-700 px-5 py-2 text-white">
            ค้นหา
          </button>
          <Link href="/products" className="rounded-lg border bg-white px-5 py-2 text-black">
            ล้างตัวกรอง
          </Link>
        </div>
      </form>
 
      <p role="status" className="my-6 text-sm text-slate-600">
        พบ {filtered.length} รายการ · หน้า {currentPage} จาก {totalPages}
      </p>
 
      {visibleProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">ไม่พบสินค้า</h2>
          <p className="mt-2 text-slate-600">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 text-black">
          {visibleProducts.map((product) => (
            <li key={product.id} className="rounded-2xl border p-5">
              <p className="text-sm uppercase text-indigo-700">
                {product.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
              <p className="mt-4 text-2xl font-bold">
                {product.price.toLocaleString('th-TH')} บาท
              </p>
            </li>
          ))}
        </ul>
      )}
 
      <nav aria-label="Pagination" className="mt-8 flex justify-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={pageHref(currentPage - 1)}
            className="rounded-lg border px-4 py-2 hover:bg-slate-100 text-black"
          >
            Previous
          </Link>
        ) : (
          <span className="cursor-not-allowed rounded-lg border border-slate-200 px-4 py-2 text-slate-400 ">
            Previous
          </span>
        )}

        <span className="rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white">
          {currentPage}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={pageHref(currentPage + 1)}
            className="rounded-lg border px-4 py-2 hover:bg-slate-100 text-black"
          >
            Next
          </Link>
        ) : (
          <span className="cursor-not-allowed rounded-lg border border-slate-200 px-4 py-2 text-slate-400">
            Next
          </span>
        )}
      </nav>
    </main>
  )
}