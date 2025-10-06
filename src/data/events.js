const demoNames = [
  { name: "Aisha", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Leo", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Zara", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
  { name: "Max", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
  { name: "Ria", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Arjun", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
  { name: "Neha", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  { name: "Kabir", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
  { name: "Sanya", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
  { name: "Vikram", avatar: "https://randomuser.me/api/portraits/men/61.jpg" },
  { name: "Priya", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Rohan", avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
  { name: "Meera", avatar: "https://randomuser.me/api/portraits/women/77.jpg" },
  { name: "Amit", avatar: "https://randomuser.me/api/portraits/men/88.jpg" },
  { name: "Sahil", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
  { name: "Divya", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
  { name: "Nina", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
  { name: "Raj", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
  { name: "Tara", avatar: "https://randomuser.me/api/portraits/women/53.jpg" },
  { name: "Dev", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
  { name: "Anil", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Simran", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
  { name: "Kiran", avatar: "https://randomuser.me/api/portraits/men/25.jpg" },
  { name: "Pooja", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
  // Add more if needed
];

function getRandomParticipants(min = 2, max = 7) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = demoNames
    .map((n) => ({ ...n, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((n) => ({ name: n.name, avatar: n.avatar }));
  return shuffled.slice(0, count);
}

export const events = [
  {
    id: 1,
    name: "Sunday Morning Tennis Rally",
    sport: "Tennis",
    type: "Social",
    location: "DLF Sports Complex, Delhi",
    dates: ["Oct 10 - 9:00 AM", "Oct 12 - 6:00 PM"],
    participants: getRandomParticipants(),
    image: "/1.png",
    description:
      "Join a friendly morning tennis meetup for all skill levels. Bring your racket and positive energy!",
    host: {
      name: "Rally Sports Club",
      description: "A community-driven club organizing social tennis events for all ages and skill levels in Delhi."
    }
  },
  {
    id: 2,
    name: "Weekend Football Clash",
    sport: "Football",
    type: "Tournament",
    location: "Mumbai City Turf, Mumbai",
    dates: ["Oct 11 - 5:00 PM", "Oct 13 - 8:00 PM"],
    participants: getRandomParticipants(),
    image: "/2.png",
    description:
      "Friendly 5v5 football tournament. High-energy matches and lots of fun with local players.",
    host: {
      name: "Mumbai Football League",
      description: "Mumbai's premier amateur football league, hosting tournaments and matches for all enthusiasts."
    }
  },
  {
    id: 3,
    name: "Morning Yoga Session",
    sport: "Yoga",
    type: "Class",
    location: "Cubbon Park, Bangalore",
    dates: ["Oct 12 - 7:00 AM", "Oct 14 - 7:00 AM"],
    participants: getRandomParticipants(),
    image: "/3.png",
    description:
      "Start your day with a refreshing outdoor yoga session suitable for beginners and intermediate practitioners.",
    host: {
      name: "Anjali Mehta",
      description: "Certified yoga instructor with 10+ years of experience in group and private sessions."
    }
  },
  {
    id: 4,
    name: "City Badminton Meetup",
    sport: "Badminton",
    type: "Social",
    location: "NSCI Dome, Mumbai",
    dates: ["Oct 13 - 6:00 PM", "Oct 15 - 5:00 PM"],
    participants: getRandomParticipants(),
    image: "/4.png",
    description:
      "Join fellow badminton enthusiasts for casual evening matches. Equipment provided for beginners.",
    host: {
      name: "Shuttle Champs",
      description: "A Mumbai-based group dedicated to promoting badminton through regular meetups and events."
    }
  },
  {
    id: 5,
    name: "Weekend Cricket Coaching",
    sport: "Cricket",
    type: "Class",
    location: "M. Chinnaswamy Stadium Ground, Bangalore",
    dates: ["Oct 12 - 3:00 PM", "Oct 13 - 3:00 PM"],
    participants: getRandomParticipants(),
    image: "/5.png",
    description:
      "Weekend cricket coaching sessions for beginners and intermediates. Learn batting, bowling, and fielding techniques.",
    host: {
      name: "Coach Ravi Kumar",
      description: "Former state-level cricketer and certified coach specializing in youth and beginner training."
    }
  },
  {
    id: 6,
    name: "Evening Basketball Jam",
    sport: "Basketball",
    type: "Social",
    location: "Indira Gandhi Indoor Stadium, Delhi",
    dates: ["Oct 14 - 7:00 PM"],
    participants: getRandomParticipants(),
    image: "/6.png",
    description:
      "Casual basketball games for all levels. Meet new friends and enjoy a fun evening on the court.",
    host: {
      name: "Delhi Hoops Collective",
      description: "A passionate group of basketball lovers organizing open jams and tournaments in Delhi."
    }
  },
  {
    id: 7,
    name: "Cycling Adventure",
    sport: "Cycling",
    type: "Ride",
    location: "Marine Drive, Mumbai",
    dates: ["Oct 15 - 6:00 AM"],
    participants: getRandomParticipants(),
    image: "/7.png",
    description:
      "Join us for a scenic early morning cycling ride along the coast. All fitness levels welcome.",
    host: {
      name: "Pedal Power Mumbai",
      description: "Organizing group rides and cycling adventures for all levels across Mumbai."
    }
  },
  {
    id: 8,
    name: "Table Tennis Knockout",
    sport: "Table Tennis",
    type: "Tournament",
    location: "Koramangala Club, Bangalore",
    dates: ["Oct 16 - 4:00 PM"],
    participants: getRandomParticipants(),
    image: "/8.png",
    description:
      "Fast-paced table tennis knockout tournament. Prizes for winners and refreshments for all.",
    host: {
      name: "Spin Masters",
      description: "Bangalore's leading table tennis community, hosting tournaments and coaching sessions."
    }
  },
  {
    id: 9,
    name: "Evening Volleyball Fun",
    sport: "Volleyball",
    type: "Social",
    location: "Juhu Beach, Mumbai",
    dates: ["Oct 17 - 5:30 PM"],
    participants: getRandomParticipants(),
    image: "/9.png",
    description:
      "Enjoy a friendly game of volleyball on the beach. Open to all, no experience necessary.",
    host: {
      name: "Beach Sports Mumbai",
      description: "Specializing in organizing fun and inclusive beach sports events for the Mumbai community."
    }
  },
  {
    id: 10,
    name: "Ultimate Frisbee Meetup",
    sport: "Ultimate Frisbee",
    type: "Social",
    location: "Cubbon Park, Bangalore",
    dates: ["Oct 18 - 8:00 AM"],
    participants: getRandomParticipants(),
    image: "/10.png",
    description:
      "Try your hand at ultimate frisbee! All ages and skill levels welcome. Bring water and energy.",
    host: {
      name: "Bangalore Ultimate",
      description: "A spirited group promoting ultimate frisbee through regular meetups and tournaments in Bangalore."
    }
  },
  {
    id: 11,
    name: "Evening Run Club",
    sport: "Running",
    type: "Group Run",
    location: "Lodhi Gardens, Delhi",
    dates: ["Oct 19 - 6:30 PM"],
    participants: getRandomParticipants(),
    image: "/11.png",
    description:
      "Join our evening run club for a relaxed jog and post-run stretching. All paces welcome.",
    host: {
      name: "RunWithUs Delhi",
      description: "A friendly running group for all levels, meeting weekly at parks across Delhi."
    }
  },
  {
    id: 12,
    name: "Beginner's Swimming Class",
    sport: "Swimming",
    type: "Class",
    location: "Basavanagudi Aquatic Centre, Bangalore",
    dates: ["Oct 20 - 9:00 AM"],
    participants: getRandomParticipants(),
    image: "/12.png",
    description:
      "Learn the basics of swimming in a safe and supportive environment. Certified instructors provided.",
    host: {
      name: "AquaStart Swim School",
      description: "Professional swim school offering beginner and advanced classes with certified instructors."
    }
  },
];
