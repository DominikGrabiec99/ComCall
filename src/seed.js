/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: '1',
      fullName: 'Dominik Grabiec',
      emailAddress: 'dominik.grabiec@testmail.pl',
      courses: [],
      isAdmin: true,
      dateCreated: Date.now()
    },
    {
      userId: '2',
      fullName: 'Adam Rozgwiazda',
      emailAddress: 'adam.rozgwiazda@testmail.pl',
      courses: ['5', '8'],
      isAdmin: false,
      dateCreated: Date.now()
    },
    {
      userId: '3',
      fullName: 'Amelia Wąska',
      emailAddress: 'amelia.waska@testmail.pl',
      courses: ['1', '2', '3'],
      isAdmin: false,
      dateCreated: Date.now()
    },
    {
      userId: '4',
      fullName: 'Zygmunt Wielki',
      emailAddress: 'zygmunt.wielki@testmail.pl',
      courses: ['4', '7'],
      isAdmin: false,
      dateCreated: Date.now()
    },
    {
      userId: '5',
      fullName: 'Michał Sum',
      emailAddress: 'michal.sum@testmail.pl',
      courses: ['12'],
      isAdmin: false,
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  const teachers = [
    {
      teacherId: '1',
      fullName: 'Adam Szybki',
      emailAddress: 'adam.szybki@testmail.pl',
      courses: ['2', '5'],
      dateCreated: Date.now()
    },
    {
      teacherId: '2',
      fullName: 'Mikołaj Wolny',
      emailAddress: 'mikolaj.wolny@testmail.pl',
      courses: ['3', '6', '9'],
      dateCreated: Date.now()
    },
    {
      teacherId: '3',
      fullName: 'Michał Prosty',
      emailAddress: 'michal.prosty@testmail.pl',
      courses: ['1', '4'],
      dateCreated: Date.now()
    },
    {
      teacherId: '4',
      fullName: 'Agnieszka Miła',
      emailAddress: 'agnieszka.miła@testmail.pl',
      courses: ['7'],
      dateCreated: Date.now()
    },
    {
      teacherId: '5',
      fullName: 'Rozalia Cicha',
      emailAddress: 'rozalia.cicha@testmail.pl',
      courses: ['8'],
      dateCreated: Date.now()
    },
    {
      teacherId: '6',
      fullName: 'Julia Krótka',
      emailAddress: 'Julia.krótka@testmail.pl',
      courses: ['11', '13'],
      dateCreated: Date.now()
    },
    {
      teacherId: '7',
      fullName: 'Paweł Cienki',
      emailAddress: 'pawel.cienki@testmail.pl',
      courses: ['10', '12'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < teachers.length; k++) {
    firebase.firestore().collection('teachers').add(teachers[k]);
  }

  const courses = [
    {
      courseId: '1',
      name: 'j.polski ósmoklasista',
      subject: 'polski',
      level: 'ósma klasa',
      image: '/images/courses/polish.jpg',
      day: 'wtorek',
      time: 18,
      maxUsers: 10,
      users: ['3'],
      teacher: '3',
      dateCreated: Date.now()
    },
    {
      courseId: '2',
      name: 'matematyka ósmoklasista',
      subject: 'matematyka',
      level: 'ósmoklasista',
      image: '/images/courses/math.jpg',
      day: 'niedziela',
      time: 12,
      maxUsers: 8,
      users: ['3'],
      teacher: '1',
      dateCreated: Date.now()
    },
    {
      courseId: '3',
      name: 'j.angielski ósmoklasista',
      subject: 'angielski',
      level: 'ósmoklasista',
      image: '/images/courses/english.jpg',
      day: 'czwartek',
      time: 17,
      maxUsers: 13,
      users: ['3'],
      teacher: '2',
      dateCreated: Date.now()
    },
    {
      courseId: '4',
      name: 'j.polski matura podstawowa',
      subject: 'polski',
      level: 'matura podstawowa',
      image: '/images/courses/polish.jpg',
      day: 'czwartek',
      time: 18,
      maxUsers: 10,
      users: ['4'],
      teacher: '3',
      dateCreated: Date.now()
    },
    {
      coursesId: '5',
      name: 'matematyka matura podstawowa',
      subject: 'matematyka',
      level: 'matura podstawowa',
      image: '/images/courses/math.jpg',
      day: 'sobota',
      time: 12,
      maxUsers: 15,
      users: ['2'],
      teacher: '1',
      dateCreated: Date.now()
    },
    {
      courseId: '6',
      name: 'j.angielski matura podstawowa',
      subject: 'angielski',
      level: 'matura podstawowa',
      image: '/images/courses/english.jpg',
      day: 'środa',
      time: 17,
      maxUsers: 5,
      users: [],
      teacher: '2',
      dateCreated: Date.now()
    },
    {
      courseId: '7',
      name: 'j.polski matura rozszerzona',
      subject: 'polski',
      level: 'matura rozszerzona',
      image: '/images/courses/polish.jpg',
      day: 'poniedziałek',
      time: 19,
      maxUsers: 8,
      users: ['4'],
      teacher: '4',
      dateCreated: Date.now()
    },
    {
      courseId: '8',
      name: 'matematyka matura rozszerzona',
      subject: 'matematyka',
      level: 'matura rozszerzona',
      image: '/images/courses/math.jpg',
      day: 'piątek',
      maxUsers: 8,
      time: 16,
      users: ['2'],
      teacher: '5',
      dateCreated: Date.now()
    },
    {
      courseId: '9',
      name: 'j.angielski matura rozszerzona',
      subject: 'angielski',
      level: 'matura rozszerzona',
      image: '/images/courses/english.jpg',
      day: 'sobota',
      time: 18,
      maxUsers: 7,
      users: [],
      teacher: '2',
      dateCreated: Date.now()
    },
    {
      courseId: '10',
      name: 'AUDITOR WIODĄCY SYSTEMU ZARZĄDZANIA ŚRODOWISKOWEGO WG ISO 14001:2015 (AKREDYTACJA CQI/IRCA 17903)',
      subject: 'audyt',
      level: null,
      image: '/images/courses/audit.jpg',
      day: 'wtorek',
      time: 17,
      maxUsers: 40,
      users: [],
      teacher: '7',
      dateCreated: Date.now()
    },
    {
      courseId: '11',
      name: 'CERTYFIKOWANY AUDYTOR WEWNĘTRZNY / PEŁNOMOCNIK ISO 13485',
      subject: 'audyt',
      level: null,
      image: '/images/courses/audit.jpg',
      day: 'czwartek',
      time: 16,
      maxUsers: 40,
      users: [],
      teacher: '6',
      dateCreated: Date.now()
    },
    {
      courseId: '12',
      name: 'WYMAGANIA ISO 9001:2015',
      subject: 'ISO',
      level: null,
      image: '/images/courses/iso.jpg',
      day: 'poniedziałek',
      time: 18,
      maxUsers: 40,
      users: ['5'],
      teacher: '7',
      dateCreated: Date.now()
    },
    {
      courseId: '13',
      name: 'AUDITOR WIODĄCY SYSTEMU ZARZĄDZANIA JAKOŚCIĄ WG ISO 9001:2015 (AKREDYTACJA CQI/IRCA 17955)',
      subject: 'audyt',
      level: null,
      image: '/images/courses/audit.jpg',
      day: 'czwartek',
      time: 17,
      maxUsers: 40,
      users: [],
      teacher: '6',
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < courses.length; k++) {
    firebase.firestore().collection('courses').add(courses[k]);
  }
}
