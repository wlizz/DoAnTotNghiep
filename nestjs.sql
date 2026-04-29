-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 12, 2026 lúc 01:25 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nestjs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dv_category`
--

CREATE TABLE `dv_category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `active_flg` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dv_category`
--

INSERT INTO `dv_category` (`id`, `name`, `create_date`, `update_date`, `active_flg`, `status`) VALUES
(1, 'HG Gundam\r\n', NULL, NULL, 1, 1),
(3, 'RG Gundam', NULL, NULL, 1, 1),
(4, 'MG Gundam', NULL, NULL, 1, 1),
(5, 'PG Gundam\r\n', NULL, NULL, 1, 1),
(6, 'Figure', NULL, NULL, 1, 1),
(7, 'KotoBuya', NULL, '2026-04-05 11:37:32', 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dv_detail_order`
--

CREATE TABLE `dv_detail_order` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dv_detail_order`
--

INSERT INTO `dv_detail_order` (`id`, `orderId`, `productId`, `quantity`) VALUES
(124, 50, 10, 1),
(125, 50, 11, 1),
(126, 50, 30, 1),
(127, 50, 33, 1),
(128, 50, 36, 1),
(129, 50, 35, 1),
(130, 51, 10, 1),
(131, 51, 30, 1),
(132, 51, 36, 1),
(133, 51, 35, 1),
(134, 51, 11, 1),
(135, 51, 33, 1),
(136, 52, 41, 1),
(137, 52, 40, 1),
(138, 52, 39, 1),
(139, 53, 11, 1),
(140, 53, 10, 1),
(141, 53, 30, 1),
(142, 107, 10, 1),
(143, 107, 11, 1),
(144, 107, 30, 1),
(145, 107, 35, 1),
(146, 107, 36, 1),
(147, 108, 45, 3),
(148, 108, 46, 4),
(149, 108, 47, 4),
(150, 108, 48, 2),
(151, 109, 45, 1),
(152, 110, 10, 1),
(153, 110, 11, 1),
(154, 110, 34, 2),
(155, 110, 43, 1),
(156, 110, 35, 1),
(157, 110, 36, 1),
(158, 111, 46, 2),
(159, 111, 36, 2),
(160, 111, 47, 4),
(161, 111, 35, 1),
(162, 111, 37, 2),
(163, 111, 38, 2),
(164, 111, 39, 1),
(165, 111, 40, 1),
(166, 111, 54, 1),
(167, 111, 11, 1),
(168, 111, 33, 2),
(169, 111, 30, 2),
(170, 111, 41, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dv_order`
--

