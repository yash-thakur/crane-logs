-- CreateTable
CREATE TABLE `EntryLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logSheetNo` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customerId` INTEGER NOT NULL,
    `inTime` VARCHAR(191) NOT NULL,
    `outTime` VARCHAR(191) NOT NULL,
    `break` VARCHAR(191) NOT NULL,
    `vehicleNo` VARCHAR(191) NOT NULL,
    `driverName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `advance` DOUBLE NULL,
    `workDetails` VARCHAR(500) NULL,
    `paymentStatus` ENUM('PENDING', 'PARTIALLY_PAID', 'PAID') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NULL,
    `openingBalance` DOUBLE NULL DEFAULT 0,
    `phoneNumber` VARCHAR(191) NULL,
    `address` VARCHAR(500) NULL,
    `gstin` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_name_key`(`name`),
    UNIQUE INDEX `Customer_gstin_key`(`gstin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `licenseNumber` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `licenseExpiry` DATETIME(3) NOT NULL,
    `vehicleType` VARCHAR(191) NOT NULL,
    `yearsOfExperience` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `salary` INTEGER NULL,
    `aadhar` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Driver_fullName_key`(`fullName`),
    UNIQUE INDEX `Driver_licenseNumber_key`(`licenseNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registrationNumber` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `vehicleType` VARCHAR(191) NOT NULL,
    `capacity` DOUBLE NOT NULL,
    `fuelType` VARCHAR(191) NOT NULL,
    `lastMaintenanceDate` DATETIME(3) NULL,
    `nextMaintenanceDate` DATETIME(3) NULL,
    `insuranceNumber` VARCHAR(191) NOT NULL,
    `insuranceExpiryDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `type` VARCHAR(191) NOT NULL,
    `puc` DATETIME(3) NULL,
    `fitness` DATETIME(3) NULL,
    `tax` DATETIME(3) NULL,
    `form10` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vehicle_registrationNumber_key`(`registrationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExpenseCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ExpenseCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `categoryId` INTEGER NOT NULL,
    `paymentMethod` ENUM('CASH', 'CHEQUE', 'BANK_TRANSFER', 'UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'MOBILE_WALLET') NOT NULL,
    `receipt` VARCHAR(191) NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `approvedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `driverId` INTEGER NULL,
    `vehicleId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InwardPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `entryLogId` INTEGER NULL,
    `amount` DOUBLE NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `paymentMethod` ENUM('CASH', 'CHEQUE', 'BANK_TRANSFER', 'UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'MOBILE_WALLET') NOT NULL,
    `referenceNumber` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `isReconciled` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EntryLog` ADD CONSTRAINT `EntryLog_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntryLog` ADD CONSTRAINT `EntryLog_vehicleNo_fkey` FOREIGN KEY (`vehicleNo`) REFERENCES `Vehicle`(`registrationNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntryLog` ADD CONSTRAINT `EntryLog_driverName_fkey` FOREIGN KEY (`driverName`) REFERENCES `Driver`(`fullName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyExpense` ADD CONSTRAINT `DailyExpense_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ExpenseCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyExpense` ADD CONSTRAINT `DailyExpense_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyExpense` ADD CONSTRAINT `DailyExpense_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InwardPayment` ADD CONSTRAINT `InwardPayment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InwardPayment` ADD CONSTRAINT `InwardPayment_entryLogId_fkey` FOREIGN KEY (`entryLogId`) REFERENCES `EntryLog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
