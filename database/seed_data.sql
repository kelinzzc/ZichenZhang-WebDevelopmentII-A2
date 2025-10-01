USE charityevents_db;

-- 插入组织数据
INSERT INTO organizations (name, description, mission_statement, contact_email, contact_phone, address) VALUES
('希望之光慈善基金会', '致力于帮助贫困儿童和家庭改善生活条件', '通过教育和社区支持，为弱势群体创造更美好的未来', 'contact@hopelight.org', '+61 2 1234 5678', '123 Charity Street, Sydney NSW 2000'),
('爱心援助组织', '专注于医疗援助和健康促进的非营利组织', '让每个人都能获得基本的医疗服务和健康知识', 'info@careaid.org', '+61 3 9876 5432', '456 Hope Avenue, Melbourne VIC 3000');

-- 插入类别数据
INSERT INTO categories (name, description) VALUES
('Gala Dinner', '正式的慈善晚宴活动'),
('Fun Run', '趣味跑步筹款活动'),
('Silent Auction', '无声拍卖活动'),
('Concert', '慈善音乐会'),
('Workshop', '教育和工作坊活动'),
('Community Fair', '社区集市活动');

-- 插入活动数据（10个样本）
INSERT INTO events (title, description, full_description, category_id, organization_id, event_date, location, venue_details, ticket_price, goal_amount, current_amount, max_attendees, image_url) VALUES
('希望之光年度慈善晚宴', '盛大的年度筹款晚宴', '加入我们参加这个难忘的夜晚，享受精美的晚餐、鼓舞人心的演讲和精彩的娱乐表演。所有收益将用于支持贫困儿童的教育项目。', 1, 1, '2025-10-15 18:30:00', '悉尼会议中心', 'Grand Ballroom, Level 3', 150.00, 50000.00, 32500.00, 300, '/images/gala-dinner.jpg'),
('城市趣味跑2025', '5公里趣味跑步活动', '穿上你的跑鞋，加入我们的5公里趣味跑！适合所有年龄和健身水平。包含T恤、奖牌和赛后茶点。', 2, 2, '2025-09-20 08:00:00', '百年纪念公园', 'Main Entrance, Federation Way', 25.00, 20000.00, 12500.00, 500, '/images/fun-run.jpg'),
('艺术珍品无声拍卖', '独家艺术珍品拍卖晚会', '体验独特的艺术之夜，竞标来自本地和国际艺术家的独家作品。包含鸡尾酒和开胃小菜。', 3, 1, '2025-11-05 19:00:00', '艺术画廊悉尼', 'Modern Art Wing', 75.00, 30000.00, 18000.00, 150, '/images/auction.jpg'),
('爱心音乐会之夜', '本地音乐家慈善音乐会', '享受由知名本地音乐家表演的古典和现代音乐之夜。所有收入将用于购买医疗设备。', 4, 2, '2025-10-28 19:30:00', '悉尼歌剧院', 'Utzon Room', 60.00, 15000.00, 8900.00, 200, '/images/concert.jpg'),
('儿童编程工作坊', '免费编程教育课程', '为期一天的编程入门工作坊，教导孩子们基本的编程概念和创造性思维。', 5, 1, '2025-09-12 10:00:00', '悉尼科技大学', 'Building 11, Room 302', 0.00, 5000.00, 3200.00, 30, '/images/workshop.jpg'),
('秋季社区集市', '家庭友好的社区集市', '享受美食、工艺品、游戏和娱乐活动。适合全家参与的美好周末活动。', 6, 1, '2025-09-25 10:00:00', '海德公园', 'North of Archibald Fountain', 5.00, 8000.00, 4500.00, 1000, '/images/fair.jpg'),
('健康生活研讨会', '营养和健康生活教育', '学习如何通过健康的饮食和生活方式改善生活质量。包含健康午餐和资料包。', 5, 2, '2025-10-10 09:00:00', '皇家植物园', 'The Calyx, Mrs Macquaries Road', 20.00, 6000.00, 3800.00, 80, '/images/seminar.jpg'),
('冬季慈善舞会', '正式的冬季舞会筹款活动', '穿上你最漂亮的礼服，加入我们的冬季慈善舞会。包含晚餐、舞蹈和抽奖活动。', 1, 2, '2025-06-20 19:00:00', '星城酒店', 'Crystal Ballroom', 120.00, 40000.00, 28500.00, 250, '/images/ball.jpg'),
('海滩清洁日', '社区海滩清洁环保活动', '加入我们的海滩清洁活动，保护海洋环境。提供手套、袋子和茶点。', 6, 1, '2025-08-15 09:00:00', '邦迪海滩', 'South End, near Icebergs', 0.00, 2000.00, 1500.00, 100, '/images/beach-clean.jpg'),
('摄影展筹款', '慈善摄影作品展览', '欣赏和购买本地摄影师的精美作品。所有销售收益将捐赠给慈善项目。', 3, 2, '2025-07-22 10:00:00', 'Paddington艺术区', '45 Oxford Street Gallery', 10.00, 12000.00, 7500.00, 120, '/images/photography.jpg');