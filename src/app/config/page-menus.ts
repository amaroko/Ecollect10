const remindersno = JSON.parse(localStorage.getItem('remindersno')) || 0;
// user permissions
const userperm = JSON.parse(localStorage.getItem('userpermission'));
const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

const Home = {
  icon: 'fa fa-th-large',
  title: 'Home',
  url: '/home',
};

const Schedules = {
  icon: 'fas fa-bell',
  title: 'Reminders',
  url: '/reminders',
  submenu: [
    {
      title: 'New Reminder',
      url: '/reminders/newreminders,
    },
    {
      title: 'All Reminders',
      url: '/reminders/allreminders,
    ,
  ,
};

const Guarantors = {
  icon: 'fas fa-users',
  title: 'Guarantors',
  url: '/guarantors/list'
};

const Manuals = {
  icon: 'fas fa-book',
  title: 'Manuals and scripts',
  url: '/manuals/all'
};

/*const Dashboard = {
    'title': 'Dashboard',
    'url': '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            'title': 'Dashboards',
            'url': '/reports/dashboards'
        }
    ]
};*/

const Dashboard = {
  icon: 'fas fa-desktop',
  title: 'Dashboards',
  url: '/reports/dashboards'
};

const Reports = {
  icon: 'fas fa-chart-bar',
  title: 'Reports',
  url: '/reports/allreports'
};

const Relegate = {
  icon: 'fas fa-hand-point-down',
  title: 'Due for Relegation',
  url: '/teamleader/accounts'
};

const Allocations = {
  icon: 'fas fa-sitemap',
  title: 'Allocation',
  url: '/allocations',
  caret: 'true',
  submenu: [
    {
      title: 'Collection',
      url: '/allocations/collections'
    },
    {
      title: 'Remedial',
      url: '/allocations/remedial'
    },
    {
      title: 'Credit cards',
      url: '/allocations/creditcards'
    },
    {
      title: 'Pre Delq',
      url: '/allocations/predelq'
    }
  ],
};

/*const Reports = {
    'title': 'Reports',
    'url': '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            'title': 'Reports',
            'url': '/reports/allreports'
        }
    ]
};*/

const DashboardAdmin = {
  title: 'Dashboard',
  url: '/dashboard',
  icon: 'fas fa-tachometer-alt',
  submenu: [
    {
      title: 'Performance Metrics',
      url: '/dashboard/v3'
    }
  ]
};

const Letters = {
  title: 'Demands Letters',
  url: '/letters',
  icon: 'fas fa-stick-note',
  caret: 'true',
  submenu: [
    /*{
        'title': 'Letters Due',
        'url': '/demand/demands',
        alert: '0',
        label: 'badge badge-danger'
    },
    {
        'title': 'Sent History',
        'url': '/demand/demandhistory',
        alert: '0',
        label: 'badge badge-danger'
    }*/
    {
      title: 'Guarantors',
      url: '/guarantors',
      caret: 'true',
      submenu: [
        {
          title: 'list',
          url: '/guarantors/list'
        },
        {
          title: 'New',
          url: '/guarantors/newguarantor'
        }
      ]
    },
    {
      title: 'Loans',
      url: '/demand',
      caret: 'true',
      submenu: [
        {
          title: 'Letters Due',
          url: '/demand/demands'
        },
        {
          title: 'Sent History',
          url: '/demand/demandhistory'
        }
      ]
    },
    {
      title: 'Credit Cards',
      url: '/letters',
      caret: 'true',
      submenu: [
        {
          title: 'Demands due',
          url: '/creditcards/creditcarddemands/demandsdue'
        },
        {
          title: 'Demands history',
          url: '/creditcards/creditcarddemands/demandshistory'
        }
      ]
    },
  ],
  /* ,
   'alert': 'new',
   'label': 'badge badge-danger'*/
};

const Letterscc = {
  title: 'Demands C-Cards',
  url: '/letters',
  icon: 'fas fa-sticky-notenote',
  caret: 'true',
  submenu: [
    {
      title: 'Demands due',
      url: '/creditcards/creditcarddemands/demandsdue'
    },
    {
      title: 'Demands history',
      url: '/creditcards/creditcarddemands/demandshistory'
    }
  ]
  /* ,
   'alert': '0',
   'label': 'badge badge-danger'*/
};

const Administration = {
  title: 'Administration',
  url: '/admin',
  icon: 'fas fa-cogs',
  caret: 'true',
  submenu: [
    {
      title: 'Users',
      url: '/users/search'
    },
    {
      title: 'Roles',
      url: '/users/roles'
    },
    {
      title: 'Approvals',
      url: '/users/approvals'
    },
    {
      title: 'Branches',
      url: '/users/branches'
    }
  ],
};

const Forms = {
  title: 'Forms',
  url: '/forms',
  icon: 'fas fa-sticky-note',
  caret: 'true',
  submenu: [
    {
      title: 'Standard',
      url: '/forms/standard'
    },
    {
      title: 'Extended',
      url: '/forms/extended'
    },
    {
      title: 'Validation',
      url: '/forms/validation'
    },
    {
      title: 'Upload',
      url: '/forms/upload'
    },
    {
      title: 'Image Crop',
      url: '/forms/cropper'
    }
  ],
};

const Work = {
  title: 'Loans Queue',
  url: '/work',
  icon: 'fas fa-briefcase',
  caret: 'true',
  submenu: [
    {
      title: 'Loan arrears(ALL)',
      url: '/work/viewall'
      /*'alert': '23',
      'label': 'badge badge-warning'*/
    },
    {
      title: 'My allocations',
      url: '/work/myallocations'
    },
    {
      title: 'My worklist',
      url: '/work/myworklist'
    },
    {
      title: 'Broken PTPs',
      url: '/work/ptps'
    },
    {
      title: 'Trsactn acc with Funds',
      url: '/work/withfunds'
    },
    {
      title: 'View all Loans',
      url: '/work/allloans'
    },
    {
      title: 'No Credit buildup',
      url: '/watch/nocredit'
    },
    {
      title: 'Credit buildup',
      url: '/watch/creditbuildup'
    }
  ],
};

const Work_cc = {
  title: 'Credit Cards Queue',
  url: '/creditcards',
  icon: 'fas fa-credit-card',
  caret: 'true',
  submenu: [
    {
      title: 'Card arrears(ALL)',
      url: '/creditcards/viewall'
      /*'alert': '23',
      'label': 'badge badge-warning'*/
    },
    {
      title: 'My allocations',
      url: '/creditcards/myallocations'
    },
    {
      title: 'My Worklist',
      url: '/creditcards/myworklist'
    },
    {
      title: 'Cards Cr/Zero Bal',
      url: '/creditcards/zerobalance'
    },
    {
      title: 'View all Cards',
      url: '/creditcards/allcards'
    }
  ],
};

const Remedial = {
  title: 'Remedial',
  url: '/remedial',
  icon: 'fas fa-paw',
  caret: 'true',
  submenu: [
    {
      title: 'Loan arrears(ALL)',
      url: '/work/viewall'
      /*'alert': '23',
      'label': 'badge badge-warning'*/
    },
    {
      title: 'My allocations',
      url: '/work/myallocations'
    },
    {
      title: 'My worklist',
      url: '/work/myworklist'
    },
    {
      title: 'Todays',
      url: '/work/todays'
    },
    {
      title: 'Broken PTPs',
      url: '/work/ptps'
    },
    {
      title: 'Tr accounts with Funds',
      url: '/work/withfunds'
    },
    {
      title: 'View all Loans',
      url: '/work/allloans'
    }
  ],
};

const serviceproviders = {
  title: 'Service Providers',
  url: '/serviceproviders',
  icon: 'fas fa-handshake',
  caret: 'true',
  submenu: [
    {
      title: 'Debt Collectors',
      url: '/debtcollectors/allcases'
    },
    {
      title: 'Marketers',
      url: '/marketors/allcases'
    },
    {
      title: 'Auctioneers',
      url: '/auctioneers/allcases'
    },
    {
      title: 'Writeoffs',
      url: '/writeoffs/allcases'
    },
    {
      title: 'Investigators',
      url: '/investigators/allcases'
    },
    {
      title: 'Invoices',
      url: '/invoices/allcases'
    },
    {
      title: 'Valuations',
      url: '/valuers/allcases'
    }
  ],
};

const mcoopcash = {
  title: 'E-Credit',
  url: '/mcoopcash',
  icon: 'fas fa-building',
  caret: 'true',
  submenu: [
    {
      title: 'E-Credit arrears',
      url: '/mcoopcash/viewall'
    },
    {
      title: 'E-Credit All',
      url: '/mcoopcash/allecredit'
    }
  ]
};

const assetfinance = {
  title: 'Asset Finance & IPF',
  url: '/assetfinance',
  icon: 'fas fa-certificate',
  caret: 'true',
  submenu: [
    {
      title: 'Asset Finance',
      url: '/assetfinance/assetf'
    },
    {
      title: 'IPF',
      url: '/assetfinance/ipf'
    },
    {
      title: 'Insurance Companies',
      url: '/configurations/insurance'
    }
  ],
};

const Demandletters = {
  title: 'Demand Letters',
  url: '/letters',
  icon: 'fas fa-envelope',
  caret: 'true',
  submenu: [
    {
      title: 'Demand settings',
      url: '/letters/settings'
    },
    {
      title: 'Demand automation',
      url: '/letters/automation'
    },
    {
      title: 'Customer suspensions',
      url: '/letters/customersuspensions'
    }
  ],
};

const SMS = {
  title: 'SMS',
  url: '/configurations/sms',
  icon: 'fab fa-facebook-messenger'
};

const SP = {
  title: 'Service Providers',
  url: '/configurations/sp',
  icon: 'fas fa-snowflake'
};

const INSURANCE = {
  title: 'Insurance Co',
  url: '/configurations/insurance',
  icon: 'fas fa-id-badge'
};

const AccountPlans = {
  title: 'Account Plans',
  url: '/configurations',
  icon: 'fas fa-tasks',
  caret: 'true',
  submenu: [
    {
      title: 'Plans',
      url: '/configurations/accplans'
    },
    {
      title: 'Plan actions',
      url: '/configurations/planactions'
    },
    {
      title: 'Plan-Memo setup',
      url: '/configurations/planmemos'
    }
  ],
};

const headingMain = {
  title: 'Main Navigation',
  heading: true
};

const headingComponents = {
  title: 'Work Queue',
  heading: true
};

const headingDocumentations = {
  title: 'Documentation and Manuals',
  heading: true
};

const headingConfigurations = {
  title: 'Configurations',
  heading: true
};
const headingReports = {
  title: 'Reports',
  heading: true
};

const headingLetters = {
  title: 'Demand Letters',
  heading: true
};

const headingRelegate = {
  title: 'Team Leader',
  heading: true
};

let menuitems: any[];

const user_mgmt_menu = [headingMain, Home, DashboardAdmin, Administration];

const collection_menu = [
  headingMain,
  Home,
  Schedules,
  headingComponents,
  Work,
  Work_cc,
  // Predelq,
  mcoopcash,
  assetfinance,
  serviceproviders,
  headingLetters,
  Letters,
  headingReports,
  Dashboard,
  Reports,
  headingDocumentations,
  Manuals
];

const creditcards_menu = [
  headingMain,
  Home,
  Schedules,
  headingComponents,
  Work_cc,
  Work,
  // Predelq,
  mcoopcash,
  serviceproviders,
  headingLetters,
  Letters,
  headingReports,
  Dashboard,
  Reports,
  headingDocumentations,
  Manuals
];

const remedial_menu = [
  headingMain,
  Home,
  Schedules,
  headingComponents,
  Remedial,
  Work_cc,
  // Predelq,
  mcoopcash,
  assetfinance,
  serviceproviders,
  headingLetters,
  Letters,
  headingReports,
  Dashboard,
  Reports,
  headingDocumentations,
  Manuals
];

const teamleader_menu = [
  headingMain,
  Home,
  Schedules,
  headingComponents,
  Work,
  Work_cc,
  // Predelq,
  mcoopcash,
  assetfinance,
  serviceproviders,
  headingLetters,
  Letters,
  headingReports,
  Dashboard,
  Reports,
  headingRelegate,
  Relegate,
  Allocations,
  headingConfigurations,
  Demandletters,
  SMS,
  AccountPlans,
  SP,
  headingDocumentations,
  Manuals
];

// console.log('menu role==>', currentUser.role);
if (currentUser !== null) {
  if (currentUser.ROLE === 'admin') {
    menuitems = user_mgmt_menu;
  } else if (currentUser.ROLE === 'remedial') {
    menuitems = remedial_menu;
  } else if (currentUser.ROLE === 'creditcards') {
    menuitems = creditcards_menu;
  } else if (currentUser.ROLE === 'teamleader') {
    menuitems = teamleader_menu;
  } else if (currentUser.ROLE === 'telecollector') {
    menuitems = collection_menu;
  } else {
    menuitems = collection_menu;
  }
} else {
  menuitems = collection_menu;
}

export const menu = menuitems;
