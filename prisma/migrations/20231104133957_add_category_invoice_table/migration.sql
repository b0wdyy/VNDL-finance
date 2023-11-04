/*
  Warnings:

  - You are about to drop the column `filename` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "filename",
ADD COLUMN     "invoice_file_url" VARCHAR(255);

-- CreateTable
CREATE TABLE "CategoryInvoice" (
    "uuid" UUID NOT NULL,
    "category_uuid" UUID NOT NULL,
    "invoice_uuid" UUID NOT NULL,

    CONSTRAINT "CategoryInvoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryInvoice_uuid_key" ON "CategoryInvoice"("uuid");

-- AddForeignKey
ALTER TABLE "CategoryInvoice" ADD CONSTRAINT "CategoryInvoice_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "Category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryInvoice" ADD CONSTRAINT "CategoryInvoice_invoice_uuid_fkey" FOREIGN KEY ("invoice_uuid") REFERENCES "Invoice"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
