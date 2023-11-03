-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'PENDING', 'OVERDUE');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('INCOMING', 'OUTGOING');

-- CreateTable
CREATE TABLE "Invoice" (
    "uuid" UUID NOT NULL,
    "invoice_number" VARCHAR(10) NOT NULL,
    "date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "vendor_name" VARCHAR(100) NOT NULL,
    "vendor_vat_number" VARCHAR(255) NOT NULL,
    "remittance_address" TEXT NOT NULL,
    "amount_due" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "filename" VARCHAR(255),
    "status" "InvoiceStatus" NOT NULL,
    "type" "InvoiceType" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uuid" UUID NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_uuid_key" ON "Invoice"("uuid");

-- CreateIndex
CREATE INDEX "Invoice_user_uuid_idx" ON "Invoice"("user_uuid");

-- CreateIndex
CREATE INDEX "Invoice_invoice_number_idx" ON "Invoice"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
