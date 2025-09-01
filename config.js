// 网站配置文件
// 修改这个文件来快速自定义你的网站

const SITE_CONFIG = {
    // 个人信息
    personal: {
        name: "Juli", // 您的真实姓名
        title: "建筑/家具设计师 | 玩转空间，探索设计的无限可能", // 职业标题
        subtitle: "专注于可持续设计、空间叙事与多维创意设计", // 副标题
        email: "1492086067@qq.com", // 邮箱
        wechat: "Juli00018", // 微信号
        phone: "+86 138-0000-0000", // 电话号码
        location: "上海", // 所在城市
        education: {
            degree: "建筑学学士", // 学位
            school: "华南理工大学", // 学校名称
            major: "工业设计&建筑学", // 专业
            graduationYear: "2018-2024", // 毕业年份
            gpa: "年级优秀" // GPA（可选）
        },
        awards: [ // 获奖经历
            "2024 华南理工大学优秀毕业设计",
            "2023 全球弹性设计竞赛城市设计大奖",
            "2023 香港绿塔竞赛全球Top 10",
            "2021 同济大学国际建造节一等奖（任组长）",
            "2021 国家奖学金"
        ],
        skills: { // 技能专长
            software: [
                "建模渲染软件：Rhino, SketchUp, Unreal Engine, Enscape, Lumion, D5",
                "",
                "平面绘图软件：Photoshop, Auto CAD, Adobe Illustrator",
                "",
                "办公剪辑软件：Figma, Microsoft Office Suite (Excel, PowerPoint, Word), Adobe Audition, 剪映, Miro",
                "",
                "AI相关软件：Midjourney, Stable Diffusion, Cursor, Nano Banana"
            ],
            design: [
                "建模渲染软件",
                "平面绘图软件", 
                "办公剪辑软件",
                "AI相关软件"
            ],
            languages: [
                "中文（母语）",
                "英语（雅思6.5）"
            ]
        },
        experience: [ // 工作/实习经历
            {
                company: "2025 Brunello Cuccinelli",
                position: "项目管理实习生",
                duration: "2025",
                description: "项目管理实习"
            },
            {
                company: "2024 大湾区AI技术创新应用澳门工作坊",
                position: "参与者",
                duration: "2024",
                description: "AI技术创新应用工作坊"
            },
            {
                company: "2023 广州竖梁社建筑设计有限公司",
                position: "方案设计实习生",
                duration: "2023",
                description: "方案设计实习"
            },
            {
                company: "2023 华南理工大学文创商店",
                position: "室内展陈设计",
                duration: "2023",
                description: "文创商店室内展陈设计"
            },
            {
                company: "2022 广州汉森建筑设计有限公司",
                position: "国际方案研发中心实习生",
                duration: "2022",
                description: "国际方案研发实习"
            }
        ]
    },

    // 作品集项目
    projects: [
        {
            id: "project1",
            title: "GROWING VINE——滨海片区更新设计",
            type: "城市设计 · 工业遗址更新",
            category: "建筑与室内设计",
            location: "新加坡",
            date: "2023",
            role: "主创设计",
            duration: "4个月",
            status: "概念设计完成",
            description: "本项目以恢复场地历史山脉的自然原貌为前提，在园区上空设计巨型连桥，重新连接了在工业时期炸掉的山体,并将底层全部归还自然,形成湿地公园。本设计提供一个向海岸线延伸的立体滨海空间范本,打造海城界面人与自然共生的景象。",
            concept: "本项目以恢复场地历史山脉的自然原貌为前提，在园区上空设计巨型连桥，重新连接了在工业时期炸掉的山体,并将底层全部归还自然,形成湿地公园。本设计提供一个向海岸线延伸的立体滨海空间范本,打造海城界面人与自然共生的景象。\n\nBased on the premise of restoring the natural appearance of the site's historical mountains, the scheme designed a giant bridge over the park, reconnecting the mountain that was blown up during the industrial period, and returning the bottom layer to nature to form a wetland park. This project provides a three-dimensional coastal space model extending to the coastline to create a scene of symbiosis between man and nature at the Haicheng interface.",
            software: "Rhino, Grasshopper, AutoCAD, Lumion",
            scale: "建筑面积 25,000㎡ | 用地面积 60,000㎡",
            highlights: "通过立体集约交通核将首层还给生态，以应对海平面上升等严峻问题，同时使人与环境和谐共生；水平面上可无限延伸的交通体系，在连接与激活工业遗址的基础上打造了顺应场地与历史的生态天际线。",
            challenges: "如何用可持续的手段解决多方面的问题，从而应对未来可能的生态危机",
            solutions: "还场地于自然，造联结以发展",
            coverImage: "简历作品集all_04.jpg",
            images: [
                "简历作品集all_04.jpg",
                "02.png",
                "03.png",
                "04.png"
            ],
            tags: ["城市设计", "滨海建筑设计", "工业遗址更新", "可持续设计"]
        },
        {
            id: "project2",
            title: "漫游园——可交互式建筑游戏设计",
            type: "动物园建筑设计 · 交互式体验",
            category: "建筑与室内设计",
            location: "南京",
            date: "2025",
            role: "独立设计",
            duration: "4个月",
            status: "方案设计完成",
            description: "本项目为南京市红山动物园尼罗河馆（河马为主）重建项目。通过对人与动物关系的重构，将人与动物的角色对调，将人的参观行为转变为到动物家做客。结合交互式游戏项目设计，使人在虚与实之间探索动物家园，实现自然的生境体验意趣。",
            concept: "本项目为南京市红山动物园尼罗河馆（河马为主）重建项目。通过对人与动物关系的重构，将人与动物的角色对调，将人的参观行为转变为到动物家做客。结合交互式游戏项目设计，使人在虚与实之间探索动物家园，实现自然的生境体验意趣。\n\nThis project involves the reconstruction of the Nile River Pavion at Nanjing Hongshan Zoo. The design re-examines and re-configures the observational relationship between humans and animals by breaking away from traditional window-style viewing methods.",
            software: "Unreal Engine, Rhino, Grasshopper, Auto CAD, Photoshop",
            scale: "建筑面积 4,400㎡ | 用地面积 8,630㎡",
            highlights: "以交互式手法呈现动物与人关系重构的动物园空间",
            challenges: "打破传统动物园模式，如何让动物园成为动物的家",
            solutions: "通过角色对调和交互式设计，创造沉浸式动物家园体验",
            coverImage: "no2/compress/00.jpg",
            images: [
                "no2/compress/00.jpg",
                "no2/compress/01.png",
                "no2/compress/02.png",
                "no2/compress/03.png",
                "no2/compress/04.png",
                "no2/compress/05.png",
                "no2/compress/06.png",
                "no2/compress/07.png",
                "no2/compress/08.png"
            ],
            tags: ["动物园设计", "游戏设计", "交互设计"]
        },
        {
            id: "project3",
            title: "绿方计划——遗址改造办公综合体设计",
            type: "办公建筑设计 · 可持续建筑",
            category: "建筑与室内设计",
            location: "广州",
            date: "2022",
            role: "主创设计",
            duration: "3个月",
            status: "方案设计完成",
            description: "方案以冷巷的原理构建空间，结合岭南地区市集商业形式，形成以创意市集为核心的小型艺术家工作室集合办公空间。将厂房遗址改造成垂直向的多层工作+市集的复合空间，打造可持续的绿色建筑空间。",
            concept: "方案以冷巷的原理构建空间，结合岭南地区市集商业形式，形成以创意市集为核心的小型艺术家工作室集合办公空间。将厂房遗址改造成垂直向的多层工作+市集的复合空间，打造可持续的绿色建筑空间。\n\nThe project extracts the cold alley spaceprototype for modern translation to improve the internal thermal comfort. Combined with thecommercial form of the market in Lingnan area, it forms a small artist studio collection office space with the creative market as the core.",
            software: "Rhino, AutoCAD, Enscape, Photoshop",
            scale: "建筑面积 9,012㎡ | 用地面积 2,610㎡",
            highlights: "高效利用原有的遗址承重结构模式，运用岭南地区传统节能空间设计手段，竖向组织建筑空间，同时办公与集市融合的复合空间很好地解决了当下空间的使用困境",
            challenges: "如何激活旧厂房工业遗址片区",
            solutions: "传统手法+创新功能+绿色建材=绿方计划",
            coverImage: "张羽简历作品集all_12.jpg",
            images: [
                "张羽简历作品集all_12.jpg",
                "绿方计划34.png",
                "绿方计划56.png",
                "绿方计划78.png"
            ],
            tags: ["被动式设计", "可持续设计", "绿色建筑", "自然通风"]
        },
        {
            id: "project4",
            title: "Bâtir avec la grammaire de la Terre——法国乡村校舍重建",
            type: "国际建筑竞赛 · 乡村建筑",
            category: "建筑与室内设计",
            location: "法国",
            date: "2025",
            role: "主创设计",
            duration: "6个月",
            status: "竞赛方案完成",
            description: "我们将建筑视作重新连接土地、记忆与人类的媒介。方案以法国当地夯土技艺为构筑方式及文化媒介，运用可持续设计技术，将两处分散的场地相联结，激活校舍活力、重塑场地凝聚力，打造文化、教育、旅游一体的复合型乡村精神锚点。",
            concept: "我们将建筑视作重新连接土地、记忆与人类的媒介。方案以法国当地夯土技艺为构筑方式及文化媒介，运用可持续设计技术，将两处分散的场地相联结，激活校舍活力、重塑场地凝聚力，打造文化、教育、旅游一体的复合型乡村精神锚点。气候适应性与教育交流的连贯地域叙事。\n\nWe envision architecture as an agent that reconnects land, memory and people. By weaving local earth-based techniques with contemporary sustainable technologies, our proposal revitalises two scattered sites into a coherent territorial narrative that celebrates community, climate resilience and educational exchange.",
            software: "Rhino, Auto CAD, Enscape, SG SAVEI",
            scale: "VILLEFONTAIN：建筑面积 2,400㎡ | 用地面积 4,200㎡ | CHIMILIN：建筑面积 1,400㎡ | 用地面积 500㎡",
            highlights: "运用当地传统夯土建筑技艺、菌丝夯土材质，联结两地功能与文化",
            challenges: "如何在传统乡村地区打造具备吸引力的场所",
            solutions: "立足本地技艺与文化，营造场所精神，打造产、教、研、游一体的活动中心与工作坊校舍",
            coverImage: "no4/未标题-1.jpg",
            images: [
                "no4/第三组_07.jpg",
                "no4/第三组_08.jpg",
                "no4/第三组_09.jpg",
                "no4/第三组_11.jpg",
                "no4/第三组_12.jpg",
                "no4/第三组_13.jpg",
                "no4/第三组_15.jpg",
                "no4/第三组_16.jpg",
                "no4/第三组_17.jpg",
                "no4/第三组_18.jpg",
                "no4/第三组_19.jpg",
                "no4/第三组_20.jpg",
                "no4/第三组_22.jpg",
                "no4/第三组_23.jpg",
                "no4/第三组_24.jpg",
                "no4/第三组_26.jpg",
                "no4/第三组_28.jpg",
                "no4/第三组_29.jpg",
                "no4/第三组_30.jpg"
            ],
            tags: ["建筑设计", "可持续设计", "乡村建筑", "校园建筑"]
        },
        {
            id: "project5",
            title: "SHEAF WEAVE——奢侈品牌快闪店设计",
            type: "零售空间 · 快闪店设计",
            category: "建筑与室内设计",
            location: "西安",
            date: "2025",
            role: "独立设计",
            duration: "3个月",
            status: "方案设计完成",
            description: "项目为奢侈服装品牌Brunello Cucinelli位于西安商场的POP-UP快闪店设计。方案以羊绒、麦穗、西安历史建筑元素、剪纸文化为灵感，通过可转动的镂空金属板立面，围合形成不同的空间，呈现低调、奢华、富有历史韵味的空间氛围。",
            concept: "项目为奢侈服装品牌Brunello Cucinelli位于西安商场的POP-UP快闪店设计。方案以羊绒、麦穗、西安历史建筑元素、剪纸文化为灵感，通过可转动的镂空金属板立面，围合形成不同的空间，呈现低调、奢华、富有历史韵味的空间氛围。\n\nThe project involves the design of a POP-UP store for the luxury fashion brand Brunello Cucinelli, located in Xi'an. The design draws inspiration from cashmere, wheat ears, elements of Xi'an's historical architecture, and paper-cutting art.",
            software: "Sketchup, Auto CAD, Photoshop",
            scale: "店铺面积 60㎡",
            highlights: "奢侈品调性的文化零售空间设计",
            challenges: "如何在有限空间内营造奢侈品牌氛围",
            solutions: "运用可转动镂空金属板立面创造灵活空间",
            coverImage: "popup/BC - Xi'an SKP Pop-Up Design Scheme_33(1).jpg",
            images: [
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_31.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_34.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_35.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_29.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_07.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_31.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_04.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_05.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_06.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_30.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_32.jpg",
                "popup/BC - Xi'an SKP Pop-Up Design Scheme_33.jpg"
            ],
            tags: ["店铺设计", "零售空间", "快闪店设计", "POP-UP设计"]
        },
        {
            id: "project6",
            title: "VALLEY CHAIR 猫窝椅——人宠共用家具设计",
            type: "家具设计 · 产品设计",
            category: "家具与产品设计",
            location: "上海",
            date: "2024",
            role: "主创设计",
            duration: "4个月",
            status: "产品设计完成",
            description: "本项目通过人宠共用的多功能座椅设计，倡导宠物伴老、人宠共居的理念。将老人与宠物猫的行为模式、尺度、需求进行结合。同时融合建筑\"拱\"\"台\"等原型要素，设计适老适宠的家具座椅。",
            concept: "本项目通过人宠共用的多功能座椅设计，倡导宠物伴老、人宠共居的理念。将老人与宠物猫的行为模式、尺度、需求进行结合。同时融合建筑\"拱\"\"台\"等原型要素，设计适老适宠的家具座椅。通过对单体的巧妙设计，座椅可进行自由拼接组合以满足不同场景需求，同时通过各种配置提高老年人视觉、触觉的认知能力，打造人宠共居的友好环境。\n\nThis work aims to promote the concept of 'pet companionship for the elderly, cohabitation of humans and pets' through the design of comfortable and aesthetically pleasing furniture shared by the elderly and pets.",
            software: "Rhino, Enscape, Auto CAD, Photoshop",
            scale: "坐高450mm，总高700mm，坐宽500mm，总长570mm",
            highlights: "人宠共用、适老适宠、多功能设计、自由拼接组合",
            challenges: "如何设计既适合老人又适合宠物的家具",
            solutions: "融合建筑原型要素，巧妙设计单体可拼接组合",
            coverImage: "no6/07(1).jpg",
            images: [
                "no6/zpj (21).jpg",
                "no6/zpj (22).jpg"
            ],
            tags: ["家具设计", "产品设计"]
        }
    ],

    // 设计理念
    designPhilosophy: {
        title: "设计理念",
        description: "我相信建筑不仅仅是功能的容器，更是情感和记忆的载体。通过深入理解场地文脉、文化内涵和用户需求，我致力于创造既具有美学价值又充满人文关怀的空间作品。",
        principles: [
            "可持续性优先 - 在设计中融入环保理念和绿色技术",
            "人文关怀 - 关注使用者的体验和情感需求",
            "创新表达 - 运用新技术和新材料探索设计可能性",
            "文化传承 - 尊重和延续当地文化特色",
            "空间叙事 - 通过空间设计讲述建筑故事"
        ]
    },

    // AI对话回复配置
    aiResponses: {
        '你好': '你好！很高兴认识你。我是一位AI助手，专门为这位建筑设计师工作。我可以回答你关于建筑设计、作品集或者设计师背景的任何问题。',
        '设计理念': '这位设计师的设计理念非常独特，他相信建筑不仅仅是功能的容器，更是情感和记忆的载体。他注重可持续性、人文关怀和空间体验，通过参数化设计、材料创新和空间叙事来创造作品。',
        '作品集': '作品集包含了6个精选项目，涵盖文化建筑、住宅设计、城市规划、快闪店设计、灯具设计和校园规划等多个领域。每个项目都体现了设计师的创新思维和专业技能。',
        '技能': '设计师精通多种建筑设计软件，包括Rhino、Grasshopper、AutoCAD、SketchUp、Lumion和Photoshop等。同时具备手绘、模型制作等传统技能。',
        '教育背景': '设计师毕业于XX大学建筑设计专业，在校期间表现优秀，曾获得XX建筑设计竞赛一等奖和优秀毕业生等荣誉。',
        '联系方式': '你可以通过邮箱、微信或电话联系设计师。建议直接发送邮件，这是最直接有效的联系方式。',
        'default': '这是一个很有趣的问题！这位设计师非常注重空间体验和人文关怀，他的作品总是能够平衡功能性和美学价值。如果你有具体的问题，我很乐意为你详细解答。'
    },

    // 社交媒体链接
    social: {
        linkedin: "#",
        behance: "#",
        instagram: "#",
        weibo: "#",
        xiaohongshu: "https://www.xiaohongshu.com/user/profile/5b754bb5f7e8b97d8557d8cb?xsec_token=YBsJIEVBrDrPciwawOD1HyfC_w8wN5_rODaUYAvONeRYc=&xsec_source=app_share&xhsshare=CopyLink&appuid=5b754bb5f7e8b97d8557d8cb&apptime=1756753984&share_id=23720e5f5a8c46a19d004e7a8ecd772d"
    },

    // 网站设置
    site: {
        title: "建筑设计作品集 | Portfolio",
        description: "个人建筑设计作品集网站，展示设计理念和项目作品",
        keywords: "建筑设计,作品集,建筑设计师,空间设计,城市规划,可持续设计",
        author: "Juli"
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
} else {
    window.SITE_CONFIG = SITE_CONFIG;
}

