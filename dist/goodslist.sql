/*
Navicat MySQL Data Transfer

Source Server         : mz
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : rucishenghuo

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2018-12-29 10:37:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) CHARACTER SET utf8 NOT NULL,
  `goodsname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `oPrice` int(255) NOT NULL,
  `deloprice` int(255) NOT NULL,
  `settime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sales` int(255) NOT NULL,
  `hot` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('51', '../images/7ddb8097f67249a7dd60e755e75a237a.jpg', 'Elleozhang V领T恤打底衫 220010906001 粉色', '19', '119', '2018-12-26 19:27:52', '129', '7');
INSERT INTO `goodslist` VALUES ('52', '../images/7b7503cc68c3cf0b2a6825cc4438e0e0.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18147', '159', '369', '2018-12-26 19:27:52', '130', '8');
INSERT INTO `goodslist` VALUES ('53', '../images/a2ba2e45d45dd74e60e2230b5c9c8ed4.jpg', 'Leonisa收腹提臀束腰连体轻薄塑身衣透气束身衣加强版瘦身塑型衣', '758', '839', '2018-12-26 19:27:52', '131', '9');
INSERT INTO `goodslist` VALUES ('54', '../images/616164208c74decf2fbf394db60a8e19.jpg', '普鲁思2018秋季新款高端男士西服套装三件套送领带+衬衫', '689', '1688', '2018-12-26 19:27:52', '132', '10');
INSERT INTO `goodslist` VALUES ('55', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '615', '2018-12-26 19:27:52', '133', '11');
INSERT INTO `goodslist` VALUES ('56', '../images/786344ff003da22dedaa8febcc87b472.jpg', 'Leonisa聚拢无钢圈上托防下垂防滑性感一片式无肩带底围加宽文胸', '588', '988', '2018-12-26 19:27:52', '134', '12');
INSERT INTO `goodslist` VALUES ('57', '../images/2145cba09ca07d63489c1a97246af58f.jpg', '粗呢三角下摆西装外套', '3280', '3320', '2018-12-26 19:27:52', '135', '13');
INSERT INTO `goodslist` VALUES ('58', '../images/06adb384d4a9e4193751a5128ea8d9e1.jpg', '恒源祥彩羊毛衫男加厚100%纯羊毛冬季v领毛衣秋冬款鸡心领针织衫DMY160901', '358', '698', '2018-12-26 19:27:52', '136', '14');
INSERT INTO `goodslist` VALUES ('59', '../images/64b415dc51210ffa683cd7cff9d2a581.jpg', 'Leonisa女超薄款文胸聚拢无插片钢圈胸罩前开扣性感运动防震内衣', '399', '599', '2018-12-26 19:27:52', '137', '15');
INSERT INTO `goodslist` VALUES ('60', '../images/40fd2768708d0ec7b696eb8393b01978.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18191', '179', '439', '2018-12-26 19:27:52', '138', '16');
INSERT INTO `goodslist` VALUES ('61', '../images/65cb7f2ddb316f46320c349b588badc9.jpg', 'POGO时尚情侣休闲鞋轻质软底潮鞋', '398', '399', '2018-12-26 19:27:52', '139', '17');
INSERT INTO `goodslist` VALUES ('62', '../images/a2ba2e45d45dd74e60e2230b5c9c8ed4.jpg', 'Leonisa收腹提臀束腰连体轻薄塑身衣透气束身衣加强版瘦身塑型衣', '7582', '34839', '2018-12-26 19:27:52', '140', '18');
INSERT INTO `goodslist` VALUES ('63', '../images/786344ff003da22dedaa8febcc87b472.jpg', 'Leonisa聚拢无钢圈上托防下垂防滑性感一片式无肩带底围加宽文胸', '5818', '9388', '2018-12-26 19:27:52', '141', '1');
INSERT INTO `goodslist` VALUES ('64', '../images/40fd2768708d0ec7b696eb8393b01978.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18191', '179', '4539', '2018-12-26 19:27:52', '142', '2');
INSERT INTO `goodslist` VALUES ('65', '../images/616164208c74decf2fbf394db60a8e19.jpg', '普鲁思2018秋季新款高端男士西服套装三件套送领带+衬衫', '69', '1688', '2018-12-26 19:27:52', '143', '3');
INSERT INTO `goodslist` VALUES ('66', '../images/65cb7f2ddb316f46320c349b588badc9.jpg', 'POGO时尚情侣休闲鞋轻质软底潮鞋', '3298', '33499', '2018-12-26 19:27:52', '144', '4');
INSERT INTO `goodslist` VALUES ('67', '../images/7ddb8097f67249a7dd60e755e75a237a.jpg', 'Elleozhang V领T恤打底衫 220010906001 粉色', '1119', '1319', '2018-12-26 19:27:52', '145', '5');
INSERT INTO `goodslist` VALUES ('68', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '6145', '2018-12-26 19:27:52', '146', '6');
INSERT INTO `goodslist` VALUES ('69', '../images/7b7503cc68c3cf0b2a6825cc4438e0e0.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18147', '1159', '369', '2018-12-26 19:27:52', '147', '29');
INSERT INTO `goodslist` VALUES ('70', '../images/a2ba2e45d45dd74e60e2230b5c9c8ed4.jpg', 'Leonisa收腹提臀束腰连体轻薄塑身衣透气束身衣加强版瘦身塑型衣', '7158', '839', '2018-12-26 19:27:52', '148', '30');
INSERT INTO `goodslist` VALUES ('71', '../images/616164208c74decf2fbf394db60a8e19.jpg', '普鲁思2018秋季新款高端男士西服套装三件套送领带+衬衫', '689', '1688', '2018-12-26 19:27:52', '100', '31');
INSERT INTO `goodslist` VALUES ('72', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '615', '2018-12-26 19:27:52', '101', '32');
INSERT INTO `goodslist` VALUES ('73', '../images/786344ff003da22dedaa8febcc87b472.jpg', 'Leonisa聚拢无钢圈上托防下垂防滑性感一片式无肩带底围加宽文胸', '588', '988', '2018-12-26 19:27:52', '102', '19');
INSERT INTO `goodslist` VALUES ('74', '../images/2145cba09ca07d63489c1a97246af58f.jpg', '粗呢三角下摆西装外套', '3280', '3320', '2018-12-26 19:27:52', '103', '20');
INSERT INTO `goodslist` VALUES ('75', '../images/06adb384d4a9e4193751a5128ea8d9e1.jpg', '恒源祥彩羊毛衫男加厚100%纯羊毛冬季v领毛衣秋冬款鸡心领针织衫DMY160901', '358', '698', '2018-12-26 19:27:52', '104', '21');
INSERT INTO `goodslist` VALUES ('76', '../images/616164208c74decf2fbf394db60a8e19.jpg', '普鲁思2018秋季新款高端男士西服套装三件套送领带+衬衫', '689', '1688', '2018-12-26 19:27:52', '105', '22');
INSERT INTO `goodslist` VALUES ('77', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '615', '2018-12-26 19:27:52', '106', '23');
INSERT INTO `goodslist` VALUES ('78', '../images/786344ff003da22dedaa8febcc87b472.jpg', 'Leonisa聚拢无钢圈上托防下垂防滑性感一片式无肩带底围加宽文胸', '588', '988', '2018-12-26 19:27:52', '107', '24');
INSERT INTO `goodslist` VALUES ('79', '../images/2145cba09ca07d63489c1a97246af58f.jpg', '粗呢三角下摆西装外套', '280', '3320', '2018-12-26 19:27:52', '108', '25');
INSERT INTO `goodslist` VALUES ('80', '../images/06adb384d4a9e4193751a5128ea8d9e1.jpg', '恒源祥彩羊毛衫男加厚100%纯羊毛冬季v领毛衣秋冬款鸡心领针织衫DMY160901', '3558', '698', '2018-12-26 19:27:52', '109', '26');
INSERT INTO `goodslist` VALUES ('81', '../images/64b415dc51210ffa683cd7cff9d2a581.jpg', 'Leonisa女超薄款文胸聚拢无插片钢圈胸罩前开扣性感运动防震内衣', '399', '599', '2018-12-26 19:27:52', '110', '27');
INSERT INTO `goodslist` VALUES ('82', '../images/40fd2768708d0ec7b696eb8393b01978.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18191', '399', '439', '2018-12-26 19:27:55', '111', '28');
INSERT INTO `goodslist` VALUES ('83', '../images/65cb7f2ddb316f46320c349b588badc9.jpg', 'POGO时尚情侣休闲鞋轻质软底潮鞋', '3298', '33499', '2018-12-26 19:27:53', '112', '29');
INSERT INTO `goodslist` VALUES ('84', '../images/7ddb8097f67249a7dd60e755e75a237a.jpg', 'Elleozhang V领T恤打底衫 220010906001 粉色', '1119', '1319', '2018-12-26 19:27:52', '113', '30');
INSERT INTO `goodslist` VALUES ('85', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '6145', '2018-12-26 19:27:59', '114', '31');
INSERT INTO `goodslist` VALUES ('86', '../images/7b7503cc68c3cf0b2a6825cc4438e0e0.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18147', '1159', '369', '2018-12-26 19:27:58', '115', '32');
INSERT INTO `goodslist` VALUES ('87', '../images/a2ba2e45d45dd74e60e2230b5c9c8ed4.jpg', 'Leonisa收腹提臀束腰连体轻薄塑身衣透气束身衣加强版瘦身塑型衣', '7158', '839', '2018-12-26 19:27:57', '116', '33');
INSERT INTO `goodslist` VALUES ('88', '../images/616164208c74decf2fbf394db60a8e19.jpg', '普鲁思2018秋季新款高端男士西服套装三件套送领带+衬衫', '689', '1688', '2018-12-26 19:27:56', '117', '34');
INSERT INTO `goodslist` VALUES ('89', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '615', '2018-12-26 19:27:55', '118', '35');
INSERT INTO `goodslist` VALUES ('90', '../images/786344ff003da22dedaa8febcc87b472.jpg', 'Leonisa聚拢无钢圈上托防下垂防滑性感一片式无肩带底围加宽文胸', '588', '988', '2018-12-26 19:27:54', '119', '36');
INSERT INTO `goodslist` VALUES ('91', '../images/2145cba09ca07d63489c1a97246af58f.jpg', '粗呢三角下摆西装外套', '3280', '3320', '2018-12-26 19:27:53', '120', '37');
INSERT INTO `goodslist` VALUES ('92', '../images/06adb384d4a9e4193751a5128ea8d9e1.jpg', '恒源祥彩羊毛衫男加厚100%纯羊毛冬季v领毛衣秋冬款鸡心领针织衫DMY160901', '358', '698', '2018-12-26 19:27:52', '121', '38');
INSERT INTO `goodslist` VALUES ('93', '../images/616164208c74decf2fbf394db60a8e19.jpg', '普鲁思2018秋季新款高端男士西服套装三件套送领带+衬衫', '689', '1688', '2018-12-26 19:27:52', '122', '39');
INSERT INTO `goodslist` VALUES ('94', '../images/9625cc7e709df9e7567a11b87bee2710.jpg', 'Leonisa女士透气蕾丝全罩杯文胸 宽肩带调整型聚拢薄款背心式内衣', '315', '615', '2018-12-26 19:27:51', '123', '40');
INSERT INTO `goodslist` VALUES ('95', '../images/786344ff003da22dedaa8febcc87b472.jpg', 'Leonisa聚拢无钢圈上托防下垂防滑性感一片式无肩带底围加宽文胸', '588', '988', '2018-12-26 19:27:52', '124', '41');
INSERT INTO `goodslist` VALUES ('96', '../images/2145cba09ca07d63489c1a97246af58f.jpg', '粗呢三角下摆西装外套', '280', '3320', '2018-12-26 19:27:56', '125', '42');
INSERT INTO `goodslist` VALUES ('97', '../images/06adb384d4a9e4193751a5128ea8d9e1.jpg', '恒源祥彩羊毛衫男加厚100%纯羊毛冬季v领毛衣秋冬款鸡心领针织衫DMY160901', '3558', '698', '2018-12-26 19:27:52', '126', '43');
INSERT INTO `goodslist` VALUES ('98', '../images/64b415dc51210ffa683cd7cff9d2a581.jpg', 'Leonisa女超薄款文胸聚拢无插片钢圈胸罩前开扣性感运动防震内衣', '399', '599', '2018-12-26 19:27:52', '127', '44');
INSERT INTO `goodslist` VALUES ('99', '../images/40fd2768708d0ec7b696eb8393b01978.jpg', 'MAC&JOR美恩杰健康舒适鞋 M18191', '399', '439', '2018-12-26 19:27:50', '128', '45');
SET FOREIGN_KEY_CHECKS=1;
