const projects = [
    {
        id: 'browser-digital-hygiene',
        title: 'Browser Digital Hygiene Score Web App',
        category: ['Cybersecurity', 'Web Development'],
        description: 'A modern security workspace for scanning browser hygiene, tracking protocol issues, and generating clean browsing reports that feel like developer tooling.',
        badge: 'Security · Web App · API Integration',
        tech: ['HTML', 'CSS', 'JavaScript', 'Web APIs', 'Accessibility'],
        features: ['Live browser scan scorecard', 'Security guidance dashboard', 'Exportable PDF report', 'Visual data summary panels'],
        stats: { 'Reports': '190+', 'Issues Flagged': '24', 'Accuracy': '97%' },
        timeline: ['Project discovery', 'UI design', 'Data ingestion', 'Security report engine', 'Testing & polish'],
        github: 'https://github.com/SanduniRana/browser-digital-hygiene',
        demo: 'https://example.com/browser-hygiene-demo',
        readme: '# Browser Digital Hygiene Score Web App\n\nThis project is designed to analyze browser security and privacy hygiene with a polished interface inspired by developer tools. It evaluates HTTPS status, mixed content, cookie policies, and permission configurations for a secure browsing score.\n\n## Goals\n- Provide actionable browser safety suggestions\n- Build intuitive security reports\n- Support non-technical users with guided remediation\n',
        techstack: ['HTML', 'CSS', 'JavaScript', 'DOM Manipulation', 'RESTful APIs'],
        source: ['src/index.html', 'src/styles.css', 'src/script.js'],
        screenshots: ['Audit summary panel', 'Security score details', 'Report export workflow']
    },
    {
        id: 'password-strength-leak-checker',
        title: 'Password Strength & Leak Checker',
        category: ['Cybersecurity', 'Web Development'],
        description: 'A secure credentials testing dashboard that validates password strength and checks breach exposure with a developer-friendly UI.',
        badge: 'Security · UX · Automation',
        tech: ['JavaScript', 'REST', 'HTML', 'CSS'],
        features: ['Password score calculator', 'Leak database validation', 'Responsive dashboard panel', 'Guidance & remediation steps'],
        stats: { 'Passwords Tested': '420+', 'Leak Hits': '12', 'Strength Score': '92%' },
        timeline: ['Concept', 'API integration', 'UX design', 'Strength engine', 'Review cycle'],
        github: 'https://github.com/SanduniRana/password-strength-checker',
        demo: 'https://example.com/password-checker',
        readme: '# Password Strength & Leak Checker\n\nThis project helps developers and security teams validate passwords against common weaknesses and exposed breach data. It combines strength scoring with leak detection to improve credential hygiene.',
        techstack: ['JavaScript', 'CSS', 'HTML', 'Secure hashing patterns'],
        source: ['src/index.html', 'src/styles.css', 'src/health-check.js'],
        screenshots: ['Strength meter', 'Leak status notice', 'Password recommendations']
    },
    {
        id: 'password-vault',
        title: 'Password Vault',
        category: ['Cybersecurity', 'Web Development'],
        description: 'A vault-style password manager prototype with secure storage and developer-grade visual structure.',
        badge: 'Security · Storage · UX',
        tech: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
        features: ['Encrypted password cards', 'Searchable vault', 'Secure entry form', 'Responsive interface'],
        stats: { 'Vault Items': '56', 'Categories': '8', 'Session Stability': '99%' },
        timeline: ['Architecture', 'Storage layer', 'Vault UX', 'Sync preview'],
        github: 'https://github.com/SanduniRana/password-vault',
        demo: 'https://example.com/password-vault',
        readme: '# Password Vault\n\nThis password manager experience simulates a secure developer vault for storing credentials and notes. It includes a polished interface and quick access UI for vault entries.',
        techstack: ['HTML', 'CSS', 'JavaScript', 'Secure patterns'],
        source: ['src/add_entry.html', 'src/vault-core.js', 'src/vault.html'],
        screenshots: ['Vault detail view', 'Add credential form', 'Secure note panel']
    },
    {
        id: 'cybersecurity-monitoring-dashboard',
        title: 'Cybersecurity Monitoring Dashboard',
        category: ['Cybersecurity', 'Business Intelligence'],
        description: 'An analytics dashboard that monitors threats, network signals, and incident patterns with a polished BI-style interface.',
        badge: 'Power BI · Security · Reporting',
        tech: ['Power BI', 'DAX', 'Data Modeling'],
        features: ['Threat heatmaps', 'Incident timelines', 'Security KPIs', 'Dashboard drill-downs'],
        stats: { 'Datasets': '3', 'KPIs': '14', 'Refresh Rate': 'Hourly' },
        timeline: ['Data modeling', 'Dashboard layout', 'KPI refinement', 'Storytelling'],
        github: 'https://github.com/SanduniRana/cybersecurity-dashboard',
        demo: 'https://example.com/cybersecurity-dashboard',
        readme: '# Cybersecurity Monitoring Dashboard\n\nThis solution visualizes enterprise threat metrics in a dashboard experience designed for security analysts and BI storytellers.',
        techstack: ['Power BI', 'Data Modeling', 'DAX'],
        source: ['Cybersecurity Monitoring Dashboard.pbix', 'Cybersecurity Dashboard Demo.mp4'],
        screenshots: ['Threat map', 'Incident KPI panel', 'Security event chart']
    },
    {
        id: 'sentiment-analysis-dashboard',
        title: 'Sentiment Analysis Dashboard',
        category: ['Data Science', 'Business Intelligence'],
        description: 'A sentiment analytics workspace that visualizes opinion trends, emotion scores, and topic sentiment across customer feedback.',
        badge: 'NLP · Visualization · BI',
        tech: ['Python', 'Power BI', 'Text Analytics'],
        features: ['Sentiment score overview', 'Topic clusters', 'Trend analysis', 'Interactive visuals'],
        stats: { 'Sources': '2', 'Sentences': '5k+', 'Insights': '35' },
        timeline: ['Text processing', 'Modeling', 'Dashboard build', 'Narrative design'],
        github: 'https://github.com/SanduniRana/sentiment-analysis',
        demo: 'https://example.com/sentiment-dashboard',
        readme: '# Sentiment Analysis Dashboard\n\nThis dashboard extracts sentiment and emotion data from customer text and presents insights in a visual analytics workspace.',
        techstack: ['Python', 'Power BI', 'Text Mining'],
        source: ['Sentiment Analysis Dashboard.png', 'sentiment_data.csv'],
        screenshots: ['Emotion map', 'Trend dashboard', 'Data summary cards']
    },
    {
        id: 'smart-city-intelligence',
        title: 'Smart City Intelligence & Predictive Analytics Platform',
        category: ['Data Analytics', 'Business Intelligence'],
        description: 'A city analytics platform that combines traffic, pollution, energy and complaint data into a unified intelligence dashboard.',
        badge: 'Urban Analytics · Power BI · Prediction',
        tech: ['Power BI', 'DAX', 'Data Modeling'],
        features: ['Smart city KPI panels', 'Predictive trend forecasts', 'Interactive maps', 'Performance benchmarks'],
        stats: { 'Metrics': '12', 'Sources': '4', 'Forecast Models': '3' },
        timeline: ['Data ingestion', 'Model design', 'Dashboard visualization', 'Performance tuning'],
        github: 'https://github.com/SanduniRana/smart-city-intelligence',
        demo: 'https://example.com/smart-city-analytics',
        readme: '# Smart City Intelligence Dashboard\n\nThis platform provides urban planners with predictive insights and visual analytics for traffic, pollution, and city services.',
        techstack: ['Power BI', 'DAX', 'Data Engineering'],
        source: ['Smart City Intelligence & Predictive Analytics.pbix', 'Smart City Dashboard Demo.mp4'],
        screenshots: ['City KPI board', 'Traffic heatmap', 'Forecast analytics']
    },
    {
        id: 'public-transport-performance',
        title: 'Public Transport Performance Analytics',
        category: ['Data Analytics', 'Business Intelligence'],
        description: 'A public transport intelligence dashboard tracking ridership, route performance, punctuality, and commuter experience data.',
        badge: 'Transit Analytics · BI · Reporting',
        tech: ['Power BI', 'DAX', 'Data Visualization'],
        features: ['Route performance metrics', 'Ridership trends', 'Delay analysis', 'Comparative benchmarks'],
        stats: { 'Routes': '18', 'Trips': '1200+', 'Reports': '24' },
        timeline: ['Data reduction', 'KPI design', 'Performance dashboard', 'Insight delivery'],
        github: 'https://github.com/SanduniRana/public-transport-analytics',
        demo: 'https://example.com/public-transport-analytics',
        readme: '# Public Transport Performance Analytics\n\nThe dashboard supports transport planners in understanding network efficiency and traveler behavior.',
        techstack: ['Power BI', 'Data Visualization', 'Reporting'],
        source: ['Public Transport Performance Analytics In Sri Lanka.png', 'Route_Congestion.csv'],
        screenshots: ['Transit KPI panel', 'Route comparisons', 'Punctuality dashboard']
    },
    {
        id: 'airline-operations-dashboard',
        title: 'Airline Operations & Passenger Experience Dashboard',
        category: ['Data Analytics', 'Business Intelligence'],
        description: 'An airline operations workspace for analyzing delays, passenger satisfaction, and route efficiency through interactive dashboards.',
        badge: 'Aviation Analytics · Power BI · Customer Experience',
        tech: ['Power BI', 'DAX', 'Analytics'],
        features: ['Delay analysis', 'Route performance', 'Passenger experience metrics', 'Operational KPI dashboards'],
        stats: { 'Flights': '8k+', 'Routes': '55', 'Satisfaction': '87%' },
        timeline: ['Concept', 'Data integration', 'Dashboard design', 'Review cycle'],
        github: 'https://github.com/SanduniRana/airline-operations-dashboard',
        demo: 'https://example.com/airline-operations-dashboard',
        readme: '# Airline Operations & Passenger Experience Dashboard\n\nThe dashboard offers airline management a modern workspace for operational and customer insight tracking.',
        techstack: ['Power BI', 'DAX', 'Analytics'],
        source: ['Airline Operations & Passenger Experience Dashboard.pbix', 'PassengerExperience.csv'],
        screenshots: ['Route efficiency view', 'Delay heatmap', 'Customer sentiment panel']
    },
    {
        id: 'music-analytics-dashboard',
        title: 'Music Analytics Dashboard',
        category: ['Data Analytics', 'Data Science'],
        description: 'A music analytics environment combining audio feature extraction, genre prediction, and mood analysis in a developer-inspired dashboard.',
        badge: 'Audio Analytics · Machine Learning · Power BI',
        tech: ['Python', 'Power BI', 'Audio Processing'],
        features: ['Genre modeling', 'Mood prediction', 'Audio feature visuals', 'Interactive dashboards'],
        stats: { 'Tracks': '100+', 'Genres': '12', 'Models': '3' },
        timeline: ['Feature extraction', 'Model training', 'Dashboard build', 'Validation'],
        github: 'https://github.com/SanduniRana/music-analytics-dashboard',
        demo: 'https://example.com/music-analytics-dashboard',
        readme: '# Music Analytics Dashboard\n\nAn analytics workspace for audio feature and mood insights, designed to feel like a data science code environment.',
        techstack: ['Python', 'Power BI', 'Audio Processing'],
        source: ['audio_ai_theme.json', 'genre_mood_training.csv'],
        screenshots: ['Feature extraction panel', 'Mood dashboard', 'Genre predictor visuals']
    },
    {
        id: 'inventory-management-dashboard',
        title: 'Inventory Management Dashboard',
        category: ['Data Analytics', 'Business Intelligence'],
        description: 'A supply chain analytics dashboard providing inventory visibility, stock health metrics, and restock alert analysis.',
        badge: 'Supply Chain · Power BI · BI',
        tech: ['Power BI', 'DAX', 'Excel'],
        features: ['Stock level KPIs', 'Reorder alerts', 'Supplier performance', 'Inventory growth trends'],
        stats: { 'Items': '420', 'Alerts': '34', 'Accuracy': '95%' },
        timeline: ['Dataset design', 'Dashboard layout', 'Alert logic', 'User testing'],
        github: 'https://github.com/SanduniRana/inventory-management-dashboard',
        demo: 'https://example.com/inventory-management-dashboard',
        readme: '# Inventory Management Dashboard\n\nA dashboard workspace for inventory analytics that highlights stock performance and supplier trends.',
        techstack: ['Power BI', 'DAX', 'Excel'],
        source: ['inventory_management_dashboard.xlsx', 'inventory_management_dashboard.pbix'],
        screenshots: ['Stock health cards', 'Trend dashboard', 'Supplier metrics']
    },
    {
        id: 'cryptocurrency-market-analytics',
        title: 'Cryptocurrency Market Analytics Dashboard',
        category: ['Data Analytics', 'Data Science'],
        description: 'A crypto analytics environment that tracks market trends, price volatility, and trading signals with data-driven visuals.',
        badge: 'Crypto Analytics · Visualization · Dashboard',
        tech: ['JavaScript', 'Data Visualization', 'CSV'],
        features: ['Market snapshot', 'Volume and volatility charts', 'Portfolio heatmaps', 'Trend alerts'],
        stats: { 'Coins': '120', 'Signals': '18', 'Coverage': '24h' },
        timeline: ['Dataset load', 'Chart design', 'Signal rules', 'Dashboard polish'],
        github: 'https://github.com/SanduniRana/crypto-market-analytics',
        demo: 'https://example.com/crypto-market-analytics',
        readme: '# Cryptocurrency Market Analytics Dashboard\n\nThis analytics project visualizes crypto market data and helps identify trends in price, volume, and momentum.',
        techstack: ['JavaScript', 'Data Visualization', 'CSV'],
        source: ['ID,Symbol,Name,Price,MarketCap,Volu.csv', 'Crypto_Dashboard.png'],
        screenshots: ['Market trend graph', 'Coin performance panel', 'Volume heatmap']
    },
    {
        id: 'finsight-customer-performance',
        title: 'FinSight – Customer Base Performance Analytics Dashboard',
        category: ['Data Analytics', 'Business Intelligence'],
        description: 'A customer analytics dashboard for measuring financial service performance, customer segmentation, and retention insights.',
        badge: 'Fintech · BI · Customer Analytics',
        tech: ['Power BI', 'Dashboard Design', 'Analytics'],
        features: ['Customer segmentation', 'Revenue performance', 'Engagement insights', 'Executive summary panels'],
        stats: { 'Segments': '5', 'Reports': '12', 'Retention': '83%' },
        timeline: ['Customer research', 'Dashboard design', 'Data validation', 'Executive review'],
        github: 'https://github.com/SanduniRana/finsight-dashboard',
        demo: 'https://example.com/finsight-dashboard',
        readme: '# FinSight – Customer Base Performance Analytics Dashboard\n\nThe dashboard provides business leaders with customer performance metrics and revenue insights.',
        techstack: ['Power BI', 'Dashboard Design', 'Analytics'],
        source: ['Sanduni_Ranawake_FinSightAssessment_Dashboard.png', 'Sanduni_Ranawake_FinSightAssessment_Presentation.pdf'],
        screenshots: ['Customer performance board', 'Retention chart', 'Revenue trend panel']
    },
    {
        id: 'intelligent-invoice-processing',
        title: 'Intelligent Invoice Processing Pipeline',
        category: ['Automation', 'Business Intelligence'],
        description: 'An intelligent pipeline that automates invoice extraction, validation, and reporting using OCR and workflow orchestration.',
        badge: 'Automation · OCR · Workflow',
        tech: ['Python', 'OCR', 'Flask', 'Automation'],
        features: ['Document extraction', 'Invoice validation', 'Workflow dashboard', 'Sample invoice preview'],
        stats: { 'Invoices': '320', 'Automated Steps': '18', 'Accuracy': '94%' },
        timeline: ['Pipeline design', 'OCR integration', 'Dashboard setup', 'Validation'],
        github: 'https://github.com/SanduniRana/intelligent-invoice-pipeline',
        demo: 'https://example.com/invoice-pipeline',
        readme: '# Intelligent Invoice Processing Pipeline\n\nThis project automates invoice ingestion and validation, producing clean reports and dashboards from scanned documents.',
        techstack: ['Python', 'OCR', 'Flask', 'Automation'],
        source: ['run_pipeline.py', 'requirements.txt', 'dashboard/app.py'],
        screenshots: ['Invoice extraction view', 'Data validation panel', 'Automation workflow']
    }
];
const categories = ['All', 'Data Analytics', 'Data Science', 'Business Intelligence', 'Automation', 'Cybersecurity', 'Web Development'];
let activeCategory = 'All';
let activeProject = projects[0].id;
let activeTab = 'README.md';
function buildCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    container.innerHTML = '';
    categories.forEach(label => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'filter-pill' + (label === activeCategory ? ' active' : '');
        pill.textContent = label;
        pill.addEventListener('click', () => {
            activeCategory = label;
            buildCategoryFilters();
            buildProjectTree();
        });
        container.appendChild(pill);
    });
}
function filterProjects(search = '') {
    const normalized = search.trim().toLowerCase();
    return projects.filter(project => {
        const categoryMatch = activeCategory === 'All' || project.category.includes(activeCategory);
        const searchMatch = normalized.length === 0 || [project.title, project.description, project.badge].some(field => field.toLowerCase().includes(normalized));
        return categoryMatch && searchMatch;
    });
}
function buildProjectTree() {
    const tree = document.getElementById('projectTree');
    const search = document.getElementById('searchInput').value;
    const visibleProjects = filterProjects(search);
    tree.innerHTML = '';
    visibleProjects.forEach(project => {
        const folder = document.createElement('div');
        folder.className = 'explorer-folder';
        const header = document.createElement('button');
        header.type = 'button';
        header.className = 'folder-header';
        header.innerHTML = `<div class=\"folder-title\"><i class=\"ph ph-folder-open\"></i><strong>${project.title}</strong></div><span class=\"folder-meta\">${project.category.join(', ')}</span>`;
        header.addEventListener('click', () => {
            activeProject = project.id;
            activeTab = 'README.md';
            buildProjectTree();
            selectProject(project.id);
        });
        const body = document.createElement('div');
        body.className = 'folder-body' + (project.id === activeProject ? ' active' : '');
        const fileNames = ['README.md', 'Overview.md', 'TechStack.json', 'Features.md', 'Screenshots/', 'Demo.mp4', 'SourceCode/'];
        fileNames.forEach(name => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'file-item' + (activeProject === project.id && activeTab === name ? ' active' : '');
            item.innerHTML = `<span>${name}</span><i class=\"ph ph-caret-right\"></i>`;
            item.addEventListener('click', () => {
                activeProject = project.id;
                activeTab = name;
                selectProject(project.id, name);
                buildProjectTree();
            });
            body.appendChild(item);
        });
        folder.appendChild(header);
        folder.appendChild(body);
        tree.appendChild(folder);
    });
    if (visibleProjects.length === 0) {
        tree.innerHTML = '<p class=\"no-results\">No projects match the current filter or search.</p>';
    }
}
function renderTabs() {
    const tabContainer = document.getElementById('tabBar');
    const tabs = ['README.md', 'Features.md', 'TechStack.json'];
    tabContainer.innerHTML = '';
    tabs.forEach(tab => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'editor-tab' + (activeTab === tab ? ' active' : '');
        button.textContent = tab;
        button.addEventListener('click', () => {
            activeTab = tab;
            selectProject(activeProject, tab);
            renderTabs();
            buildProjectTree();
        });
        tabContainer.appendChild(button);
    });
}
function parseMarkdown(markdown) {
    return markdown
        .replace(/\n\n/g, '<<PARA>>')
        .split('<<PARA>>')
        .map(block => {
            if (block.startsWith('# ')) return `<h3>${block.replace('# ', '')}</h3>`;
            if (block.startsWith('## ')) return `<h4>${block.replace('## ', '')}</h4>`;
            if (block.startsWith('- ')) return `<ul>${block.split('\n').map(line => `<li>${line.replace('- ', '')}</li>`).join('')}</ul>`;
            return `<p>${block}</p>`;
        }).join('');
}
function selectProject(projectId, fileName = 'README.md') {
    const project = projects.find(item => item.id === projectId) || projects[0];
    activeProject = project.id;
    activeTab = fileName;
    renderTabs();
    const projectTitle = document.getElementById('projectTitle');
    projectTitle.textContent = project.title;
    document.getElementById('filePathLabel').textContent = `Workspace / ${activeTab}`;
    document.getElementById('githubBtn').onclick = () => window.open(project.github, '_blank');
    document.getElementById('openFileBtn').onclick = () => window.open(project.demo, '_blank');
    const projectSummary = document.getElementById('projectSummary');
    projectSummary.innerHTML = `
        <div class=\"panel-title\"><span>Project Summary</span></div>
        <h3 class=\"project-summary-title\">${project.title}</h3>
        <p>${project.description}</p>
        <div class=\"badge-row\">${project.badge}</div>
        <div class=\"tag-row\">${project.tech.map(tag => `<span class=\"tag-pill\">${tag}</span>`).join('')}</div>
    `;
    const statsPanel = document.getElementById('projectStats');
    statsPanel.innerHTML = `<div class=\"panel-title\"><span>Project Statistics</span></div>${Object.entries(project.stats).map(([label, value]) => `
        <div class=\"stat-card\"><strong>${value}</strong><span>${label}</span></div>
    `).join('')}`;
    const timelinePanel = document.getElementById('projectTimeline');
    timelinePanel.innerHTML = `<div class=\"panel-title\"><span>Development Timeline</span></div>${project.timeline.map(step => `<div class=\"timeline-item\"><strong>${step}</strong></div>`).join('')}`;
    const preview = document.getElementById('markdownPreview');
    if (activeTab === 'README.md') {
        preview.innerHTML = parseMarkdown(project.readme);
    } else if (activeTab === 'Features.md') {
        preview.innerHTML = `<h4>Key Features</h4>${parseMarkdown(`## Features\n${project.features.map(item => `- ${item}`).join('\n')}`)}`;
    } else if (activeTab === 'TechStack.json') {
        preview.innerHTML = `<h4>Technology Stack</h4><pre>${JSON.stringify(project.techstack, null, 2)}</pre>`;
    } else {
        preview.innerHTML = parseMarkdown(project.readme);
    }
}
function buildContributionGraph() {
    const container = document.getElementById('contributionGraph');
    container.innerHTML = '';
    for (let i = 0; i < 84; i += 1) {
        const square = document.createElement('div');
        square.className = 'contribution-square';
        const shade = ['#11161d', '#0b1928', '#0e2436', '#0f3150', '#10718f'][Math.floor(Math.random() * 5)];
        square.style.background = shade;
        container.appendChild(square);
    }
}
async function loadContactDetails() {
    try {
        const response = await fetch('contact.json');
        const data = await response.json();
        const list = document.getElementById('contactDetails');
        list.innerHTML = `
            <li><span>Email</span><strong>${data.email}</strong></li>
            <li><span>Phone</span><strong>${data.phone}</strong></li>
            <li><span>Location</span><strong>${data.location}</strong></li>
            <li><span>LinkedIn</span><strong><a href=\"${data.linkedin}\" target=\"_blank\">Profile</a></strong></li>
        `;
    } catch (error) {
        console.error('Unable to load contact details', error);
    }
}
function init() {
    buildCategoryFilters();
    buildProjectTree();
    renderTabs();
    selectProject(activeProject);
    buildContributionGraph();
    loadContactDetails();
    document.getElementById('searchInput').addEventListener('input', () => {
        buildProjectTree();
    });
    document.getElementById('searchClear').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        buildProjectTree();
    });
}
window.addEventListener('DOMContentLoaded', init);
