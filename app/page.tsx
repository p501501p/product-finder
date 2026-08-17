import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12 text-slate-900">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
          Product Finder
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-tight">
          ค้นหาสินค้าที่ใช่สำหรับคุณได้ง่าย ๆ
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          ค้นหาโดยคำค้นหา, หมวดหมู่, ช่วงราคา และเรียงลำดับตามความต้องการได้ทันที
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/products"
            className="rounded-lg bg-indigo-700 px-6 py-3 font-medium text-white transition hover:bg-indigo-800"
          >
            เปิดสินค้า
          </Link>

          <Link
            href="/products?q=desk"
            className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            ตัวอย่างค้นหา
          </Link>
        </div>
      </div>
    </main>
  )
}
