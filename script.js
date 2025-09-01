// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化所有功能');
    
    // 初始化所有功能
    initPersonalInfo();
    initNavigation();
    initPortfolio();
    initAIChat();
    initCustomCursor();
    initSmoothScrolling();
    initAnimations();
    initHeroCarousel();
    initImageProtection();
    initDownloadResume();
    
    // 备用事件委托监听器
    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-cv') ||
            (e.target.tagName === 'A' && e.target.textContent.includes('下载'))) {
            console.log('通过事件委托捕获到下载按钮点击');
            handleDownloadClick(e);
        }
    });
});

// 初始化个人信息
function initPersonalInfo() {
    if (typeof SITE_CONFIG !== 'undefined') {
        const config = SITE_CONFIG;
        
        // 更新首页信息
        if (config.personal.name) {
            const heroName = document.getElementById('heroName');
            if (heroName) heroName.textContent = config.personal.name;
        }
        
        if (config.personal.title) {
            const heroTitle = document.getElementById('heroTitle');
            if (heroTitle) heroTitle.textContent = config.personal.title;
        }
        
        if (config.personal.subtitle) {
            const heroSubtitle = document.getElementById('heroSubtitle');
            if (heroSubtitle) heroSubtitle.textContent = config.personal.subtitle;
        }
        
        // 更新关于我部分
        if (config.personal.education) {
            const educationSchool = document.getElementById('educationSchool');
            const educationYear = document.getElementById('educationYear');
            if (educationSchool && config.personal.education.school) {
                educationSchool.innerHTML = '本科：' + config.personal.education.school + '（' + config.personal.education.graduationYear + '）<br>' + config.personal.education.major + '<br><br>研究生：同济大学（2024-2027）<br>建筑学';
            }
            if (educationYear && config.personal.education.graduationYear) {
                educationYear.style.display = 'none'; // 隐藏原来的年份显示，因为已经合并到上面了
            }
        }
        
        if (config.personal.skills) {
            const skillsSoftware = document.getElementById('skillsSoftware');
            const skillsDesign = document.getElementById('skillsDesign');
            if (skillsSoftware && config.personal.skills.software) {
                skillsSoftware.innerHTML = config.personal.skills.software.join('<br>');
            }
            if (skillsDesign) {
                skillsDesign.style.display = 'none'; // 隐藏重复的软件分类
            }
        }
        
        if (config.personal.awards) {
            const awardsList = document.getElementById('awardsList');
            const awardsMore = document.getElementById('awardsMore');
            if (awardsList && config.personal.awards.length > 0) {
                awardsList.innerHTML = config.personal.awards.join('<br>');
            }
            if (awardsMore) {
                awardsMore.style.display = 'none'; // 隐藏第二个p元素
            }
        }
        
        if (config.personal.experience && config.personal.experience[0]) {
            const experienceCompany = document.getElementById('experienceCompany');
            const experiencePosition = document.getElementById('experiencePosition');
            if (experienceCompany) {
                experienceCompany.innerHTML = config.personal.experience.map(exp => exp.company + ' - ' + exp.position).join('<br>');
            }
            if (experiencePosition) {
                experiencePosition.style.display = 'none'; // 隐藏单独的职位显示
            }
        }
        
        if (config.personal.skills && config.personal.skills.languages) {
            const languagesList = document.getElementById('languagesList');
            const languagesMore = document.getElementById('languagesMore');
            if (languagesList && config.personal.skills.languages[0]) {
                languagesList.textContent = config.personal.skills.languages[0];
            }
            if (languagesMore && config.personal.skills.languages.length > 1) {
                languagesMore.innerHTML = config.personal.skills.languages.slice(1).join('<br>');
            }
        }
        
        // 更新联系方式
        if (config.personal.email) {
            const contactEmail = document.getElementById('contactEmail');
            if (contactEmail) {
                contactEmail.textContent = config.personal.email;
                contactEmail.href = 'mailto:' + config.personal.email;
            }
        }
        
        if (config.personal.wechat) {
            const contactWechat = document.getElementById('contactWechat');
            if (contactWechat) {
                contactWechat.textContent = '微信号：' + config.personal.wechat;
            }
        }
        
        if (config.personal.phone) {
            const contactPhone = document.getElementById('contactPhone');
            if (contactPhone) {
                contactPhone.textContent = config.personal.phone;
            }
        }
        
        if (config.personal.location) {
            const contactLocation = document.getElementById('contactLocation');
            if (contactLocation) {
                contactLocation.textContent = config.personal.location;
            }
        }
        
        if (config.personal.xiaohongshu) {
            const contactXiaohongshu = document.getElementById('contactXiaohongshu');
            if (contactXiaohongshu) {
                contactXiaohongshu.href = config.personal.xiaohongshu;
            }
        }
    }
}

// 复制到剪贴板功能
function copyToClipboard(type) {
    let textToCopy = '';
    let element = null;
    
    if (type === 'email') {
        element = document.getElementById('contactEmail');
        textToCopy = element ? element.textContent : '';
    } else if (type === 'wechat') {
        element = document.getElementById('contactWechat');
        textToCopy = element ? element.textContent.replace('微信号：', '') : '';
    }
    
    if (textToCopy) {
        // 使用现代剪贴板API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopySuccess(element, type);
            }).catch(() => {
                // 如果现代API失败，使用传统方法
                fallbackCopyTextToClipboard(textToCopy, element, type);
            });
        } else {
            // 使用传统方法
            fallbackCopyTextToClipboard(textToCopy, element, type);
        }
    }
}

