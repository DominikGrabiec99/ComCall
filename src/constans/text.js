import * as ROUTES from './routes';

export const about = [
  {
    id: 1,
    image: '/images/about/meritum.png',
    text: 'Meretium training center conducts comprehensive training in many areas, such as English, mathematics and at many levels of advancement. If you want to expand your knowledge, Meritum will be the perfect solution for you.',
    title: 'Meritum'
  },
  {
    id: 2,
    image: '/images/about/comcall.png',
    text: 'CamCall specializes in providing professional communication solutions for training companies and their users. We strive to ensure that our solutions are of the best quality and adapt to the needs of our clients.',
    title: 'ComCall'
  }
];

export const circleBox = [
  {
    id: 1,
    class: 'small-circle-top',
    icon: '/images/icons/online-learning.png',
    title: 'Learning online',
    text: 'Take part in live training. Ask questions to the facilitator and communicate with other participants in real time',
    images: '/images/circle-box/learning-online.png'
  },
  {
    id: 2,
    class: 'small-circle-bottom',
    icon: '/images/icons/chat.png',
    title: 'Chat',
    text: 'Communicate with course participants and teachers via text messages. You can do this at any time and check the activity of other people you want to write to.',
    images: '/images/circle-box/chat.png'
  },
  {
    id: 3,
    class: 'small-circle-left',
    icon: '/images/icons/businessmen.png',
    title: 'Support call',
    text: 'Conducts talks with our specialists and technical support. Stay up to date with updates, news and solve technical problems with us.',
    images: '/images/circle-box/buisness-call.png'
  },
  {
    id: 4,
    class: 'small-circle-right',
    icon: '/images/icons/google-docs.png',
    title: 'Documents',
    text: "Add, edit, share your files. Whether it's homework or notes. We also give you the option of sharing a document",
    images: '/images/circle-box/documents.png'
  },
  {
    id: 5,
    class: 'small-circle-right-bottom',
    icon: '/images/icons/phone-call.png',
    title: 'Phone Call',
    text: 'Make phone calls with participants or presenter at any time. During calls, you can share your screen for consultation.',
    images: '/images/circle-box/phone-call.png'
  },
  {
    id: 6,
    class: 'small-circle-right-top',
    icon: '/images/icons/rooms.png',
    title: 'Rooms',
    text: 'Meet in separate rooms with participants. Work together and make notes together, you will boast later in the forum when you return to the main room.',
    images: '/images/circle-box/rooms.png'
  },
  {
    id: 7,
    class: 'small-circle-left-bottom',
    icon: '/images/icons/webinar.png',
    title: 'Webinars',
    text: 'Take part in live and recorded webinars on our website. Learn with us new online learning opportunities and interesting facts from various areas.',
    images: '/images/circle-box/buisness-call.png'
  },
  {
    id: 8,
    class: 'small-circle-left-top',
    icon: '/images/icons/timetable.png',
    title: 'Calendar',
    text: 'Create, add and edit your daily schedule and activities thanks to the calendar. You can share it with others so they can see when you are free. The calendar will also allow you to keep track of your homework.',
    images: '/images/circle-box/calendar.png'
  }
];

export const socialMedia = [
  {
    id: 1,
    icon: '/images/media-icons/facebook.png',
    url: '//facebook.com'
  },
  {
    id: 2,
    icon: '/images/media-icons/instagram.png',
    url: '//instagram.com'
  },
  {
    id: 3,
    icon: '/images/media-icons/twitter.png',
    url: '//twitter.com'
  }
];

export const footerText = [
  {
    id: 1,
    name: 'About',
    elemts: [
      {
        idElement: 1,
        name: 'Our Team',
        url: '#'
      },
      {
        idElement: 2,
        name: 'Partners',
        url: '#'
      },
      {
        idElement: 3,
        name: 'FAQ',
        url: '#'
      },
      {
        idElement: 4,
        name: 'Support',
        url: '#'
      }
    ]
  },
  {
    id: 2,
    name: 'Product',
    elemts: [
      {
        idElement: 1,
        name: '',
        url: '#'
      },
      {
        idElement: 2,
        name: 'Features',
        url: '#'
      },
      {
        idElement: 3,
        name: '',
        url: '#'
      }
    ]
  },
  {
    id: 3,
    name: 'Get Help',
    elemts: [
      {
        idElement: 1,
        name: 'Help Center',
        url: '#'
      },
      {
        idElement: 2,
        name: 'Contact Us',
        url: '#'
      },
      {
        idElement: 3,
        name: 'Privacy Policy',
        url: '#'
      },
      {
        idElement: 4,
        name: 'Cookies',
        url: '#'
      },
      {
        idElement: 5,
        name: 'Teams',
        url: '#'
      },
      {
        idElement: 6,
        name: 'Login',
        url: ROUTES.LOGIN
      }
    ]
  }
];
export const sidebarOption = [
  {
    id: 1,
    to: 'panel/home',
    text: 'Home',
    icon: 'home'
  },
  {
    id: 2,
    to: 'panel/chat',
    text: 'Chat',
    icon: 'question_answer'
  },
  {
    id: 3,
    to: 'panel/calendar',
    text: 'Calendar',
    icon: 'event'
  },
  {
    id: 4,
    to: 'panel/listTasks',
    text: 'Documents',
    icon: 'description'
  }
];

export const sidebarOptionAdmin = [
  {
    id: 1,
    to: 'admin/home',
    text: 'Home',
    icon: 'home'
  },
  {
    id: 2,
    to: 'admin/courses',
    text: 'Courses',
    icon: 'library_books'
  },
  {
    id: 3,
    to: 'admin/users',
    text: 'Users',
    icon: 'people'
  },
  {
    id: 4,
    to: 'admin/calendar',
    text: 'Calendar',
    icon: 'event'
  }
];

export const labeClasses = [
  'label-indigo',
  'label-orange',
  'label-green',
  'label-blue',
  'label-red',
  'label-purple'
];
