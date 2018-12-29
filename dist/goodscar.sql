/*
Navicat MySQL Data Transfer

Source Server         : mz
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : rucishenghuo

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2018-12-29 10:37:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodscar
-- ----------------------------
DROP TABLE IF EXISTS `goodscar`;
CREATE TABLE `goodscar` (
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `num` int(255) DEFAULT NULL,
  `goodsname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `oPrice` int(255) DEFAULT NULL,
  `alloprice` int(255) DEFAULT NULL,
  `goodsid` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goodscar
-- ----------------------------
INSERT INTO `goodscar` VALUES ('13313313312', '9', 'MAC&JOR美恩杰健康舒适鞋 M18147', '../images/7b7503cc68c3cf0b2a6825cc4438e0e0.jpg', '159', '1431', '52');
SET FOREIGN_KEY_CHECKS=1;
