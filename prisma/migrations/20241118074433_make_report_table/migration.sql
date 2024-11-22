-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportCategory" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportCategory" ADD CONSTRAINT "ReportCategory_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCategory" ADD CONSTRAINT "ReportCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