// 传统复制方法（兼容性更好）
function fallbackCopyTextToClipboard(text, element, type) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(element, type);
        } else {
            showCopyError(element, type);
        }
    } catch (err) {
        showCopyError(element, type);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopySuccess(element, type) {
    showTemporaryMessage(element.parentElement, '已复制！', '#4CAF50');
}

// 显示复制失败提示
function showCopyError(element, type) {
    showTemporaryMessage(element.parentElement, '复制失败', '#f44336');
}

// 显示临时提示消息
function showTemporaryMessage(container, message, color) {
    // 创建临时提示元素
    const hint = document.createElement('span');
    hint.textContent = message;
    hint.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: ${color};
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
    `;
    
    // 添加到容器
    container.style.position = 'relative';
    container.appendChild(hint);
    
    // 2秒后移除
    setTimeout(() => {
        if (hint.parentElement) {
            hint.parentElement.removeChild(hint);
        }
    }, 2000);
}

// 导航功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 汉堡菜单切换
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 导航链接点击
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 使用更快的滚动方式
                const targetPosition = targetSection.offsetTop - 80; // 减去导航栏高度
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto' // 使用即时滚动而不是平滑滚动
                });
            }

            // 移动端关闭菜单
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // 当前页面导航高亮
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// 作品集功能
function initPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const modalContent = document.querySelector('.modal-content');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // 分类筛选功能
    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // 分类按钮事件监听
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active状态
            btn.classList.add('active');
            
            // 获取分类并筛选
            const category = btn.getAttribute('data-category');
            filterPortfolio(category);
        });
    });

    // 从配置文件获取项目数据
    const projects = {};
    
    // 将配置文件中的项目数据转换为JavaScript对象
    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.projects) {
        SITE_CONFIG.projects.forEach((project, index) => {
            const projectId = `project${index + 1}`;
            projects[projectId] = {
                ...project
                // 保持原有的category设置
            };
        });

        // 交换第一个与第二个项目
        if (projects.project1 && projects.project2) {
            const tempProject = projects.project1;
            projects.project1 = projects.project2;
            projects.project2 = tempProject;
        }

        // 交换第二个与第四个项目
        if (projects.project2 && projects.project4) {
            const tempProject2 = projects.project2;
            projects.project2 = projects.project4;
            projects.project4 = tempProject2;
        }

        // 交换第三个与第四个项目
        if (projects.project3 && projects.project4) {
            const tempProject3 = projects.project3;
            projects.project3 = projects.project4;
            projects.project4 = tempProject3;
        }
    }
    
    // 添加其他项目（非配置文件中的项目）
    const additionalProjects = {
        project7: {
            title: '光厦——氛围灯设计',
            type: '灯具设计 · 产品设计',
            category: '家具与产品设计',
            location: '上海',
            date: '2024',
            role: '独立设计',
            description: '本设计使用透明波纹亚克力将建筑立面的韵律以灯具的形式呈现出来，将建筑感的光影效果糅合到氛围灯之中。可调节的暖光，洒满屋子里每一个温馨的角落。',
            concept: '本设计使用透明波纹亚克力将建筑立面的韵律以灯具的形式呈现出来，将建筑感的光影效果糅合到氛围灯之中。可调节的暖光，洒满屋子里每一个温馨的角落。\n\nThis design utilizes transparent corrugated acrylic to reinterpret the rhythmic patterns of architectural facades in the form of lighting fixtures, seamlessly integrating architectural light and shadow effects into ambient lighting.',
            software: 'Sketchup, Enscape, Auto CAD, Photoshop',
            scale: '84x84x275H',
            highlights: '建筑立面韵律、光影效果、可调节暖光、温馨氛围',
            challenges: '如何将建筑感的光影效果融入灯具设计',
            solutions: '使用透明波纹亚克力材料重现建筑立面韵律',
            images: [
                'no7/7.JPG',
                'no7/14.JPG',
                'no7/20.JPG',
                'no7/zpj (23).jpg',
                'no7/zpj (24).jpg'
            ],
            tags: ['灯具设计', '产品设计', '文创设计'],
            coverImage: 'no7/9.jpg'
        },
        project8: {
            title: 'GAMESEAT猫游戏椅——宠物家具系列设计',
            type: '家具设计 · 产品设计',
            category: '家具与产品设计',
            location: '上海',
            date: '2024',
            role: '独立设计',
            description: '本系列设计以简约现代的设计语言、丰富有趣的颜色、实用坚固的材质，打造人宠共用的创意家居。',
            concept: '本系列设计以简约现代的设计语言、丰富有趣的颜色、实用坚固的材质，打造人宠共用的创意家居。\n\nThis collection employs a simple yet modern design language, vibrant and playful colors, and practical, durable materials to create innovative home products designed for co-use by pets and their owners.',
            software: 'Rhino, Enscape, Auto CAD, Photoshop',
            scale: '420x420x450H, 400x500x150H',
            highlights: '简约现代、丰富颜色、实用坚固、人宠共用',
            challenges: '如何设计既适合宠物又适合主人的家具',
            solutions: '运用简约现代设计语言和实用坚固材质',
            images: [
                'no8/海报正面.jpg',
                'no8/6c7b67a91f0461efdf762d248d1b1e8.png',
                'no8/00573d909518c67e9982ffbccb81d6d.png',
                'no8/4132.png',
                'no8/4327.png',
                'no8/猫猫大片系列水印七夕.jpg',
                'no8/中秋贺图.jpg',
                'no8/国庆.jpg',
                'no8/圣诞2mini.jpg'
            ],
            tags: ['家具设计', '产品设计', '宠物用品'],
            coverImage: 'no8/海报正面(1).jpg'
        },
        
        // 艺术与平面设计项目
        project9: {
            title: '其他创意设计',
            type: '文创设计 · 海报设计',
            category: '艺术与平面设计',
            location: '广州，上海',
            date: '2021-2025',
            role: '独立设计',
            software: 'Sketchup, Enscape, Auto CAD, Photoshop',
            images: [
                'no9/微信图片_20250831160004_41_4(1).jpg',
                'no9/微信图片_20250901234155_65_4(1).jpg',
                'no9/zpj (26).jpg',
                'no9/zpj (27).jpg',
                'no9/zpj (28).jpg'
            ],
            tags: ['文创设计', '海报设计', '表情包设计', '绘画作品'],
            coverImage: 'no7/9.jpg'
        },
        
        project10: {
            title: 'GAMESEAT猫游戏椅——宠物家具系列设计',
            type: '家具设计 · 产品设计',
            location: '上海',
            date: '2024',
            role: '独立设计',
            description: '本系列设计以简约现代的设计语言、丰富有趣的颜色、实用坚固的材质，打造人宠共用的创意家居。',
            concept: '本系列设计以简约现代的设计语言、丰富有趣的颜色、实用坚固的材质，打造人宠共用的创意家居。\n\nThis collection employs a simple yet modern design language, vibrant and playful colors, and practical, durable materials to create innovative home products designed for co-use by pets and their owners.',
            software: 'Rhino, Enscape, Auto CAD, Photoshop',
            scale: '420x420x450H, 400x500x150H',
            highlights: '简约现代、丰富颜色、实用坚固、人宠共用',
            challenges: '如何设计既适合宠物又适合主人的家具',
            solutions: '运用简约现代设计语言和实用坚固材质',
            category: 'furniture',
            externalLink: 'https://www.figma.com/community/file/1544420776833374207',
            images: [
                'no8/海报正面.jpg',
                'no8/4132.png',
                'no8/4327.png',
                'no8/00573d909518c67e9982ffbccb81d6d.png',
                'no8/be89a32d8c0dad6f55fad98d65fd3c6.png',
                'no8/6c7b67a91f0461efdf762d248d1b1e8.png',
                'no8/08.jpg',
                'no8/猫猫大片系列水印七夕.jpg',
                'no8/中秋贺图.jpg',
                'no8/国庆.jpg',
                'no8/圣诞2mini.jpg'
            ],
            tags: ['家具设计', '产品设计', '宠物用品'],
            coverImage: 'no8/海报正面(1).jpg'
        },
        
        project11: {
            title: 'AI词库学习簿',
            type: 'AI探索 · 词库管理系统',
            location: '在线',
            date: '2024',
            role: '开发者',
            description: 'AI词库学习簿是一个智能化的词汇管理系统，帮助用户学习和记忆AI相关术语，支持状态标记和进度跟踪。',
            software: 'HTML, CSS, JavaScript, Local Storage',
            externalLink: 'learning note/index.html',
            coverImage: '生成学习 AI 思维导图 (2).png',
            category: 'ai-exploration',
            images: [
                '生成学习 AI 思维导图 (2).png',
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
            ]
        },
        

        
        project13: {
            title: '其他创意设计',
            type: '创意设计 · 多元化探索',
            location: '创意工作室',
            date: '2024',
            role: '创意设计师',
            description: '其他创意设计项目，涵盖多种创意表达形式，探索设计的无限可能性，展现多元化的创意思维和设计能力。',
            software: 'Photoshop, Illustrator, InDesign, Creative Tools',
            images: [
                'no9/微信图片_20250831160004_41_4(1).jpg',
                'no9/zpj (25).jpg',
                'no9/zpj (26).jpg',
                'no9/zpj (27).jpg',
                'no9/zpj (28).jpg'
            ]
        },
        
        project14: {
            title: 'AI学习笔记',
            type: 'AI探索 · 学习记录系统',
            location: '在线',
            date: '2024',
            role: '开发者',
            description: 'AI学习笔记系统，提供结构化的学习记录功能，帮助用户整理和回顾AI学习过程中的重要知识点。',
            software: 'HTML, CSS, JavaScript, File System',
            coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
            category: 'ai-exploration',
            images: [
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'
            ]
        }
    };
    
    // 将额外项目合并到主项目对象中
    Object.assign(projects, additionalProjects);

    // 点击作品集项目
    portfolioItems.forEach(item => {
        // 移除可能存在的旧事件监听器
        item.removeEventListener('click', handleProjectClick);
        // 添加新的事件监听器
        item.addEventListener('click', handleProjectClick);
    });
    
    // 项目点击处理函数
    function handleProjectClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
        
        console.log('项目被点击:', projectId, project);
            
            if (project) {
                openProjectModal(project);
        } else {
            console.error('找不到项目:', projectId);
            }
    }

    // 关闭模态框
    closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // ESC键关闭模态框和侧边栏
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('projectInfoSidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                // 如果侧边栏打开，先关闭侧边栏
                sidebar.classList.remove('active');
                const gallery = document.querySelector('.project-gallery-fullscreen');
                if (gallery) {
                    gallery.classList.remove('compressed');
                }
                console.log('ESC键关闭侧边栏');
            } else {
                // 否则关闭模态框
            closeProjectModal();
                console.log('ESC键关闭模态框');
            }
        }
    });

    function openProjectModal(project) {
        console.log('打开项目模态框:', project.title);
        
        // 检查是否有外部链接
        if (project.externalLink) {
            // 如果有外部链接，直接跳转
            window.open(project.externalLink, '_blank');
            return;
        }
        
        // 确保模态框完全关闭后再打开
        modal.style.display = 'none';
        setTimeout(() => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 确保侧边栏处于关闭状态
            const sidebar = document.getElementById('projectInfoSidebar');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            
            // 确保图片轮播处于正常状态
            const gallery = document.querySelector('.project-gallery-fullscreen');
            if (gallery) {
                gallery.classList.remove('compressed');
            }
        }, 50);
        
        // 首先重置所有标题的显示状态
        const conceptTitle = document.querySelector('.project-description h3');
        if (conceptTitle) {
            conceptTitle.style.display = 'block';
        }
        
        const allSections = document.querySelectorAll('.detail-section');
        allSections.forEach(section => {
            section.style.display = 'block';
        });
        
        // 填充项目信息
        const titleElement = document.getElementById('projectTitle');
        if (project.title.includes('——')) {
            const [mainTitle, subtitle] = project.title.split('——');
            titleElement.innerHTML = `${mainTitle}<br><span class="subtitle">——${subtitle}</span>`;
        } else {
            titleElement.textContent = project.title;
        }
        document.getElementById('projectType').textContent = project.type;
        document.getElementById('projectLocation').textContent = project.location;
        document.getElementById('projectDate').textContent = project.date;
        document.getElementById('projectRole').textContent = project.role;
        // 处理设计理念的中英文显示
        const conceptElement = document.getElementById('projectConcept');
        if (project.concept && project.concept.includes('\n\n')) {
            const [chineseText, englishText] = project.concept.split('\n\n');
            conceptElement.innerHTML = `<span class="chinese-text">${chineseText}</span><br><br><span class="english-text">${englishText}</span>`;
        } else {
            conceptElement.textContent = project.concept || project.description;
        }
        document.getElementById('projectSoftware').textContent = project.software;
        
        // 填充新增字段
        if (project.scale) {
            document.getElementById('projectScale').textContent = project.scale;
        }
        if (project.highlights) {
            document.getElementById('projectHighlights').textContent = project.highlights;
        }
        if (project.challenges) {
            document.getElementById('projectChallenges').textContent = project.challenges;
        }
        if (project.solutions) {
            document.getElementById('projectSolutions').textContent = project.solutions;
        }
        
        // 针对第九个项目隐藏特定标题
        console.log('项目标题:', project.title, '项目类型:', project.type);
        if (project.title === '其他创意设计') {
            console.log('隐藏第九个项目的标题');
            // 隐藏设计理念标题
            const conceptTitle = document.querySelector('.project-description h3');
            if (conceptTitle) {
                conceptTitle.style.display = 'none';
            }
            
            // 隐藏技术参数标题
            const softwareSection = document.querySelector('.detail-section:nth-child(1)');
            if (softwareSection) {
                softwareSection.style.display = 'none';
            }
            
            // 隐藏项目规模标题
            const scaleSection = document.querySelector('.detail-section:nth-child(2)');
            if (scaleSection) {
                scaleSection.style.display = 'none';
            }
            
            // 隐藏设计亮点标题
            const highlightsSection = document.querySelector('.detail-section:nth-child(3)');
            if (highlightsSection) {
                highlightsSection.style.display = 'none';
            }
            
            // 隐藏设计挑战标题
            const challengesSection = document.querySelector('.detail-section:nth-child(4)');
            if (challengesSection) {
                challengesSection.style.display = 'none';
            }
            
            // 隐藏解决方案标题
            const solutionsSection = document.querySelector('.detail-section:nth-child(5)');
            if (solutionsSection) {
                solutionsSection.style.display = 'none';
            }
        } else {
            // 其他项目显示所有标题
            const conceptTitle = document.querySelector('.project-description h3');
            if (conceptTitle) {
                conceptTitle.style.display = 'block';
            }
            
            const allSections = document.querySelectorAll('.detail-section');
            allSections.forEach(section => {
                section.style.display = 'block';
            });
        }
        if (project.tags && project.tags.length > 0) {
            const tagsContainer = document.getElementById('projectTags');
            tagsContainer.innerHTML = '';
            project.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }

        // 设置主图片
        const mainImage = document.getElementById('mainImage');
        mainImage.src = project.images[0];
        mainImage.alt = project.title;

        // 生成缩略图
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        thumbnailsContainer.innerHTML = '';
        
        project.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `${project.title} - 图片${index + 1}`;
            thumbnail.addEventListener('click', () => {
                mainImage.src = image;
                // 高亮选中的缩略图
                thumbnailsContainer.querySelectorAll('img').forEach(img => img.classList.remove('active'));
                thumbnail.classList.add('active');
            });
            thumbnailsContainer.appendChild(thumbnail);
        });

        // 设置第一个缩略图为激活状态
        if (thumbnailsContainer.firstChild) {
            thumbnailsContainer.firstChild.classList.add('active');
        }

        // 初始化轮播导航功能
        initGalleryNavigation(project.images);

        // 显示模态框
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 初始化侧边栏功能
        initProjectSidebar();
    }

    function closeProjectModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // 关闭侧边栏
        const sidebar = document.getElementById('projectInfoSidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        
        // 移除图片压缩效果
        const gallery = document.querySelector('.project-gallery-fullscreen');
        if (gallery) {
            gallery.classList.remove('compressed');
        }
        
        // 清理模态框内容，防止状态残留
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            // 重置图片轮播
            const mainImage = document.getElementById('mainImage');
            const thumbnailsContainer = document.getElementById('galleryThumbnails');
            if (mainImage) {
                mainImage.src = '';
            }
            if (thumbnailsContainer) {
                thumbnailsContainer.innerHTML = '';
            }
            
            // 重置项目信息
            const projectTitle = document.getElementById('projectTitle');
            const projectSubtitle = document.getElementById('projectSubtitle');
            if (projectTitle) projectTitle.textContent = '';
            if (projectSubtitle) projectSubtitle.textContent = '';
        }
        
        // 重置项目信息侧边栏的所有内容
        const projectInfoElements = [
            'projectType', 'projectLocation', 'projectDate', 'projectRole',
            'projectDuration', 'projectStatus', 'projectDescription',
            'projectConcept', 'projectSoftware', 'projectScale',
            'projectHighlights', 'projectChallenges', 'projectSolutions',
            'projectTags'
        ];
        
        projectInfoElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
                element.innerHTML = '';
            }
        });
        
        // 重置所有详情部分的显示状态
        const allSections = document.querySelectorAll('.detail-section');
        allSections.forEach(section => {
            section.style.display = 'block';
        });
        
        // 重置设计理念标题
        const conceptTitle = document.querySelector('.project-description h3');
        if (conceptTitle) {
            conceptTitle.style.display = 'block';
        }
        
        console.log('模态框已关闭并重置');
    }
    
    // 初始化轮播导航功能
    function initGalleryNavigation(images) {
        const prevBtn = document.getElementById('galleryPrevBtn');
        const nextBtn = document.getElementById('galleryNextBtn');
        const mainImage = document.getElementById('mainImage');
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        
        let currentIndex = 0;
        
        // 更新当前图片和缩略图状态
        function updateImage(index) {
            if (index >= 0 && index < images.length) {
                currentIndex = index;
                mainImage.src = images[index];
                
                // 更新缩略图激活状态
                const thumbnails = thumbnailsContainer.querySelectorAll('img');
                thumbnails.forEach((thumb, i) => {
                    if (i === index) {
                        thumb.classList.add('active');
                    } else {
                        thumb.classList.remove('active');
                    }
                });
            }
        }
        
        // 上一张图片
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                updateImage(newIndex);
            });
        }
        
        // 下一张图片
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                updateImage(newIndex);
            });
        }
        
        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                    updateImage(newIndex);
                } else if (e.key === 'ArrowRight') {
                    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                    updateImage(newIndex);
                }
            }
        });
    }
    
    // 初始化项目侧边栏功能
    function initProjectSidebar() {
        const infoToggleBtn = document.getElementById('infoToggleBtn');
        const sidebar = document.getElementById('projectInfoSidebar');
        const sidebarClose = document.getElementById('sidebarClose');
        const gallery = document.querySelector('.project-gallery-fullscreen');
        
        if (infoToggleBtn && sidebar && sidebarClose && gallery) {
            // 移除可能存在的旧事件监听器
            infoToggleBtn.removeEventListener('click', handleInfoToggle);
            sidebarClose.removeEventListener('click', handleSidebarClose);
            sidebar.removeEventListener('click', handleSidebarClick);
            
            // 添加新的事件监听器
            infoToggleBtn.addEventListener('click', handleInfoToggle);
            sidebarClose.addEventListener('click', handleSidebarClose);
            sidebar.addEventListener('click', handleSidebarClick);
            
            console.log('侧边栏事件监听器已重新绑定');
        }
    }
    
    // 侧边栏事件处理函数
    function handleInfoToggle() {
        const sidebar = document.getElementById('projectInfoSidebar');
        const gallery = document.querySelector('.project-gallery-fullscreen');
        
        console.log('信息按钮被点击，当前状态:', sidebar.classList.contains('active'));
        
                if (sidebar.classList.contains('active')) {
                    // 如果侧边栏已打开，则关闭
                    sidebar.classList.remove('active');
                    gallery.classList.remove('compressed');
                } else {
                    // 如果侧边栏未打开，则打开
                    sidebar.classList.add('active');
                    gallery.classList.add('compressed');
                }
    }
    
    function handleSidebarClose() {
        const sidebar = document.getElementById('projectInfoSidebar');
        const gallery = document.querySelector('.project-gallery-fullscreen');
        
        console.log('侧边栏关闭按钮被点击');
                    sidebar.classList.remove('active');
                    gallery.classList.remove('compressed');
                }
    
    function handleSidebarClick(e) {
        const sidebar = document.getElementById('projectInfoSidebar');
        const gallery = document.querySelector('.project-gallery-fullscreen');
        
        if (e.target === sidebar) {
            console.log('点击侧边栏外部，关闭侧边栏');
                    sidebar.classList.remove('active');
                    gallery.classList.remove('compressed');
        }
    }
}

// AI对话功能
function initAIChat() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const chatSidebar = document.getElementById('chatSidebar');
    const chatOverlay = document.getElementById('chatOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const historyToggle = document.getElementById('historyToggle');
    const historyList = document.getElementById('historyList');
    const searchInput = document.getElementById('searchInput');
    const clearHistory = document.getElementById('clearHistory');
    const newChat = document.getElementById('newChat');
    
    let chatHistory = [];
    let currentConversation = [];
    let conversations = [];
    let latestConversation = []; // 保存最新的对话状态
    let isLoadingHistory = false; // 防止重复加载
    let currentHistoryPage = 0; // 当前历史记录页码
    const HISTORY_PAGE_SIZE = 10; // 每页加载的历史记录数量
    
    // 从localStorage加载历史记录
    function loadHistory() {
        const saved = localStorage.getItem('aiChatHistory');
        if (saved) {
            conversations = JSON.parse(saved);
            renderHistoryList();
        }
    }
    
    // 保存历史记录到localStorage
    function saveHistory() {
        localStorage.setItem('aiChatHistory', JSON.stringify(conversations));
    }
    
    // 渲染历史记录列表
    function renderHistoryList() {
        historyList.innerHTML = '';
        
        conversations.forEach((conversation, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.dataset.index = index;
            
            const title = document.createElement('div');
            title.className = 'history-item-title';
            title.textContent = conversation.title || '对话 ' + (index + 1);
            
            const preview = document.createElement('div');
            preview.className = 'history-item-preview';
            preview.textContent = conversation.messages[0]?.content || '无内容';
            
            const time = document.createElement('div');
            time.className = 'history-item-time';
            time.textContent = formatTime(conversation.timestamp);
            
            historyItem.appendChild(title);
            historyItem.appendChild(preview);
            historyItem.appendChild(time);
            
            historyItem.addEventListener('click', () => loadConversation(index));
            historyList.appendChild(historyItem);
        });
    }
    
    // 格式化时间
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        return date.toLocaleDateString();
    }
    
    // 加载对话
    function loadConversation(index) {
        const conversation = conversations[index];
        if (conversation) {
            currentConversation = [...conversation.messages];
            currentHistoryPage = 0; // 重置历史记录分页
            chatMessages.innerHTML = '';
            
            conversation.messages.forEach(message => {
                addMessage(message.content, message.type === 'ai', false);
            });
            
            // 更新历史记录项的激活状态
            document.querySelectorAll('.history-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`[data-index="${index}"]`).classList.add('active');
            
            // 显示回到当前对话按钮
            showBackToCurrentButton();
        }
    }
    
    // 开始新对话
    function startNewChat() {
        currentConversation = [];
        latestConversation = []; // 重置最新对话状态
        currentHistoryPage = 0; // 重置历史记录分页
        chatMessages.innerHTML = '';
        
        // 添加欢迎消息
        addMessage("你好！我是Juli的AI设计师助手，熟悉她个人网站的所有内容。我可以为你详细介绍：<br><br>• 设计师背景和教育经历<br>• 技能专长和软件能力<br>• 获奖情况和实践经历<br>• 设计理念和作品集项目<br>• 网站功能和使用方法<br>• 联系方式和合作信息<br><br>你可以问我关于Juli的任何问题，包括她的作品、设计理念、网站功能等！<br><br>💡 试试问我：<br>• \"介绍一下漫游园项目\"<br>• \"光厦氛围灯的设计理念是什么\"<br>• \"如何查看项目详情\"<br>• \"Juli的设计风格特点\"", true, false);
        
        // 清除历史记录项的激活状态
        document.querySelectorAll('.history-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 隐藏回到当前对话按钮
        hideBackToCurrentButton();
    }
    
    // 显示回到当前对话按钮
    function showBackToCurrentButton() {
        const backBtn = document.getElementById('backToCurrentBtn');
        if (backBtn) {
            backBtn.style.display = 'flex';
        }
    }
    
    // 隐藏回到当前对话按钮
    function hideBackToCurrentButton() {
        const backBtn = document.getElementById('backToCurrentBtn');
        if (backBtn) {
            backBtn.style.display = 'none';
        }
    }
    
    // 回到当前对话
    function backToCurrentConversation() {
        // 清空当前显示的历史对话
        chatMessages.innerHTML = '';
        
        // 恢复最新对话
        if (latestConversation.length > 0) {
            latestConversation.forEach(message => {
                addMessage(message.content, message.type === 'ai', false);
            });
            // 更新currentConversation为最新状态
            currentConversation = [...latestConversation];
        } else {
            // 如果没有最新对话，重新开始新对话
            startNewChat();
        }
        
        // 清除历史记录项的激活状态
        document.querySelectorAll('.history-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 隐藏按钮
        hideBackToCurrentButton();
    }
    
    // 搜索历史记录
    function searchHistory(query) {
        const filtered = conversations.filter(conversation => 
            conversation.messages.some(message => 
                message.content.toLowerCase().includes(query.toLowerCase())
            )
        );
        
        renderFilteredHistory(filtered);
    }
    
    // 渲染过滤后的历史记录
    function renderFilteredHistory(filteredConversations) {
        historyList.innerHTML = '';
        
        filteredConversations.forEach((conversation, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.dataset.index = conversations.indexOf(conversation);
            
            const title = document.createElement('div');
            title.className = 'history-item-title';
            title.textContent = conversation.title || '对话 ' + (conversations.indexOf(conversation) + 1);
            
            const preview = document.createElement('div');
            preview.className = 'history-item-preview';
            preview.textContent = conversation.messages[0]?.content || '无内容';
            
            const time = document.createElement('div');
            time.className = 'history-item-time';
            time.textContent = formatTime(conversation.timestamp);
            
            historyItem.appendChild(title);
            historyItem.appendChild(preview);
            historyItem.appendChild(time);
            
            historyItem.addEventListener('click', () => loadConversation(conversations.indexOf(conversation)));
            historyList.appendChild(historyItem);
        });
    }
    
    // 高亮显示最新的对话
    function highlightLatestConversation() {
        // 移除所有高亮
        document.querySelectorAll('.history-item').forEach(item => {
            item.classList.remove('active', 'latest');
        });
        
        // 高亮最新的对话
        const latestItem = document.querySelector('.history-item[data-index="0"]');
        if (latestItem) {
            latestItem.classList.add('latest');
            // 滚动到最新对话
            latestItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // 实时更新当前对话的预览
    function updateCurrentConversationPreview() {
        if (currentConversation.length > 0) {
            // 查找当前对话在历史记录中的位置
            const currentIndex = conversations.findIndex(conv => 
                conv.messages.length === currentConversation.length &&
                conv.messages.every((msg, i) => 
                    msg.content === currentConversation[i].content &&
                    msg.type === currentConversation[i].type
                )
            );
            
            if (currentIndex !== -1) {
                // 更新现有对话的预览
                const historyItem = document.querySelector(`[data-index="${currentIndex}"]`);
                if (historyItem) {
                    const preview = historyItem.querySelector('.history-item-preview');
                    if (preview) {
                        preview.textContent = currentConversation[currentConversation.length - 1].content;
                    }
                }
            } else {
                // 创建新的当前对话预览
                createCurrentConversationPreview();
            }
        }
    }
    
    // 创建当前对话的预览
    function createCurrentConversationPreview() {
        // 移除现有的当前对话预览
        const existingPreview = document.querySelector('.history-item.current-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        if (currentConversation.length > 0) {
            const previewItem = document.createElement('div');
            previewItem.className = 'history-item current-preview';
            
            const title = document.createElement('div');
            title.className = 'history-item-title';
            title.textContent = '当前对话 (进行中)';
            
            const preview = document.createElement('div');
            preview.className = 'history-item-preview';
            preview.textContent = currentConversation[currentConversation.length - 1].content;
            
            const time = document.createElement('div');
            time.className = 'history-item-time';
            time.textContent = '刚刚';
            
            previewItem.appendChild(title);
            previewItem.appendChild(preview);
            previewItem.appendChild(time);
            
            // 将当前对话预览插入到列表顶部
            historyList.insertBefore(previewItem, historyList.firstChild);
        }
    }
    
    // 实时更新历史记录列表
    function updateHistoryListInRealTime() {
        // 更新当前对话预览
        updateCurrentConversationPreview();
        
        // 如果有新的对话完成，更新历史记录
        if (currentConversation.length > 0 && conversations.length > 0) {
            const latestConversation = conversations[0];
            if (latestConversation && latestConversation.messages.length !== currentConversation.length) {
                // 更新最新对话的预览
                const latestItem = document.querySelector('.history-item[data-index="0"]');
                if (latestItem) {
                    const preview = latestItem.querySelector('.history-item-preview');
                    if (preview) {
                        preview.textContent = currentConversation[currentConversation.length - 1].content;
                    }
                }
            }
        }
    }
    
    function addMessage(content, isAI = false, saveToHistory = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isAI ? 'ai-message' : 'user-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = isAI ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // 根据内容长度添加相应的CSS类
        const contentLength = content.length;
        const lineCount = content.split('\n').length;
        
        if (contentLength <= 10) {
            messageContent.classList.add('ultra-short', 'single-line');
        } else if (contentLength <= 50) {
            messageContent.classList.add('short', 'single-line');
        } else if (contentLength <= 200) {
            messageContent.classList.add('medium');
            if (lineCount > 1) {
                messageContent.classList.add('multi-line');
            } else {
                messageContent.classList.add('single-line');
            }
        } else if (contentLength <= 500) {
            messageContent.classList.add('long', 'multi-line');
        } else {
            messageContent.classList.add('very-long', 'multi-line');
        }
        
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 保存到当前对话
        if (saveToHistory) {
            currentConversation.push({
                type: isAI ? 'ai' : 'user',
                content: content,
                timestamp: new Date()
            });
            
            // 如果是用户发送消息，隐藏回到当前对话按钮
            if (!isAI) {
                hideBackToCurrentButton();
            }
            
            // 实时更新当前对话的预览（如果侧边栏是打开的）
            if (chatSidebar.classList.contains('show')) {
                updateCurrentConversationPreview();
            }
            
            // 如果侧边栏是打开的，实时更新历史记录列表
            if (chatSidebar.classList.contains('show') && currentConversation.length > 1) {
                // 延迟一点时间更新，确保消息完全显示
                setTimeout(() => {
                    updateHistoryListInRealTime();
                }, 100);
            }
        }
        
        // 返回消息元素，以便后续操作
        return messageDiv;
    }
    
    // DeepSeek API配置
    const DEEPSEEK_CONFIG = {
        apiKey: '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',
        model: 'deepseek/deepseek-chat-v3-0324:free',
        baseUrl: 'https://api.deepseek.com'
    };
    
    // 测试API连接
    async function testAPIConnection() {
        console.log('测试DeepSeek API连接...');
        try {
            const response = await fetch(`${DEEPSEEK_CONFIG.baseUrl}/v1/models`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('API连接成功，可用模型:', data);
                return true;
            } else {
                console.error('API连接失败:', response.status);
                return false;
            }
        } catch (error) {
            console.error('API连接测试失败:', error);
            return false;
        }
    }

    // 调用DeepSeek API
    async function callDeepSeekAPI(userMessage) {
        console.log('开始调用DeepSeek API...');
        console.log('API配置:', DEEPSEEK_CONFIG);
        
        try {
            console.log('发送请求到:', `${DEEPSEEK_CONFIG.baseUrl}/v1/chat/completions`);
            
            const response = await fetch(`${DEEPSEEK_CONFIG.baseUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
                },
                body: JSON.stringify({
                    model: DEEPSEEK_CONFIG.model,
                    messages: [
                        {
                            role: 'system',
                            content: `你是Juli的AI设计师助手，熟悉Juli个人网站的所有内容。Juli是一名建筑/家具设计师，专注于可持续设计、空间叙事与多维创意设计。

Juli的完整背景信息：
- 本科：华南理工大学（2018-2024），工业设计&建筑学，绿色建筑专门化方向，所有专业设计课程均为年级优秀
- 研究生：同济大学（2024-2027），建筑学
- 技能专长：
  * 建模渲染软件：Rhino, SketchUp, Unreal Engine, Enscape, Lumion, D5
  * 平面绘图软件：Photoshop, Auto CAD, Adobe Illustrator
  * 办公剪辑软件：Figma, Microsoft Office Suite (Excel, PowerPoint, Word), Adobe Audition, 剪映, Miro
  * AI相关软件：Midjourney, Stable Diffusion, Cursor, Nano Banana
- 获奖情况（部分）：
  * 2024 华南理工大学优秀毕业设计
  * 2023 全球弹性设计竞赛城市设计大奖
  * 2023 香港绿塔竞赛全球Top 10
  * 2021 同济大学国际建造节一等奖（任组长）
  * 2021 国家奖学金
- 实践经历：
  * 2025 项目管理实习生，Brunello Cuccinelli
  * 2024 大湾区AI技术创新应用澳门工作坊
  * 2023 方案设计实习生，广州竖梁社建筑设计有限公司
  * 2023 华南理工大学文创商店室内展陈设计
  * 2022 国际方案研发中心实习生，广州汉森建筑设计有限公司
- 联系方式：邮箱1492086067@qq.com、微信Juli00018、地址上海
- 语言能力：中文（母语）、英语（雅思6.5）

网站作品集详细内容：
1. 建筑与室内设计类项目：
   - 漫游园——可交互式建筑游戏设计
   - Bâtir avec la grammaire de la Terre——法国乡村校舍重建
   - 南京红山动物园河马馆创意设计
   - 其他建筑设计探索项目

2. 家具与产品设计类项目：
   - 光厦——氛围灯设计（使用透明波纹亚克力，将建筑立面韵律以灯具形式呈现）
   - GAMESEAT猫游戏椅——宠物家具系列设计（简约现代设计语言，人宠共用创意家居）

3. 艺术与平面设计类项目：
   - 其他创意设计（文创设计、海报设计、表情包设计、绘画作品，2021-2025年独立设计）

4. AI探索项目：
   - AI词库学习簿（智能词汇管理系统，支持状态标记和进度跟踪）
   - AI学习笔记系统（结构化学习记录功能）

网站特色功能：
- 响应式设计，支持移动端和桌面端
- 项目分类筛选（建筑与室内设计、家具与产品设计、艺术与平面设计）
- 项目详情模态框，包含设计理念、技术参数、项目规模、设计亮点、设计挑战、解决方案等
- 图片画廊和轮播展示
- AI对话助手（当前功能）
- 作品集下载功能

请用中文回答用户关于Juli的问题，回答要准确、详细、友好。你可以：
1. 详细介绍任何项目的内容、设计理念、技术特点
2. 解释Juli的设计风格和理念
3. 回答关于网站功能和使用方法的问题
4. 提供建筑设计相关的专业建议
5. 介绍Juli的教育背景、技能专长、获奖情况等
6. 帮助用户了解如何联系Juli或查看特定项目

记住，你是网站的一部分，应该能够帮助用户更好地了解和使用这个作品集网站。`
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7,
                    stream: false
                })
            });

            console.log('API响应状态:', response.status);
            console.log('API响应头:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API响应错误:', errorText);
                throw new Error(`API请求失败: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('API响应数据:', data);
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                throw new Error('API响应格式不正确');
            }
        } catch (error) {
            console.error('DeepSeek API调用失败:', error);
            console.log('使用备用回复函数');
            // 如果API调用失败，返回备用回复
            return getFallbackResponse(userMessage);
        }
    }

    // 备用回复函数（当API调用失败时使用）
    function getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // 具体项目问题
        if (message.includes('漫游园') || message.includes('可交互式建筑游戏')) {
            return "漫游园是一个可交互式建筑游戏设计项目，这是一个创新的建筑设计概念，将建筑设计与游戏体验相结合。项目探索了如何通过互动性来增强用户对建筑空间的理解和体验。这是一个非常有创意的项目，展现了Juli在建筑设计创新方面的能力。";
        }
        
        if (message.includes('光厦') || message.includes('氛围灯') || message.includes('灯具')) {
            return "光厦氛围灯设计是一个非常有创意的产品设计项目！这个设计使用透明波纹亚克力材料，巧妙地将建筑立面的韵律以灯具的形式呈现出来。设计理念是将建筑感的光影效果糅合到氛围灯之中，创造出可调节的暖光，洒满屋子里每一个温馨的角落。这是一个将建筑设计语言转化为产品设计的优秀案例。";
        }
        
        if (message.includes('查看项目详情') || message.includes('项目详情') || message.includes('如何查看')) {
            return "查看项目详情很简单：<br><br>1. <strong>点击项目</strong>：在作品集页面直接点击任意项目图片<br>2. <strong>浏览详情</strong>：会弹出详情页面，包含项目介绍、设计理念、技术参数等<br>3. <strong>查看图片</strong>：可以浏览项目所有图片，点击左右箭头切换主图<br>4. <strong>更多信息</strong>：右侧有信息侧边栏，可以查看更多详细内容";
        }
        
        if (message.includes('设计风格') || message.includes('风格特点') || message.includes('设计特点')) {
            return "Juli的设计风格特点：<br><br>• <strong>可持续性导向</strong>：注重环保材料和绿色建筑理念<br>• <strong>人文关怀</strong>：关注用户体验和情感需求<br>• <strong>创新思维</strong>：将建筑设计与其他领域（如游戏、产品设计）结合<br>• <strong>技术融合</strong>：熟练运用多种设计软件和AI技术<br>• <strong>跨领域探索</strong>：从建筑到家具、从产品到平面，展现多元化设计能力<br>• <strong>细节精致</strong>：注重设计细节和工艺品质<br><br>她的设计理念强调建筑不仅仅是功能的容器，更是情感和记忆的载体。";
        }
        
        if (message.includes('法国乡村校舍') || message.includes('bâtir') || message.includes('grammaire')) {
            return "Bâtir avec la grammaire de la Terre（用大地的语法建造）是一个法国乡村校舍重建项目。这个项目体现了Juli对可持续建筑设计的深刻理解，强调因地制宜利用当地夯土技术重建文化建筑。项目展现了如何将传统建筑技术与现代设计理念相结合，创造出既环保又具有文化价值的建筑作品。";
        }
        
        if (message.includes('南京红山动物园') || message.includes('河马馆')) {
            return "南京红山动物园河马馆创意设计是一个充满想象力的建筑设计项目。这个项目展现了Juli在创意建筑设计方面的能力，将动物栖息地的功能需求与创新的空间设计相结合，创造出既实用又富有视觉冲击力的建筑作品。";
        }
        
        if (message.includes('猫游戏椅') || message.includes('gameseat') || message.includes('宠物家具')) {
            return "GAMESEAT猫游戏椅是Juli设计的宠物家具系列产品之一。这个系列设计以简约现代的设计语言、丰富有趣的颜色、实用坚固的材质，打造人宠共用的创意家居。设计理念是让家具既适合宠物使用，又能满足主人的审美需求，体现了Juli在产品设计方面的创新思维。";
        }
        
        if (message.includes('ai词库') || message.includes('ai学习') || message.includes('词库学习')) {
            return "AI词库学习簿是Juli开发的AI探索项目之一，这是一个智能化的词汇管理系统，帮助用户学习和记忆AI相关术语。系统支持状态标记和进度跟踪，用户可以管理自己的AI学习进度。此外还有AI学习笔记系统，提供结构化的学习记录功能，帮助用户整理和回顾AI学习过程中的重要知识点。这些项目展现了Juli在AI技术应用方面的探索精神。";
        }
        
        // 网站功能相关问题
        if (message.includes('网站功能') || message.includes('如何使用') || message.includes('怎么用')) {
            return "这个作品集网站的主要功能：<br><br>• <strong>作品展示</strong>：按类别展示建筑设计、家具设计、艺术设计等项目<br>• <strong>项目详情</strong>：点击项目查看完整信息，包括设计理念、技术参数、图片画廊等<br>• <strong>分类筛选</strong>：可以按建筑与室内设计、家具与产品设计、艺术与平面设计分类浏览<br>• <strong>响应式设计</strong>：支持电脑、平板、手机等各种设备<br>• <strong>AI助手</strong>：就是我啦！可以回答关于Juli和作品集的各种问题<br>• <strong>作品集下载</strong>：可以下载完整的作品集PDF文件";
        }
        
        if (message.includes('分类') || message.includes('筛选') || message.includes('浏览')) {
            return "网站的项目分类：<br><br>• <strong>建筑与室内设计</strong>：漫游园、法国乡村校舍重建、南京红山动物园河马馆等<br>• <strong>家具与产品设计</strong>：光厦氛围灯、GAMESEAT猫游戏椅等<br>• <strong>艺术与平面设计</strong>：文创设计、海报设计、表情包设计、绘画作品等<br><br>你可以使用页面上的分类按钮来筛选不同类型的项目，方便浏览和查找感兴趣的设计作品。";
        }
        
        // 设计师基本信息
        if (message.includes('设计师') || message.includes('juli') || message.includes('背景') || message.includes('介绍')) {
            return "你好！我是Juli，一名建筑/家具设计师，专注于可持续设计、空间叙事与多维创意设计。我本科毕业于华南理工大学工业设计&建筑学专业，目前在同济大学攻读建筑学研究生。我热衷于探索建筑设计、家具设计、游戏设计、平面设计等多个领域，相信创意来源于生活的每时每刻。";
        }
        
        // 教育背景
        if (message.includes('教育') || message.includes('学校') || message.includes('学历') || message.includes('专业')) {
            return "我的教育背景：<br>• 本科：华南理工大学（2018-2024），工业设计&建筑学<br>• 研究生：同济大学（2024-2027），建筑学<br>在绿色建筑专门化方向学习，所有专业设计课程均为年级优秀。";
        }
        
        // 技能专长
        if (message.includes('技能') || message.includes('软件') || message.includes('能力') || message.includes('专长')) {
            return "我的技能专长包括：<br><br>建模渲染软件：Rhino, SketchUp, Unreal Engine, Enscape, Lumion, D5<br><br>平面绘图软件：Photoshop, Auto CAD, Adobe Illustrator<br><br>办公剪辑软件：Figma, Microsoft Office Suite, Adobe Audition, 剪映, Miro<br><br>AI相关软件：Midjourney, Stable Diffusion, Cursor, Nano Banana";
        }
        
        // 获奖情况
        if (message.includes('获奖') || message.includes('奖项') || message.includes('荣誉') || message.includes('成就')) {
            return "我的获奖情况（部分）：<br>• 2024 华南理工大学优秀毕业设计<br>• 2023 全球弹性设计竞赛城市设计大奖<br>• 2023 香港绿塔竞赛全球Top 10<br>• 2021 同济大学国际建造节一等奖（任组长）<br>• 2021 国家奖学金";
        }
        
        // 实践经历
        if (message.includes('经历') || message.includes('实习') || message.includes('工作') || message.includes('经验')) {
            return "我的实践经历：<br>• 2025 项目管理实习生，Brunello Cuccinelli<br>• 2024 大湾区AI技术创新应用澳门工作坊<br>• 2023 方案设计实习生，广州竖梁社建筑设计有限公司<br>• 2023 华南理工大学文创商店室内展陈设计<br>• 2022 国际方案研发中心实习生，广州汉森建筑设计有限公司";
        }
        
        // 联系方式
        if (message.includes('联系') || message.includes('邮箱') || message.includes('微信') || message.includes('地址')) {
            return "我的联系方式：<br>• 邮箱：1492086067@qq.com<br>• 微信：Juli00018<br>• 地址：上海<br>欢迎与我联系，讨论设计合作或交流想法！";
        }
        
        // 项目相关
        if (message.includes('项目') || message.includes('作品') || message.includes('设计')) {
            return "我的作品集包含多个领域的项目：<br><br>建筑与室内设计：漫游园、Bâtir avec la grammaire de la Terre、南京红山动物园河马馆等<br><br>家具与产品设计：光厦氛围灯设计、GAMESEAT猫游戏椅等<br><br>艺术与平面设计：其他创意设计项目<br><br>你可以点击具体的项目查看详细信息和设计理念。";
        }
        
        // 设计理念
        if (message.includes('理念') || message.includes('想法') || message.includes('哲学') || message.includes('风格')) {
            return "我的设计理念强调可持续性和人文关怀。我相信建筑不仅仅是功能的容器，更是情感和记忆的载体。我注重探索空间的无限可能，将创意应用于生活的每时每刻。通过运用AI技术与各类软件，我持续探索一切未知的设计可能。";
        }
        
        // 语言能力
        if (message.includes('语言') || message.includes('英语') || message.includes('雅思')) {
            return "我的语言能力：<br>• 中文（母语）<br>• 英语（雅思6.5）<br>具备良好的中英文交流能力，能够进行国际化的设计合作。";
        }
        
        // 默认回复
        return "感谢你的提问！我是Juli的AI助手，可以为你介绍她的设计作品、教育背景、技能专长、获奖情况、实践经历等信息。你可以问我关于建筑设计、作品集或者设计师背景的任何问题。有什么想了解的吗？";
    }
    
    async function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, false);
            chatInput.value = '';
            
            // 显示AI正在思考的状态
            const thinkingMessage = addMessage("AI正在思考中...", true);
            
            try {
                // 调用DeepSeek API
                const aiResponse = await callDeepSeekAPI(message);
                
                // 移除思考消息，添加真实回复
                if (thinkingMessage) {
                    thinkingMessage.remove();
                }
                addMessage(aiResponse, true);
                
                // 保存对话到历史记录
                if (currentConversation.length > 0) {
                    const conversation = {
                        title: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
                        messages: [...currentConversation],
                        timestamp: new Date()
                    };
                    
                    conversations.unshift(conversation);
                    if (conversations.length > 50) {
                        conversations = conversations.slice(0, 50);
                    }
                    
                    saveHistory();
                    // 实时更新历史记录列表
                    renderHistoryList();
                    
                    // 如果侧边栏是打开的，高亮显示最新的对话
                    if (chatSidebar.classList.contains('show')) {
                        highlightLatestConversation();
                    }
                }
                
                // 更新最新对话状态
                latestConversation = [...currentConversation];
            } catch (error) {
                console.error('发送消息失败:', error);
                
                // 移除思考消息，显示错误信息
                if (thinkingMessage) {
                    thinkingMessage.remove();
                }
                addMessage("抱歉，AI助手暂时无法回复，请稍后再试。", true);
            }
        }
    }
    
    // 事件监听器
    sendButton.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // 侧边栏切换
    sidebarToggle.addEventListener('click', () => {
        chatSidebar.classList.remove('show');
        chatOverlay.classList.remove('show');
    });
    
    historyToggle.addEventListener('click', () => {
        console.log('历史记录按钮被点击');
        console.log('侧边栏元素:', chatSidebar);
        console.log('侧边栏当前样式:', window.getComputedStyle(chatSidebar).transform);
        
        const isVisible = chatSidebar.classList.contains('show');
        if (isVisible) {
            chatSidebar.classList.remove('show');
            chatOverlay.classList.remove('show');
        } else {
            chatSidebar.classList.add('show');
            chatOverlay.classList.add('show');
            
            // 侧边栏打开时，立即更新历史记录并显示当前对话预览
            renderHistoryList();
            if (currentConversation.length > 0) {
                createCurrentConversationPreview();
            }
        }
        
        console.log('侧边栏状态:', chatSidebar.classList.contains('show'));
        console.log('遮罩层状态:', chatOverlay.classList.contains('show'));
        console.log('侧边栏新样式:', window.getComputedStyle(chatSidebar).transform);
    });
    
    // 点击遮罩层关闭侧边栏
    chatOverlay.addEventListener('click', () => {
        chatSidebar.classList.remove('show');
        chatOverlay.classList.remove('show');
    });
    
    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query) {
            searchHistory(query);
        } else {
            renderHistoryList();
        }
    });
    
    // 清空历史记录
    clearHistory.addEventListener('click', () => {
        if (confirm('确定要清空所有对话历史吗？此操作不可恢复。')) {
            conversations = [];
            currentConversation = [];
            saveHistory();
            renderHistoryList();
            chatMessages.innerHTML = '';
            addMessage("你好！我是Juli的AI设计师助手，熟悉她个人网站的所有内容。我可以为你详细介绍：<br><br>• 设计师背景和教育经历<br>• 技能专长和软件能力<br>• 获奖情况和实践经历<br>• 设计理念和作品集项目<br>• 网站功能和使用方法<br>• 联系方式和合作信息<br><br>你可以问我关于Juli的任何问题，包括她的作品、设计理念、网站功能等！<br><br>💡 试试问我：<br>• \"介绍一下漫游园项目\"<br>• \"光厦氛围灯的设计理念是什么\"<br>• \"如何查看项目详情\"<br>• \"Juli的设计风格特点\"", true, false);
        }
    });
    
    // 新对话
    newChat.addEventListener('click', startNewChat);
    
    // 回到当前对话按钮
    const backToCurrentBtn = document.getElementById('backToCurrentBtn');
    if (backToCurrentBtn) {
        backToCurrentBtn.addEventListener('click', backToCurrentConversation);
    }
    
    // 滚动加载历史记录
    function handleScrollLoadHistory() {
        if (isLoadingHistory) return;
        
        const scrollTop = chatMessages.scrollTop;
        const scrollHeight = chatMessages.scrollHeight;
        const clientHeight = chatMessages.clientHeight;
        
        // 当滚动到顶部附近时加载更多历史记录
        if (scrollTop < 100 && conversations.length > 0) {
            loadMoreHistory();
        }
    }
    
    // 显示加载指示器
    function showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-indicator';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div><span>加载历史消息...</span>';
        chatMessages.insertBefore(loadingDiv, chatMessages.firstChild);
    }
    
    // 隐藏加载指示器
    function hideLoadingIndicator() {
        const loadingDiv = chatMessages.querySelector('.loading-indicator');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
    
    // 创建消息元素
    function createMessageElement(content, isAI) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isAI ? 'ai-message' : 'user-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = isAI ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        return messageDiv;
    }
    
    // 加载更多历史记录
    function loadMoreHistory() {
        if (isLoadingHistory) return;
        
        // 检查是否还有更多历史记录可以加载
        const totalConversations = conversations.length;
        const loadedCount = currentHistoryPage * HISTORY_PAGE_SIZE;
        
        if (loadedCount >= totalConversations) {
            return; // 没有更多历史记录
        }
        
        isLoadingHistory = true;
        
        // 显示加载指示器
        showLoadingIndicator();
        
        // 模拟加载延迟
        setTimeout(() => {
            // 计算要加载的历史记录范围
            const startIndex = loadedCount;
            const endIndex = Math.min(startIndex + HISTORY_PAGE_SIZE, totalConversations);
            
            // 获取要加载的历史记录
            const newConversations = conversations.slice(startIndex, endIndex);
            
            // 将历史记录添加到当前对话的前面
            if (newConversations.length > 0) {
                // 保存当前滚动位置
                const currentScrollTop = chatMessages.scrollTop;
                const currentScrollHeight = chatMessages.scrollHeight;
                
                // 在消息列表前面插入历史记录
                newConversations.reverse().forEach(conversation => {
                    conversation.messages.forEach(message => {
                        const messageElement = createMessageElement(message.content, message.type === 'ai');
                        chatMessages.insertBefore(messageElement, chatMessages.firstChild);
                    });
                });
                
                // 调整滚动位置，保持用户当前查看的位置
                const newScrollHeight = chatMessages.scrollHeight;
                const heightDifference = newScrollHeight - currentScrollHeight;
                chatMessages.scrollTop = currentScrollTop + heightDifference;
                
                // 更新页码
                currentHistoryPage++;
            }
            
            // 隐藏加载指示器
            hideLoadingIndicator();
            isLoadingHistory = false;
        }, 500);
    }
    
    // 初始化
    loadHistory();
    startNewChat();
    
    // 添加滚动事件监听器
    chatMessages.addEventListener('scroll', handleScrollLoadHistory);
    
    // 测试API连接
    testAPIConnection().then(isConnected => {
        if (isConnected) {
            console.log('✅ DeepSeek API连接成功！');
        } else {
            console.log('❌ DeepSeek API连接失败，将使用备用回复');
        }
    });
}

// 自定义光标
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // 光标跟随鼠标
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 悬停效果
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .nav-link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // 点击效果
    document.addEventListener('click', () => {
        cursor.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = '';
        }, 100);
    });
}

// 平滑滚动
function initSmoothScrolling() {
    // 快速滚动到指定元素
    function smoothScrollTo(element, duration = 100) { // 减少到300ms
        const targetPosition = element.offsetTop - 80; // 考虑导航栏高度
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // 检查href是否有效且不是单独的'#'
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
            if (target) {
                smoothScrollTo(target);
                }
            }
        });
    });
}

// 动画效果
function initAnimations() {
    // 观察器选项
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 视差滚动效果
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 响应式导航菜单
function initResponsiveMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// 图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(() => {
    // 重新初始化响应式功能
    initResponsiveMenu();
}, 250));

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时的处理
        document.title = '建筑设计作品集 | 回来看看吧';
    } else {
        // 页面显示时的处理
        document.title = '建筑设计作品集 | Portfolio';
    }
});

// 首页轮播图功能
function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let autoplayInterval;
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        // 移除当前活动状态
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        // 更新索引
        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        
        // 激活新的幻灯片
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }
    
    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // 自动播放
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // 5秒切换一次
    }
    
    // 停止自动播放
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    // 事件监听器
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay(); // 重新开始自动播放
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay(); // 重新开始自动播放
        });
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay(); // 重新开始自动播放
        });
    });
    
    // 鼠标悬停时停止自动播放
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // 触摸事件支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向左滑动，下一张
                nextSlide();
            } else {
                // 向右滑动，上一张
                prevSlide();
            }
            stopAutoplay();
            startAutoplay();
        }
    }
    
    // 键盘事件支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        }
    });
    
    // 开始自动播放
    startAutoplay();
}

// 图片保护功能
function initImageProtection() {
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 禁用键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 禁用 Ctrl+S (保存)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // 禁用 Ctrl+U (查看源代码)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // 禁用 F12 (开发者工具)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // 禁用 Ctrl+Shift+I (开发者工具)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // 禁用 Ctrl+Shift+C (开发者工具)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
    });
    
    // 禁用拖拽
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // 禁用选择
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // 为所有图片添加保护
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // 添加水印效果
        img.style.position = 'relative';
        
        // 禁用图片的默认行为
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        img.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
    });
    
    // 监听动态添加的图片
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.tagName === 'IMG') {
                        // 为新添加的图片应用保护
                        node.addEventListener('contextmenu', function(e) {
                            e.preventDefault();
                            return false;
                        });
                        node.addEventListener('dragstart', function(e) {
                            e.preventDefault();
                            return false;
                        });
                        node.addEventListener('selectstart', function(e) {
                            e.preventDefault();
                            return false;
                        });
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 初始化下载简历功能
function initDownloadResume() {
    console.log('开始初始化下载简历功能');
    
    // 等待DOM完全加载
    setTimeout(() => {
        console.log('DOM加载完成，查找关于我部分的下载链接');
        
        // 查找关于我部分的下载链接
        const downloadLink = document.querySelector('.download-cv');
        
        if (downloadLink) {
            console.log('找到下载链接，添加事件监听器:', downloadLink);
            
            // 先移除可能存在的旧事件监听器
            downloadLink.removeEventListener('click', handleDownloadClick);
            
            // 添加新的事件监听器
            downloadLink.addEventListener('click', handleDownloadClick);
            
            console.log('下载链接事件监听器已添加');
        } else {
            console.error('找不到下载链接元素');
        }
    }, 500);
}

// 下载处理函数
function handleDownloadClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('下载按钮被点击');
    
    try {
        // 直接在新标签页中打开PDF文件
        console.log('在新标签页中打开PDF文件');
        const newWindow = window.open('（已压缩）张羽简历作品集all.pdf', '_blank');
        
        if (newWindow) {
            console.log('PDF文件已在新标签页中打开');
        } else {
            // 如果弹窗被阻止，静默处理
            console.log('弹窗被阻止');
        }
        
    } catch (error) {
        console.error('打开PDF过程中出现错误:', error);
    }
}
