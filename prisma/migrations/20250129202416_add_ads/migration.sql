-- CreateTable
CREATE TABLE "ads" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ads_description_key" ON "ads"("description");

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
