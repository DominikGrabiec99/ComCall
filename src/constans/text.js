import * as ROUTES from './routes';

export const about = [
  {
    id: 1,
    image: '/images/about/meritum.png',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque deleniti, temporibus nulla praesentium soluta illo vero ducimus vel officia repellendus quos minus? Cum quae sit ut debitis delectus officia reiciendis.',
    title: 'Meritum'
  },
  {
    id: 2,
    image: '/images/about/comcall.png',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque deleniti, temporibus nulla praesentium soluta illo vero ducimus vel officia repellendus quos minus? Cum quae sit ut debitis delectus officia reiciendis.',
    title: 'ComCall'
  }
];

export const circleBox = [
  {
    id: 1,
    class: 'small-circle-top',
    icon: '/images/icons/online-learning.png',
    title: 'Learning online',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/learning-online.png'
  },
  {
    id: 2,
    class: 'small-circle-bottom',
    icon: '/images/icons/chat.png',
    title: 'Chat',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/chat.png'
  },
  {
    id: 3,
    class: 'small-circle-left',
    icon: '/images/icons/businessmen.png',
    title: 'Business call',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/buisness-call.png'
  },
  {
    id: 4,
    class: 'small-circle-right',
    icon: '/images/icons/google-docs.png',
    title: 'Documents',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/documents.png'
  },
  {
    id: 5,
    class: 'small-circle-right-bottom',
    icon: '/images/icons/phone-call.png',
    title: 'Phone Call',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/phone-call.png'
  },
  {
    id: 6,
    class: 'small-circle-right-top',
    icon: '/images/icons/rooms.png',
    title: 'Rooms',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/rooms.png'
  },
  {
    id: 7,
    class: 'small-circle-left-bottom',
    icon: '/images/icons/webinar.png',
    title: 'Webinars',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
    images: '/images/circle-box/buisness-call.png'
  },
  {
    id: 8,
    class: 'small-circle-left-top',
    icon: '/images/icons/timetable.png',
    title: 'Calendar',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem quaerat perspiciatis optio quibusdam.',
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
    to: 'home',
    text: 'Home',
    icon: 'home'
  },
  {
    id: 2,
    to: 'chat',
    text: 'Chat',
    icon: 'question_answer'
  },
  {
    id: 3,
    to: 'calendar',
    text: 'Calendar',
    icon: 'event'
  },
  {
    id: 4,
    to: 'document',
    text: 'Documents',
    icon: 'description'
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
