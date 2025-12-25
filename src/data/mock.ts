import type { TeamMember, Service, CaseStudy, FAQ, SpecialOffer, VisionMission } from './types';

// Team Members - One for each department
export const team: TeamMember[] = [
  {
    id: '1',
    departmentKey: 'pr',
    name: { en: 'Sarah Al-Mansouri', ar: 'سارة المنصوري' },
    role: { en: 'Public Relations Specialist', ar: 'أخصائية العلاقات العامة' },
    bio: {
      en: 'Expert in reputation management and strategic communication. Over 10 years building brand narratives that resonate across cultures.',
      ar: 'خبيرة في إدارة السمعة والتواصل الاستراتيجي. أكثر من 10 سنوات في بناء سرد العلامة التجارية الذي يتردد صداه عبر الثقافات.'
    },
    avatarUrl: '/assets/team/member1.svg'
  },
  {
    id: '2',
    departmentKey: 'media',
    name: { en: 'Ahmed Hassan', ar: 'أحمد حسن' },
    role: { en: 'Media Buying Strategist', ar: 'استراتيجي شراء الوسائط' },
    bio: {
      en: 'Data-driven media buyer specializing in maximizing ROAS. Managed campaigns with over $5M spend across MENA region.',
      ar: 'مشتري وسائط يعتمد على البيانات متخصص في تعظيم عائد الإنفاق الإعلاني. أدار حملات بإنفاق يتجاوز 5 ملايين دولار في منطقة الشرق الأوسط.'
    },
    avatarUrl: '/assets/team/member2.svg'
  },
  {
    id: '3',
    departmentKey: 'content',
    name: { en: 'Layla Ibrahim', ar: 'ليلى إبراهيم' },
    role: { en: 'Content Creator & Strategist', ar: 'منشئة ومستراتيجية محتوى' },
    bio: {
      en: 'Award-winning content creator crafting viral stories for TikTok, Instagram, and YouTube. 50M+ organic reach achieved.',
      ar: 'منشئة محتوى حائزة على جوائز تصنع قصصًا فيروسية لتيك توك وإنستجرام ويوتيوب. تم تحقيق أكثر من 50 مليون وصول عضوي.'
    },
    avatarUrl: '/assets/team/member3.svg'
  },
  {
    id: '4',
    departmentKey: 'research',
    name: { en: 'Omar Al-Farsi', ar: 'عمر الفارسي' },
    role: { en: 'Market Research Analyst', ar: 'محلل أبحاث السوق' },
    bio: {
      en: 'Strategic researcher uncovering market insights that drive competitive advantage. Expertise in consumer behavior and trend forecasting.',
      ar: 'باحث استراتيجي يكشف عن رؤى السوق التي تحقق ميزة تنافسية. خبير في سلوك المستهلك والتنبؤ بالاتجاهات.'
    },
    avatarUrl: '/assets/team/member4.svg'
  },
  {
    id: '5',
    departmentKey: 'moderator',
    name: { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
    role: { en: 'Community Moderator & Trainer', ar: 'مشرفة ومدربة المجتمع' },
    bio: {
      en: 'Community management specialist ensuring brand voice consistency. Expert in crisis management and customer engagement strategies.',
      ar: 'أخصائية إدارة المجتمع تضمن اتساق صوت العلامة التجارية. خبيرة في إدارة الأزمات واستراتيجيات التفاعل مع العملاء.'
    },
    avatarUrl: '/assets/team/member5.svg'
  }
];

// Services
export const services: Service[] = [
  {
    id: 's1',
    title: { en: 'Strategic Brand Planning', ar: 'التخطيط الاستراتيجي للعلامة التجارية' },
    description: {
      en: 'Build a roadmap that transforms your brand vision into measurable business outcomes.',
      ar: 'بناء خارطة طريق تحول رؤية علامتك التجارية إلى نتائج أعمال قابلة للقياس.'
    },
    details: {
      en: [
        'Comprehensive market analysis',
        'Competitor positioning audit',
        'Brand architecture development',
        'Go-to-market strategy',
        'KPI framework design'
      ],
      ar: [
        'تحليل شامل للسوق',
        'تدقيق موقع المنافسين',
        'تطوير بنية العلامة التجارية',
        'استراتيجية الدخول إلى السوق',
        'تصميم إطار مؤشرات الأداء'
      ]
    }
  },
  {
    id: 's2',
    title: { en: 'Performance Media Buying', ar: 'شراء الوسائط الأدائية' },
    description: {
      en: 'Data-driven advertising campaigns that maximize your return on ad spend.',
      ar: 'حملات إعلانية مدفوعة بالبيانات تعظم عائد إنفاقك الإعلاني.'
    },
    details: {
      en: [
        'Multi-platform campaign management (Meta, Google, TikTok, Snapchat)',
        'Advanced audience targeting & segmentation',
        'Real-time performance optimization',
        'A/B testing & creative iteration',
        'Attribution modeling & reporting'
      ],
      ar: [
        'إدارة الحملات متعددة المنصات (ميتا، جوجل، تيك توك، سناب شات)',
        'استهداف وتجزئة جمهور متقدم',
        'تحسين الأداء في الوقت الفعلي',
        'اختبار A/B وتكرار إبداعي',
        'نمذجة الإسناد وإعداد التقارير'
      ]
    }
  },
  {
    id: 's3',
    title: { en: 'Content Creation & Strategy', ar: 'إنشاء المحتوى والاستراتيجية' },
    description: {
      en: 'Viral-ready content that captures attention and drives authentic engagement.',
      ar: 'محتوى جاهز للانتشار يجذب الانتباه ويدفع التفاعل الأصيل.'
    },
    details: {
      en: [
        'Platform-specific content strategy (Reels, TikTok, YouTube)',
        'Scriptwriting & storyboarding',
        'Professional video production',
        'Influencer collaboration management',
        'Content calendar & scheduling'
      ],
      ar: [
        'استراتيجية محتوى خاصة بالمنصة (ريلز، تيك توك، يوتيوب)',
        'كتابة النصوص وإعداد القصة المصورة',
        'إنتاج فيديو احترافي',
        'إدارة التعاون مع المؤثرين',
        'تقويم المحتوى والجدولة'
      ]
    }
  },
  {
    id: 's4',
    title: { en: 'Market Research & Insights', ar: 'أبحاث السوق والرؤى' },
    description: {
      en: 'Uncover the strategic intelligence that gives you an unfair competitive advantage.',
      ar: 'اكتشف الذكاء الاستراتيجي الذي يمنحك ميزة تنافسية غير عادلة.'
    },
    details: {
      en: [
        'Consumer behavior analysis',
        'Competitor intelligence gathering',
        'Market opportunity mapping',
        'Trend forecasting & prediction',
        'Customer journey mapping'
      ],
      ar: [
        'تحليل سلوك المستهلك',
        'جمع معلومات استخبارات المنافسين',
        'رسم فرص السوق',
        'التنبؤ بالاتجاهات والتوقع',
        'رسم رحلة العميل'
      ]
    }
  },
  {
    id: 's5',
    title: { en: 'Community Management', ar: 'إدارة المجتمع' },
    description: {
      en: 'Build loyal communities that amplify your brand and defend it naturally.',
      ar: 'بناء مجتمعات مخلصة تضخم علامتك التجارية وتدافع عنها بشكل طبيعي.'
    },
    details: {
      en: [
        '24/7 community moderation',
        'Crisis management & rapid response',
        'Engagement strategy & execution',
        'User-generated content campaigns',
        'Brand ambassador programs'
      ],
      ar: [
        'إشراف على المجتمع على مدار الساعة',
        'إدارة الأزمات والاستجابة السريعة',
        'استراتيجية المشاركة والتنفيذ',
        'حملات المحتوى الذي ينشئه المستخدم',
        'برامج سفراء العلامة التجارية'
      ]
    }
  },
  {
    id: 's6',
    title: { en: 'Public Relations & Reputation', ar: 'العلاقات العامة والسمعة' },
    description: {
      en: 'Shape public perception and protect your brand reputation proactively.',
      ar: 'شكل التصور العام واحمِ سمعة علامتك التجارية بشكل استباقي.'
    },
    details: {
      en: [
        'Media relations & press coverage',
        'Crisis communication planning',
        'Thought leadership positioning',
        'Event management & activations',
        'Stakeholder communication strategy'
      ],
      ar: [
        'العلاقات الإعلامية والتغطية الصحفية',
        'تخطيط الاتصال أثناء الأزمات',
        'تحديد موقع قيادة الفكر',
        'إدارة الفعاليات والتنشيطات',
        'استراتيجية التواصل مع أصحاب المصلحة'
      ]
    }
  }
];

// Case Studies
export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: { en: 'From Local to Regional: Fashion Brand Expansion', ar: 'من المحلي إلى الإقليمي: توسع علامة تجارية للأزياء' },
    industry: { en: 'Fashion & Retail', ar: 'الأزياء والتجزئة' },
    problem: {
      en: 'A Dubai-based fashion brand struggled to expand beyond local markets. Low brand awareness in KSA and Egypt, with 85% of revenue tied to UAE.',
      ar: 'كافحت علامة تجارية للأزياء في دبي للتوسع خارج الأسواق المحلية. وعي منخفض بالعلامة التجارية في السعودية ومصر، مع ربط 85٪ من الإيرادات بالإمارات.'
    },
    decision: {
      en: 'We built a region-specific content strategy with localized influencer partnerships, targeted Meta & TikTok campaigns, and market-specific messaging.',
      ar: 'قمنا ببناء استراتيجية محتوى خاصة بالمنطقة مع شراكات مؤثرين محليين، وحملات ميتا وتيك توك مستهدفة، ورسائل خاصة بالسوق.'
    },
    outcome: {
      en: 'Regional revenue increased by 340% in 6 months. KSA became the second-largest market. TikTok content achieved 12M organic reach.',
      ar: 'زادت الإيرادات الإقليمية بنسبة 340٪ في 6 أشهر. أصبحت السعودية ثاني أكبر سوق. حقق محتوى تيك توك 12 مليون وصول عضوي.'
    },
    metrics: [
      { label: { en: 'Revenue Growth', ar: 'نمو الإيرادات' }, value: '+340%' },
      { label: { en: 'Organic Reach', ar: 'الوصول العضوي' }, value: '12M' },
      { label: { en: 'ROAS', ar: 'عائد الإنفاق الإعلاني' }, value: '5.2x' }
    ]
  },
  {
    id: 'cs2',
    title: { en: 'Turning Crisis into Opportunity: F&B Brand Recovery', ar: 'تحويل الأزمة إلى فرصة: استرداد علامة تجارية للأغذية والمشروبات' },
    industry: { en: 'Food & Beverage', ar: 'الأغذية والمشروبات' },
    problem: {
      en: 'A restaurant chain faced a viral social media crisis after a customer complaint went viral. Brand sentiment dropped 60% overnight with calls for boycott.',
      ar: 'واجهت سلسلة مطاعم أزمة على وسائل التواصل الاجتماعي بعد انتشار شكوى عميل. انخفضت معنويات العلامة التجارية بنسبة 60٪ بين عشية وضحاها مع دعوات للمقاطعة.'
    },
    decision: {
      en: 'Implemented immediate crisis response protocol, transparent communication, public accountability, and turned the narrative into a customer-first improvement story.',
      ar: 'نفذنا بروتوكول استجابة فورية للأزمات، وتواصل شفاف، ومساءلة عامة، وحولنا السرد إلى قصة تحسين تضع العميل أولاً.'
    },
    outcome: {
      en: 'Sentiment recovered to +20% within 3 weeks. Crisis became a case study in authentic brand response. Foot traffic increased 40%.',
      ar: 'استعادت المعنويات إلى +20٪ في غضون 3 أسابيع. أصبحت الأزمة دراسة حالة في الاستجابة الأصيلة للعلامة التجارية. زاد حركة المرور بنسبة 40٪.'
    },
    metrics: [
      { label: { en: 'Sentiment Recovery', ar: 'استعادة المعنويات' }, value: '+80pts' },
      { label: { en: 'Response Time', ar: 'وقت الاستجابة' }, value: '<2hrs' },
      { label: { en: 'Traffic Increase', ar: 'زيادة حركة المرور' }, value: '+40%' }
    ]
  },
  {
    id: 'cs3',
    title: { en: 'Tech Startup: Zero to Series A with Strategic PR', ar: 'شركة ناشئة تقنية: من الصفر إلى السلسلة أ باستخدام العلاقات العامة الاستراتيجية' },
    industry: { en: 'Technology & SaaS', ar: 'التكنولوجيا والبرمجيات كخدمة' },
    problem: {
      en: 'A fintech startup had strong product-market fit but zero media presence. Investors required proof of market leadership before Series A.',
      ar: 'كانت لدى شركة ناشئة في مجال التكنولوجيا المالية ملاءمة قوية بين المنتج والسوق ولكن لم يكن لها وجود إعلامي. طلب المستثمرون دليلاً على قيادة السوق قبل السلسلة أ.'
    },
    decision: {
      en: 'Positioned founders as thought leaders, secured tier-1 media coverage, launched data-driven industry reports, and built strategic partnerships.',
      ar: 'وضعنا المؤسسين كقادة فكر، وحصلنا على تغطية إعلامية من الدرجة الأولى، وأطلقنا تقارير صناعية مدفوعة بالبيانات، وبنينا شراكات استراتيجية.'
    },
    outcome: {
      en: 'Secured $8M Series A at 2x target valuation. Featured in Forbes, TechCrunch, and regional media. Became category leader in MENA fintech.',
      ar: 'حصلنا على 8 ملايين دولار من السلسلة أ بتقييم ضعف الهدف. ظهرنا في فوربس وتيك كرانش ووسائل الإعلام الإقليمية. أصبحنا رائدين في فئة التكنولوجيا المالية في الشرق الأوسط.'
    },
    metrics: [
      { label: { en: 'Funding Secured', ar: 'التمويل المضمون' }, value: '$8M' },
      { label: { en: 'Media Features', ar: 'ميزات الوسائط' }, value: '47' },
      { label: { en: 'Valuation Increase', ar: 'زيادة التقييم' }, value: '2x' }
    ]
  },
  {
    id: 'cs4',
    title: { en: 'E-commerce Scale: 10x ROAS in 90 Days', ar: 'توسيع التجارة الإلكترونية: 10 أضعاف عائد الإنفاق الإعلاني في 90 يومًا' },
    industry: { en: 'E-commerce & D2C', ar: 'التجارة الإلكترونية والمباشرة للمستهلك' },
    problem: {
      en: 'Beauty brand spending $50K/month on ads with 1.8x ROAS. High CAC, low retention, poor targeting. Budget was being wasted on cold audiences.',
      ar: 'علامة تجارية للجمال تنفق 50 ألف دولار شهريًا على الإعلانات مع عائد 1.8 أضعاف. تكلفة اكتساب عميل عالية، احتفاظ منخفض، استهداف ضعيف. كانت الميزانية تُهدر على جماهير باردة.'
    },
    decision: {
      en: 'Complete campaign restructure: advanced pixel optimization, lookalike audiences, retargeting funnels, dynamic creative testing, and retention campaigns.',
      ar: 'إعادة هيكلة كاملة للحملة: تحسين متقدم للبكسل، جماهير مشابهة، مسارات إعادة الاستهداف، اختبار إبداعي ديناميكي، وحملات الاحتفاظ.'
    },
    outcome: {
      en: 'ROAS increased from 1.8x to 10.4x. CAC dropped 62%. Launched successful retention program generating 35% of revenue from repeat customers.',
      ar: 'زاد عائد الإنفاق الإعلاني من 1.8 أضعاف إلى 10.4 أضعاف. انخفضت تكلفة اكتساب العميل بنسبة 62٪. تم إطلاق برنامج احتفاظ ناجح يولد 35٪ من الإيرادات من العملاء المتكررين.'
    },
    metrics: [
      { label: { en: 'ROAS Improvement', ar: 'تحسين عائد الإنفاق الإعلاني' }, value: '10.4x' },
      { label: { en: 'CAC Reduction', ar: 'تخفيض تكلفة اكتساب العميل' }, value: '-62%' },
      { label: { en: 'Repeat Revenue', ar: 'إيرادات متكررة' }, value: '35%' }
    ]
  }
];