CREATE TABLE `dv_order` (
  `id` int(11) NOT NULL,
  `orderNumber` varchar(255) NOT NULL,
  `totalAmount` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `active_flg` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dv_order`
--

INSERT INTO `dv_order` (`id`, `orderNumber`, `totalAmount`, `userId`, `create_date`, `update_date`, `active_flg`, `status`) VALUES
(21, '0', 40000, 10, '2026-04-03 19:21:55', '2023-04-03 19:51:41', 0, 0),
(22, '0', 40000, 10, '2026-05-03 19:21:57', '2023-05-03 19:51:42', 0, 0),
(23, '0', 370000, 10, '2025-05-03 19:24:49', '2023-05-03 19:24:49', 0, 2),
(24, '0', 220000, 10, '2026-05-03 19:33:46', '2023-05-03 19:33:46', 0, 2),
(25, '0', 220000, 10, '2023-05-03 19:48:26', '2023-05-03 19:48:26', 0, 2),
(26, '0', 200000, 10, '2023-05-03 19:49:55', '2023-05-03 19:49:55', 0, 2),
(27, '0', 20000, 10, '2023-05-03 19:51:49', '2023-05-03 19:51:49', 0, 2),
(28, '0', 200000, 10, '2023-05-03 19:55:07', '2023-05-03 19:55:07', 0, 2),
(29, '0', 20000, 10, '2023-05-03 20:02:32', '2023-05-03 20:02:32', 0, 2),
(30, '0', 35000, 10, '2023-05-03 20:04:43', '2023-05-03 20:04:43', 0, 2),
(31, '0', 20000, 10, '2023-05-03 20:08:31', '2023-05-03 20:08:31', 0, 2),
(32, '0', 45000, 10, '2023-05-03 20:11:26', '2023-05-03 20:11:26', 0, 2),
(33, '0', 15000, 10, '2023-05-03 20:18:01', '2023-05-03 20:18:01', 0, 2),
(34, '0', 15000, 10, '2023-05-03 20:27:38', '2023-05-03 21:30:25', 0, 1),
(35, '0', 15000, 10, '2023-05-03 20:27:56', '2023-05-03 20:27:56', 0, 2),
(36, '0', 200000, 10, '2023-05-03 20:28:28', '2023-05-03 20:28:28', 0, 2),
(37, '0', 20000, 10, '2023-05-03 20:30:10', '2023-05-03 21:30:20', 0, 0),
(38, '0', 20000, 10, '2023-05-03 20:33:35', '2023-05-03 20:33:35', 0, 2),
(39, '0', 20000, 10, '2023-05-03 20:52:35', '2023-05-03 21:30:17', 0, 1),
(40, '0', 20000, 10, '2023-05-03 20:54:25', '2023-05-03 20:54:25', 0, 2),
(41, '0', 80000, 8, '2023-05-03 20:58:34', '2023-05-03 20:58:34', 0, 2),
(42, '0', 55000, 8, '2023-05-03 21:00:33', '2023-05-03 21:30:15', 0, 1),
(43, '0', 870000, 10, '2023-05-03 21:43:55', '2023-05-03 21:45:27', 0, 1),
(44, '0', 240000, 10, '2023-05-03 21:56:48', '2023-05-03 21:56:48', 0, 2),
(45, '0', 350000, 10, '2026-05-07 15:13:11', '2026-05-07 15:25:08', 0, 1),
(47, '0', 300000, 1, '2026-04-04 18:13:22', '2026-04-04 18:13:22', 0, 2),
(48, '0', 300000, 1000, '2026-04-04 18:30:19', '2026-04-05 11:32:08', 0, 0),
(50, '0', 14700678, 11, '2026-04-05 12:43:09', '2026-04-05 12:43:25', 1, 1),
(51, '0', 14700678, 8, '2026-04-05 13:03:15', '2026-04-05 13:03:32', 1, 1),
(52, '0', 2685734, 8, '2026-04-01 13:05:10', '2026-04-05 13:06:53', 1, 1),
(53, '0', 55000, 8, '2026-04-02 13:07:22', '2026-04-05 13:07:54', 1, 1),
(100, '0', 350000, 10, '2026-03-07 15:13:11', '2026-03-07 15:25:08', 1, 1),
(101, '0', 350000, 10, '2026-03-06 15:13:11', '2026-03-06 15:25:08', 1, 1),
(102, '0', 350000, 10, '2026-03-07 15:13:11', '2026-03-07 15:25:08', 1, 1),
(103, '0', 350000, 10, '2026-03-07 15:13:11', '2026-03-07 15:25:08', 1, 1),
(104, '0', 350000, 10, '2026-02-07 15:13:11', '2026-02-07 15:25:08', 1, 1),
(105, '0', 350000, 10, '2026-02-07 15:13:11', '2026-02-07 15:25:08', 1, 1),
(106, '0', 350000, 10, '2026-01-07 15:13:11', '2026-01-07 15:25:08', 1, 1),
(107, '0', 700678, 9, '2026-04-05 13:43:55', '2026-04-05 13:44:32', 1, 1),
(108, '0', 8238800, 10, '2026-04-05 18:38:54', '2026-04-05 18:39:07', 1, 1),
(109, '0', 1049000, 10, '2026-04-05 19:26:49', '2026-04-07 15:38:12', 1, 1),
(110, '0', 1126678, 1004, '2026-04-05 21:12:23', '2026-04-05 21:12:58', 1, 1),
(111, '0', 51214484, 9, '2026-04-07 18:25:32', '2026-04-07 18:25:32', 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dv_order_products_dv_product`
--

CREATE TABLE `dv_order_products_dv_product` (
  `dvOrderId` int(11) NOT NULL,
  `dvProductId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dv_order_products_dv_product`
--

INSERT INTO `dv_order_products_dv_product` (`dvOrderId`, `dvProductId`) VALUES
(47, 2),
(47, 10),
(47, 12),
(47, 17),
(47, 22),
(48, 2),
(48, 10),
(48, 12),
(48, 17),
(48, 22),
(50, 10),
(50, 11),
(50, 30),
(50, 33),
(50, 35),
(50, 36),
(51, 10),
(51, 11),
(51, 30),
(51, 33),
(51, 35),
(51, 36),
(52, 39),
(52, 40),
(52, 41),
(53, 10),
(53, 11),
(53, 30),
(107, 10),
(107, 11),
(107, 30),
(107, 35),
(107, 36),
(108, 45),
(108, 46),
(108, 47),
(108, 48),
(109, 45),
(110, 10),
(110, 11),
(110, 34),
(110, 35),
(110, 36),
(110, 43),
(111, 11),
(111, 30),
(111, 33),
(111, 35),
(111, 36),
(111, 37),
(111, 38),
(111, 39),
(111, 40),
(111, 41),
(111, 46),
(111, 47),
(111, 54);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dv_product`
--

CREATE TABLE `dv_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `active_flg` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `unit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dv_product`
--

INSERT INTO `dv_product` (`id`, `name`, `categoryId`, `price`, `image`, `size`, `weight`, `description`, `create_date`, `update_date`, `active_flg`, `status`, `unit`) VALUES
(1, 'Kìm cắt sát 6', 3, 20000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNj7QEuqTsY3-_SOi8rBERxnUPRJxPp2usw&usqp=CAU', '8mm', '100g', 'Sản phẩm thuộc hãng Kapusi', NULL, NULL, 0, 0, 'Cái'),
(2, 'Búa tay ngắn', 3, 15000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8_QcC9KxOgi4eqrRQw29-vAZMzacX8swsdQ&usqp=CAU', '8mm', '100g', 'Sản phẩm thuộc hãng Kapusi', NULL, NULL, 0, 1, 'Cái'),
(3, 'Búa cán dài', 1, 20000, 'https://e7.pngegg.com/pngimages/512/412/png-clipart-hammer-hammer.png', '8mm', '100g', 'Sản phẩm thuộc hãng Kapusi', NULL, NULL, 0, 0, 'Hôp'),
(4, 'Búa đóng đinh', 1, 1400, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HkLgwhjCAkFtkM1Wlpgy4bYlNhqnOjWvCw&usqp=CAU', '14mm', '100g', 'Sản phẩm thuộc hãng Kapusi', NULL, NULL, 0, 0, 'Model'),
(10, 'Gundam Bandai HGSEED 263 Legend Gundam 1/144 [GDB] [BHG]', 1, 20000, 'https://bizweb.dktcdn.net/thumb/grande/100/342/840/products/a1-80ca2303-28fe-4005-af45-eac49fb0e48e.jpg?v=1772618374040', '8mm', '100g', '- Đặc điểm nổi bật: \n+ Mô hình sử dụng Sticker để tăng thêm độ chi tiết.\n+ Mô hình có biên độ cử động và có độ chi tiết ở mức trung bình khá.\n- Series: Mobile Suit Gundam SEED Destiny\n- Loại sản phẩm: Model kits, mô hình gundam', NULL, NULL, 1, 1, 'Cai'),
(11, 'HG GM SNIGER', 1, 20000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/342/840/products/1-5887848b-6583-4b8e-b386-76e3821d35b5.jpg?v=1775119191337', '20cm', '100g', '+ Mô hình sử dụng sticker để tăng thêm độ chi tiết.\n+ Mô hình có biên độ cử động và có độ chi tiết ở mức khá.\n- Series: Mobile Suit Gundam \n- Loại sản phẩm: Model kits, mô hình gundam', NULL, NULL, 1, 1, 'Cái'),
(12, 'Bua to', 3, 20000, 'https://cf.shopee.vn/file/0b0cde6d0ae189269f4ab9916576f5b3', '20cm', '100g', 'Sản phẩm thuộc hãng Kapusi', NULL, NULL, 0, 1, 'Cái'),
(13, 'Kéo cắt tay', 4, 75000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgsEYWQbaTs_f4AI_jE5FWJUHLAnRcKQP1A&usqp=CAU', '20000', '200g', 'Mô tả hình ảnh', NULL, NULL, 0, 1, 'Cái'),
(14, 'Tovit can dai', 5, 10000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC9L3nTq9S9OMqeXG4Km97YeSLwExTrtiDBQ&usqp=CAU', '20cm', '100g', 'mota ', NULL, NULL, 0, 1, 'Cai'),
(15, 'nash', 6, 2000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgsEYWQbaTs_f4AI_jE5FWJUHLAnRcKQP1A&usqp=CAU', 'ams', 'asasa', 'aasas', NULL, NULL, 0, 0, 'sdsdsd'),
(16, 'Máy khoan cầm tay', 7, 750000, 'https://dungcucamtaymakita.com/Uploads/images/M%C3%A1y%20khoan/M%C3%A1y%20khoan%20d%C3%B9ng%20pin/khoan-pin-gia-re-tot-nhat-2.jpg', '30cm', '3kg', 'Máy khoan cầm tay mini Nhật', NULL, NULL, 0, 1, 'Cái'),
(17, 'Búa tạ', 1, 200000, 'https://thegioidonghe.com.vn/media/catalogue/20200502205440-7.jpg', '30cm', '5kg', 'Búa tạ cán nhựa', NULL, NULL, 0, 1, 'Cái'),
(18, 'Búa sửng dê', 1, 35000, 'https://product.hstatic.net/1000365242/product/4_0e4420b9935e469f89e89f9cd4226e65_master.png', '20cm', '1kg', 'Búa Sừng Dê Tolsen 25028', NULL, NULL, 0, 1, 'Cái'),
(19, 'Kìm mỏ nhọn asaki', 3, 35000, 'https://www.ketnoitieudung.vn/data/bt1/kim-nhon-tolsen-10006-1512349487.jpg', '6 \'\'', '300g', 'Kìm nhọn Tolsen 10006', NULL, NULL, 0, 1, 'Cái'),
(20, 'Kìm cắt đa năng', 3, 30000, 'https://www.sumobonsai.com/files/sanpham/697/1/jpg/kem-cat-da-nang-shell-nhat-ban-160-mm.jpg', '20mm', '100g', 'Kềm Cắt Đa Năng Shell Nhật Bản 160 mm', NULL, NULL, 0, 1, 'Cái'),
(21, 'Kéo cắt nội địa nhật', 4, 75000, 'https://salt.tikicdn.com/cache/w1200/ts/product/b3/c6/fd/af60ab4fbe6c158b816bfa75fd376f1a.jpg', '10 \'\'', '300g', 'Kéo Nhật Nội Địa SK5 Siêu Sắc', NULL, NULL, 0, 1, 'Cái'),
(22, 'Kéo mở bia', 4, 45000, 'https://cdn.tgdd.vn/2021/11/CookDish/4-cong-dung-cua-cai-keo-ma-ban-chua-biet-avt-1200x676.jpg', '10m', '300g', '4 công dụng bất ngờ của cái kéo', NULL, NULL, 0, 1, 'Chiếc'),
(23, 'Kéo cắt cành', 4, 50000, 'https://thietbiphattien.com/uploads/source/san-pham/keo-cat-canh-tia-cay-kapusi-k-8618-cao-cap-dai-200mm-nhat-ban/keo-cat-canh-kapusi-k-8618-cao-cap-thiet-bi-phat-tien-(1).jpg', '20mm', '100g', 'kéo cắt cành tỉa cây kapusi k-8618', NULL, NULL, 0, 1, 'Chiếc'),
(24, 'Mô hình Gundam Bandai MG Gelgoog Cannon 1/100 [GDB] [BMG]', 4, 15000, 'blob:chrome-extension://dbjbempljhcmhlfpfacalomonjpalpko/4087054e-1731-4975-ba80-6fb3ae8d0433OHZpAhoCm91tjhBbXFZpvayI40bd-IReClrwOBagfiCYub3_OLTfBxA2qRbnaxKMHfA&usqp=CAU', '10mm', '50g', 'Chất vkl', NULL, NULL, 0, 0, 'Cái'),
(25, 'Kéo cắt cành', 4, 35000, 'blob:chrome-extension://dbjbempljhcmhlfpfacalomonjpalpko/68239248-81c2-410d-9265-e60bf9318f93', '10mm', '100g', '- Đặc điểm nổi bật: \n+ Mô hình sử dụng Sticker để tăng thêm độ chi tiết.\n+ Mô hình có biên độ cử động và có độ chi tiết ở mức trung bình khá.\n- Series: Mobile Suit Gundam SEED Destiny\n- Loại sản phẩm: Model kits, mô hình gundam', NULL, NULL, 0, 0, 'Cái'),
(26, 'Tovit tools đen', 5, 25000, 'https://lh3.googleusercontent.com/GpBZbSiKjpSAQgsrNX1NyTLQbVkucfHg7BGL1MIk6CU8OH2G5DuLMCAO66m9WzKTiuXTF0fDkejNPoU7FhkRz8ECHP80xSajT1Dy4ccxIa1pUl1e_8O8U6qNas7LjC_yjXPrrBKB8Q=w2400', '10m', '100g', 'Top 8 thương hiệu tô vít tốt nhất', NULL, NULL, 0, 1, 'Cái'),
(27, 'Tovit 2 canh', 5, 34000, 'https://cuahangdungcu.vn/resources/2019/09/12/tua-vit-century-nho_2_.jpg', '20m', '300g', 'Tô vít 2 cạnh đa năng Century', NULL, NULL, 0, 1, 'Chiếc'),
(28, 'Tovit viha', 5, 20000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/212/637/products/42991-wiha.jpg?v=1615254906753', '20m', '100g', 'Bộ tô vít Wiha -# 42991', NULL, NULL, 0, 1, 'Cái'),
(29, 'Thước 5m kapusi', 6, 12000, 'https://product.hstatic.net/200000567559/product/upload_0f9f399bb65049aeb9e6767a5a725264.jpg', '5m', '100g', 'Thước 5m kapusi ', NULL, NULL, 0, 1, 'Cái'),
(30, 'Gundam Bandai MG Gelgoog Cannon 1/100 [GDB]', 6, 15000, 'https://bizweb.dktcdn.net/thumb/grande/100/342/840/products/a2-38bc9378-b945-45d7-a207-2046863ce3f6.jpg?v=1767955749030', '20m', '100g', 'chất', NULL, NULL, 1, 1, 'Cái'),
(31, 'Máy khoan bosch', 7, 1500000, 'https://diyhomedepot.vn/Uploads/images/image/BOSCH/may-khoan-gbh-8-45dv.jpg', '59cm', '2kg', 'Máy khoan bê tông công suất lớn Bosch GBH 8-45DV', NULL, NULL, 0, 1, 'Hộp'),
(32, 'Máy khoan 10', 7, 2000000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MB3ry99gDtbCWN-6MqCQSmkmgCRNDDtv8g&usqp=CAU', '50cm', '5kg', 'Máy khoan cầm tay cho sản phẩm', NULL, NULL, 0, 1, 'Chiếc'),
(33, 'Gundam Bandai PG Unleashed RX-93 Nu Gundam 1/60 [GDB] [BPG]', 5, 14000000, 'https://bizweb.dktcdn.net/thumb/grande/100/342/840/products/a2-38bc9378-b945-45d7-a207-2046863ce3f6.jpg?v=1767955749030', '36cm', '5kg', '+ Có đèn LED cho phần đầu và thân (cockpit) (đèn LED phải mua riêng).\n+ Sử dụng khớp bàn tay động nên các ngón tay có thể cử động được.\n+ Có độ chi tiết cục cao với biên độ cử động linh hoạt mà chỉ ở mẫu PG mới có.', NULL, NULL, 1, 1, 'Model'),
(34, 'Gundam HG 00 Raiser 038', 1, 146000, 'https://bizweb.dktcdn.net/100/479/026/products/37f8d4f7dcf89f3ca61315e5ec53220c-1680284014859.jpg?v=1680284023773', '14cm', '300g', 'THƯƠNG HIỆU : Tthongli\nPHIÊN BẢN : HG 1/144\nChiều cao: 13-16cm\nPHÂN LOẠI SP : LẮP RÁP', NULL, NULL, 1, 1, 'Model'),
(35, 'Gundam Bandai HG UC Narrative', 3, 500000, 'https://bizweb.dktcdn.net/100/479/026/products/7620c8110943fba23d8206c7a7c20575-1679844021609.jpg?v=1679844025617', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(36, 'Gundam Bandai HGCE ZGMF-X20A', 3, 145678, 'https://bizweb.dktcdn.net/100/479/026/products/b62c7ace00e2a5ca84b7e94a76a852db-1679842393654.jpg?v=1679842398890', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(37, 'RG 1/144 Hi-ν GUNDAM Hi Nu Bandai', 3, 1231314, 'https://bizweb.dktcdn.net/100/479/026/products/798550bccf50e62c159b43e8ecaa2105-1680086197100.jpg?v=1680174664153', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(38, 'RG 1/144 Gundam Astray Gold Frame', 3, 556677, 'https://bizweb.dktcdn.net/100/479/026/products/b62c7ace00e2a5ca84b7e94a76a852db-1679842393654.jpg?v=1679842398890', '14cm', '300g', 'Mô hình sử dụng sticker để tăng thêm độ chi tiết', NULL, NULL, 1, 1, 'Model'),
(39, 'RG WING GUNDAM ZERO EW BANDAI', 3, 1434234, 'https://bizweb.dktcdn.net/100/479/026/products/e45d2747148285d641989f5431342af7-1679842393654.jpg?v=1679842400010', '14cm', '300g', 'Mô hình sử dụng sticker để tăng thêm độ chi tiết', NULL, NULL, 1, 1, 'Model'),
(40, ' Gundam Bandai Astray Red Frame', 3, 699000, 'https://bizweb.dktcdn.net/100/479/026/products/051e98e1d0105bc7a3a913aaf6ca2966-1679659915178.jpg?v=1679659921567', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(41, 'RG Aile Strike Gundam', 3, 552500, 'https://bizweb.dktcdn.net/100/479/026/products/018036269b0fd66732200614789f8201-1679720211828.jpg?v=1679720309173', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(42, 'RG Full Armor Unicorn', 3, 1600000, 'https://bizweb.dktcdn.net/100/479/026/products/c91aac7f8c6f3ea3d942595418e89f1c-1680175475946.jpg?v=1680175870317', '14cm', '1kg', '', NULL, NULL, 1, 1, 'Model'),
(43, 'HG 00 Avalanche Exia', 1, 149000, 'https://bizweb.dktcdn.net/100/479/026/products/b44bbd73-ccc0-4353-8341-fc698e69f752.jpg?v=1679841670907', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(44, 'HG CE Infinite Justice Gundam', 1, 450000, 'https://bizweb.dktcdn.net/100/479/026/products/b967ac83c1f0b0db07c846a7bafff0b6-1679722565894.jpg?v=1679722570793', '14cm', '300g', '', NULL, NULL, 1, 1, 'Model'),
(45, '[INFINITE DIMENSION] MG 1/100 GENESIS', 4, 1049000, 'https://bizweb.dktcdn.net/100/479/026/products/sg-11134201-22120-87kl1m022nkvde-1680323312085.jpg?v=1680323315420', '14cm', '1kg', '', NULL, NULL, 1, 1, 'Model'),
(46, 'MG 1/100 BANSHEE NORN', 4, 549000, 'https://bizweb.dktcdn.net/100/479/026/products/sg-11134201-22110-i22g351xigjvbd-1680285236086.jpg?v=1680285239523', '20cm', '1kg', '', NULL, NULL, 1, 1, 'Model'),
(47, 'Bộ Khung Xương hợp kim MG 1/100 Barbatos', 4, 399000, 'https://bizweb.dktcdn.net/100/479/026/products/vn-11134201-23020-89sm46mvsznv1b-1680285061877.jpg?v=1680285065360', '20m', '500g', '', NULL, NULL, 1, 1, 'Model'),
(48, 'MG 8824 Zeta III Red Snake', 4, 649900, 'https://bizweb.dktcdn.net/100/479/026/products/c1c06da5ba487998430d94555ad5a93b-1680282849223.jpg?v=1680282852307', '20cm', '1kg', '', NULL, NULL, 1, 1, 'Model'),
(49, 'Gundam HG 00 Raiser 038', 5, 200000, 'https://bizweb.dktcdn.net/100/479/026/themes/899411/assets/slide-img1.png?1753330599826', '14cm', '300g', 'gundam cho moi nha', NULL, NULL, 1, 1, 'Model'),
(50, 'Gundam HG 00 Raiser 038', 4, 345678, 'https://product.hstatic.net/1000231532/product/gundam_epyon_rg_c6676342319b4c30b35820dd01b8f43c_master.jpg', '14cm', '300g', 'Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh , bảo quản tránh xa tầm tay trẻ em và đàn ông đang cho con bú', NULL, NULL, 1, 1, 'Model'),
(51, 'Gundam HG 00 Raiser 038', 3, 213124, 'https://product.hstatic.net/1000231532/product/gundam_epyon_rg_c6676342319b4c30b35820dd01b8f43c_master.jpg', '14cm', '300g', 'Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh , bảo quản tránh xa tầm tay trẻ em và đàn ông đang cho con bú', NULL, NULL, 1, 1, 'Model'),
(52, 'Mô hình Gundam Bandai HGSEED 263 Legend Gundam 1/144 [GDB] [BHG]', 4, 1231244, 'https://product.hstatic.net/1000231532/product/gundam_epyon_rg_c6676342319b4c30b35820dd01b8f43c_master.jpg', '20cm', '1kg', 'Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh , bảo quản tránh xa tầm tay trẻ em và đàn ông đang cho con bú', NULL, NULL, 1, 1, 'Model'),
(53, 'Gundam Bandai HGSEED 263 Legend Gundam 1/144 [GDB] [BHG]', 5, 123123, 'https://product.hstatic.net/1000231532/product/gundam_epyon_rg_c6676342319b4c30b35820dd01b8f43c_master.jpg', '20cm', '300g', 'Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh , bảo quản tránh xa tầm tay trẻ em và đàn ông đang cho con bú', NULL, NULL, 1, 1, 'Model'),
(54, 'Gundam Bandai MG Gelgoog Cannon 1/100 [GDB]', 5, 12312412, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/342/840/products/1-5887848b-6583-4b8e-b386-76e3821d35b5.jpg?v=1775119191337', '30cm', '5kg', 'Mô hình sử dụng sticker để tăng thêm độ chi tiết', NULL, NULL, 1, 1, 'Model'),
(55, 'Luffy Aoban', 6, 120000, 'https://bizweb.dktcdn.net/100/503/392/products/0-169d1fc0-503e-47e7-9895-c162598b51a7.jpg?v=1710692411460', '14cm', '300g', 'Mô hình đảo hải tặc chất lượng ', NULL, NULL, 1, 1, 'Model'),
(56, 'luigi', 1, 123422, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMPRjQ-b_zsonIvDTippdNo-7bCvBvDM8Rg&s', '14cm', '300g', 'mama mia luilgi', NULL, NULL, 1, 0, '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dv_user`
--

CREATE TABLE `dv_user` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `address` varchar(500) NOT NULL DEFAULT '',
  `phone_no` varchar(12) NOT NULL DEFAULT '',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `active_flg` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `password` varchar(255) NOT NULL,
  `role` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dv_user`
--

INSERT INTO `dv_user` (`id`, `name`, `email`, `address`, `phone_no`, `create_date`, `update_date`, `active_flg`, `status`, `password`, `role`) VALUES
(1, 'Người Thứ Nhất', 'test1@gmail.com', '322 My Dinh,Nam Tu Liem,  Ha Noi', '0857847685', '2026-04-23 10:44:41', '2026-04-23 10:44:41', 1, 1, '123456', ''),
(7, 'Gái Thứ Hai', 'test2@gmail.com', '', '0857847685', '2026-04-23 10:44:41', '2026-04-23 10:44:41', 1, 1, '123123', ''),
(8, 'Nhân Văn Thứ Ba', 'test3@gmail.com', '322 My Dinh,Nam Tu Liem,  Ha Noi', '0987654321', '2026-04-23 10:44:41', '2026-04-27 20:04:11', 1, 1, '$2b$10$YdlP5IPo.WnonYL5K3dyAuKN/iO2KukSlF/elk9U7D2GXNDC7mO4C', ''),
(9, 'Hoang Thiên Đế', 'hoangthiende@gmail.com', 'Yen Loc - Y Yen - Nam Dinh', '0969966696', '2026-04-23 10:44:41', '2026-04-05 13:43:53', 1, 1, '$2b$10$gESE3HSHIXtm4DH2FSAEUekxjXq291VIgEdEMDXaccUtNKueMrryW', ''),
(10, 'Em sinh Viên Nghèo', 'sv_vaybu@gmail.com', 'Yên Lộc Ý Yên Nam Định', '0989174718', '2026-04-03 18:36:55', '2026-04-03 19:21:46', 1, 1, '$2b$10$irC9f.7gMZkS/QOmpsNhIeDTtboCwOhAZ2AAgIHotTFgmklVntrzq', ''),
(11, 'Khánh Tối Lắm', 'khanh123@gmail.com', 'Yên Lộc Ý Yên Nam Định', '0857847685', '2026-04-03 21:47:32', '2026-04-08 13:17:44', 1, 1, '$2b$10$ebeHbmXtKHOSp3LWeIDlD.UnnsBhg8fPg6Cj.0Q8c1C.HGmL50G7S', ''),
(100, 'Supper Admin', 'admin@gmail.com', 'Thiên Đình', '0857847685', '2026-04-03 21:47:32', '2026-04-08 13:17:44', 1, 1, '$2b$10$irC9f.7gMZkS/QOmpsNhIeDTtboCwOhAZ2AAgIHotTFgmklVntrzq', 'admin'),
(998, 'admin', 'Người Thứ Nhất', 'test1@gmail.com', '322 My Dinh,', '0000-00-00 00:00:00', '2026-04-23 10:44:41', 1, 1, '1', 'admin'),
(1000, 'dumachia', 'duma@gmail.com', 'thanh hóa ', '1234567890', '2026-04-04 18:29:17', '2026-04-04 18:30:12', 1, 1, '$2b$10$l27jEqOz2UiEPn4KAFv9au/rSRH6iVKW6kCapz54QLKbBskDQfjC.', ''),
(1004, 'demo1', '123@gmail.com', 'yen bai ', '123456789', '2026-04-05 21:10:38', '2026-04-05 21:12:15', 1, 1, '$2b$10$AgV0AeFHc3Uc0l2zZJdyXuon629rNqUqwbP1MZi7CbJguEONcWidK', '');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `dv_category`
--
ALTER TABLE `dv_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dv_detail_order`
--
ALTER TABLE `dv_detail_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e7f9e643d03fb137b647b0a1671` (`orderId`),
  ADD KEY `FK_c4a75fa243ac28acd6b38db4095` (`productId`);

--
-- Chỉ mục cho bảng `dv_order`
--
ALTER TABLE `dv_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4c6dabc477b8e12a0423704e0e9` (`userId`);

--
-- Chỉ mục cho bảng `dv_order_products_dv_product`
--
ALTER TABLE `dv_order_products_dv_product`
  ADD PRIMARY KEY (`dvOrderId`,`dvProductId`),
  ADD KEY `IDX_4d27f9f51c421dd6cf8eb1a066` (`dvOrderId`),
  ADD KEY `IDX_a39ddf273979a1c437d42c9312` (`dvProductId`);

--
-- Chỉ mục cho bảng `dv_product`
--
ALTER TABLE `dv_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_19eca97806ad23fb2ae11a46de8` (`categoryId`);

--
-- Chỉ mục cho bảng `dv_user`
--
ALTER TABLE `dv_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dv_category`
--
ALTER TABLE `dv_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `dv_detail_order`
--
ALTER TABLE `dv_detail_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT cho bảng `dv_order`
--
ALTER TABLE `dv_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT cho bảng `dv_product`
--
ALTER TABLE `dv_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT cho bảng `dv_user`
--
ALTER TABLE `dv_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `dv_detail_order`
--
ALTER TABLE `dv_detail_order`
  ADD CONSTRAINT `FK_c4a75fa243ac28acd6b38db4095` FOREIGN KEY (`productId`) REFERENCES `dv_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e7f9e643d03fb137b647b0a1671` FOREIGN KEY (`orderId`) REFERENCES `dv_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `dv_order`
--
ALTER TABLE `dv_order`
  ADD CONSTRAINT `FK_4c6dabc477b8e12a0423704e0e9` FOREIGN KEY (`userId`) REFERENCES `dv_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `dv_order_products_dv_product`
--
ALTER TABLE `dv_order_products_dv_product`
  ADD CONSTRAINT `FK_4d27f9f51c421dd6cf8eb1a0661` FOREIGN KEY (`dvOrderId`) REFERENCES `dv_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_a39ddf273979a1c437d42c9312f` FOREIGN KEY (`dvProductId`) REFERENCES `dv_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `dv_product`
--
ALTER TABLE `dv_product`
  ADD CONSTRAINT `FK_19eca97806ad23fb2ae11a46de8` FOREIGN KEY (`categoryId`) REFERENCES `dv_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
