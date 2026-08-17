# Product Finder

Product Finder เป็นแอปค้นหาสินค้าแบบง่าย ๆ ที่ใช้ Next.js โดยมีฟีเจอร์หลักดังนี้:

- ค้นหาสินค้าโดยใช้คำค้นหา
- กรองตามหมวดหมู่
- เรียงลำดับสินค้าตามชื่อหรือราคา
- กรองช่วงราคาต่ำสุดและสูงสุด
- แบ่งหน้าแบบง่าย ๆ พร้อม Previous / Next
- เก็บค่า filter และ pagination ไว้ใน Query String

## เทคโนโลยีที่ใช้

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## โครงสร้างโปรเจค

- app/Products/page.tsx : หน้าแสดงรายการสินค้าและฟอร์มค้นหา
- data/products.ts : ข้อมูลสินค้า
- lib/filter-products.ts : ฟังก์ชันกรองและเรียงสินค้า
- app/page.tsx : หน้า landing หรือหน้าแรก

## การติดตั้ง

1. Clone โครงการ
2. เปิด terminal แล้วติดตั้ง dependency

npm install

## การรันโปรเจค

npm run dev

จากนั้นเปิดเบราว์เซอร์ที่:

http://localhost:3000/products

## ตัวอย่างการใช้งาน

- ค้นหาชื่อสินค้า
  - /products?q=keyboard
- กรองหมวดหมู่
  - /products?category=tech
- เรียงราคาน้อยไปมาก
  - /products?sort=price-asc
- กรองช่วงราคา
  - /products?minPrice=1000&maxPrice=5000
- รวม filter ทั้งหมด
  - /products?q=mouse&category=tech&sort=price-asc&minPrice=500&maxPrice=3000&page=1

## การ build สำหรับ production

npm run build

## การรัน production server

npm run start

## หมายเหตุ

โปรเจคนี้ออกแบบให้ใช้งานแบบ frontend demo ที่มีข้อมูลสินค้าแบบ static และใช้ Query String เป็นกลไกจัดเก็บค่า filter เพื่อให้สามารถแชร์ลิงก์หรือ reload หน้าแล้วยังคงการค้นหาเดิมไว้ได้


## ผู้จัดทำ
นายกิตติศักดิ์ ขันเเข็ง 673450031-4