// FAQ Items
export const faq: FAQ[] = [
  {
    id: 'faq1',
    category: 'services',
    question: { en: 'What services does XFUSE provide?', ar: 'ما هي الخدمات التي تقدمها XFUSE؟' },
    answer: {
      en: 'XFUSE offers comprehensive brand strategy, performance media buying, content creation, market research, community management, and public relations services. We provide end-to-end solutions tailored to your business goals.',
      ar: 'تقدم XFUSE استراتيجية علامة تجارية شاملة، وشراء وسائط أدائية، وإنشاء محتوى، وأبحاث سوق، وإدارة مجتمع، وخدمات علاقات عامة. نقدم حلولاً شاملة مصممة خصيصًا لأهداف عملك.'
    }
  },
  {
    id: 'faq2',
    category: 'services',
    question: { en: 'Can I work with one department only?', ar: 'هل يمكنني العمل مع قسم واحد فقط؟' },
    answer: {
      en: 'Absolutely. While our integrated approach delivers the best results, you can engage any single department based on your specific needs. Our specialists work independently or as part of cross-functional teams.',
      ar: 'بالتأكيد. بينما يحقق نهجنا المتكامل أفضل النتائج، يمكنك التعامل مع أي قسم واحد بناءً على احتياجاتك المحددة. يعمل متخصصونا بشكل مستقل أو كجزء من فرق متعددة الوظائف.'
    }
  },
  {
    id: 'faq3',
    category: 'process',
    question: { en: 'What is your typical engagement timeline?', ar: 'ما هو الجدول الزمني النموذجي للمشاركة؟' },
    answer: {
      en: 'Projects vary, but most clients see initial results within 30-60 days. We start with a 15-minute discovery call, followed by a detailed strategy session. Implementation begins immediately after approval.',
      ar: 'تختلف المشاريع، لكن معظم العملاء يرون النتائج الأولية في غضون 30-60 يومًا. نبدأ بمكالمة اكتشاف مدتها 15 دقيقة، تليها جلسة استراتيجية مفصلة. يبدأ التنفيذ فورًا بعد الموافقة.'
    }
  },
  {
    id: 'faq4',
    category: 'process',
    question: { en: 'How do you measure success?', ar: 'كيف تقيس النجاح؟' },
    answer: {
      en: 'We establish clear KPIs during the strategy phase. Metrics depend on your goals: ROAS for media buying, engagement rates for content, sentiment scores for PR, market share for research. You receive transparent, real-time reporting.',
      ar: 'نضع مؤشرات أداء رئيسية واضحة خلال مرحلة الاستراتيجية. تعتمد المقاييس على أهدافك: عائد الإنفاق الإعلاني لشراء الوسائط، معدلات المشاركة للمحتوى، درجات المعنويات للعلاقات العامة، حصة السوق للبحث. تتلقى تقارير شفافة في الوقت الفعلي.'
    }
  },
  {
    id: 'faq5',
    category: 'pricing',
    question: { en: 'What are your pricing models?', ar: 'ما هي نماذج التسعير الخاصة بك؟' },
    answer: {
      en: 'We offer flexible pricing: project-based, monthly retainers, or performance-based models. Pricing depends on scope, complexity, and scale. The 15-minute consultation includes a custom quote based on your specific needs.',
      ar: 'نقدم تسعيرًا مرنًا: قائم على المشروع، أو عقود شهرية، أو نماذج قائمة على الأداء. يعتمد السعر على النطاق والتعقيد والحجم. تشمل استشارة الـ 15 دقيقة عرض أسعار مخصص بناءً على احتياجاتك المحددة.'
    }
  },
  {
    id: 'faq6',
    category: 'pricing',
    question: { en: 'Do you have a minimum budget requirement?', ar: 'هل لديكم حد أدنى لمتطلبات الميزانية؟' },
    answer: {
      en: 'For media buying, we recommend a minimum monthly ad spend of $10K to achieve meaningful results. Strategy and consulting projects start at $5K. We work with businesses at various stages, from startups to enterprises.',
      ar: 'لشراء الوسائط، نوصي بحد أدنى للإنفاق الإعلاني الشهري قدره 10 آلاف دولار لتحقيق نتائج ذات مغزى. تبدأ مشاريع الاستراتيجية والاستشارات من 5 آلاف دولار. نعمل مع الشركات في مراحل مختلفة، من الشركات الناشئة إلى المؤسسات.'
    }
  },
  {
    id: 'faq7',
    category: 'technical',
    question: { en: 'Which platforms do you specialize in?', ar: 'ما هي المنصات التي تتخصصون فيها؟' },
    answer: {
      en: 'We manage campaigns across Meta (Facebook/Instagram), Google (Search/Display/YouTube), TikTok, Snapchat, Twitter/X, LinkedIn, and programmatic networks. Platform selection is based on where your audience is most active.',
      ar: 'ندير حملات عبر ميتا (فيسبوك/إنستجرام)، وجوجل (البحث/العرض/يوتيوب)، وتيك توك، وسناب شات، وتويتر/إكس، ولينكد إن، والشبكات البرمجية. يعتمد اختيار المنصة على مكان نشاط جمهورك.'
    }
  },
  {
    id: 'faq8',
    category: 'technical',
    question: { en: 'Do you provide bilingual content (Arabic & English)?', ar: 'هل تقدمون محتوى ثنائي اللغة (عربي وإنجليزي)؟' },
    answer: {
      en: 'Yes, all our services are available in both Arabic and English. Our team includes native speakers who understand cultural nuances, ensuring your message resonates authentically across MENA markets.',
      ar: 'نعم، جميع خدماتنا متاحة بالعربية والإنجليزية. يضم فريقنا متحدثين أصليين يفهمون الفروق الثقافية الدقيقة، مما يضمن أن رسالتك تتردد بشكل أصيل عبر أسواق الشرق الأوسط.'
    }
  },
  {
    id: 'faq9',
    category: 'general',
    question: { en: 'What industries do you work with?', ar: 'ما هي الصناعات التي تعملون معها؟' },
    answer: {
      en: 'We serve clients across fashion, F&B, technology, finance, healthcare, education, real estate, and e-commerce. Our expertise is in strategic thinking and execution, which translates across all industries.',
      ar: 'نخدم العملاء عبر الأزياء، والأغذية والمشروبات، والتكنولوجيا، والمالية، والرعاية الصحية، والتعليم، والعقارات، والتجارة الإلكترونية. خبرتنا في التفكير الاستراتيجي والتنفيذ، والتي تترجم عبر جميع الصناعات.'
    }
  },
  {
    id: 'faq10',
    category: 'general',
    question: { en: 'What makes XFUSE different from traditional agencies?', ar: 'ما الذي يجعل XFUSE مختلفة عن الوكالات التقليدية؟' },
    answer: {
      en: 'We combine strategic depth with execution speed. Our avatar-guided onboarding ensures you connect with the right specialist instantly. We are data-driven, culturally fluent, and built for the modern MENA market. No bloat, just results.',
      ar: 'نجمع بين العمق الاستراتيجي وسرعة التنفيذ. يضمن تأهيلنا الموجه بالصورة الرمزية أنك تتصل بالمتخصص المناسب على الفور. نحن مدفوعون بالبيانات، بارعون ثقافيًا، ومبنيون لسوق الشرق الأوسط الحديث. لا انتفاخ، فقط نتائج.'
    }
  }
];

// Special Offer
export const specialOffer: SpecialOffer = {
  id: 'offer1',
  title: {
    en: 'Launch Offer: First Month Strategy + Execution',
    ar: 'عرض الإطلاق: الاستراتيجية + التنفيذ للشهر الأول'
  },
  description: {
    en: 'Get a complete brand audit, strategic roadmap, and first-month execution for 40% off. Limited to the first 10 clients. Includes one free department specialization of your choice.',
    ar: 'احصل على تدقيق كامل للعلامة التجارية، وخارطة طريق استراتيجية، وتنفيذ الشهر الأول بخصم 40٪. محدود بأول 10 عملاء. يتضمن تخصص قسم واحد مجاني من اختيارك.'
  },
  cta: {
    en: 'Claim Your Spot',
    ar: 'احجز مكانك'
  },
  validUntil: '2025-01-31'
};

// Vision & Mission
export const visionMission: VisionMission = {
  vision: {
    en: 'To become the strategic partner of choice for ambitious brands across MENA, transforming market challenges into measurable growth opportunities through data-driven creativity and cultural intelligence.',
    ar: 'أن نصبح الشريك الاستراتيجي المفضل للعلامات التجارية الطموحة في منطقة الشرق الأوسط وشمال إفريقيا، نحول تحديات السوق إلى فرص نمو قابلة للقياس من خلال الإبداع المدفوع بالبيانات والذكاء الثقافي.'
  },
  mission: {
    en: 'We exist to bridge the gap between brand potential and market reality. By combining strategic rigor with execution excellence, we help businesses cut through noise, connect authentically with their audiences, and build sustainable competitive advantages in the region\'s most dynamic markets.',
    ar: 'نحن موجودون لسد الفجوة بين إمكانات العلامة التجارية وواقع السوق. من خلال الجمع بين الصرامة الاستراتيجية والتميز في التنفيذ، نساعد الشركات على اختراق الضوضاء، والتواصل بشكل أصيل مع جماهيرها، وبناء مزايا تنافسية مستدامة في أكثر أسواق المنطقة ديناميكية.'
  }
};
