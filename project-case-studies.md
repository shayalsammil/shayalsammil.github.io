# Project case studies

The full write-ups that used to be on each project's page. Kept for reference and interview prep; not part of the website.

---

## Secure Login Portal

**AY 2026/2027 · Full-stack developer · Individual project**  
**Tools:** Node.js, JWT, MFA (TOTP), HTML, CSS, JavaScript

A role-based login portal built on Node.js, hardened against common attacks with authenticator-app multi-factor authentication and automatic session timeouts.

### Overview

Built for the Application Security module (CIT2C29), this project is a register and login portal for an organisation with three user roles, such as students. I developed it in stages: first a Node.js back end for authentication and authorisation, then a front end that uses it, and finally two OWASP security controls, multi-factor authentication and session timeouts, which I presented and defended in the final assessment.

### The problem

A login system is the front door of any application, so mistakes there expose every account behind it. The brief required secure registration for three roles, a login that issues a token without revealing whether the email or the password was wrong, and protected pages that only the right role can reach. A password on its own is still vulnerable to phishing, reuse and brute force, and sessions left open on shared computers can be taken over, so the final stage asked for real defences against those risks.

### How I built it

1. Authentication API: I built register and login endpoints in Node.js. A successful login returns an access token and the user's name and role, while any failure returns the same generic "Invalid credentials provided" message, so attackers cannot tell which accounts exist.
2. Role-based authorisation: each role has its own protected endpoint that checks the JSON Web Token's role claim. Requests without a token are rejected with 401 "Missing Token" and requests from the wrong role with 403 "Access denied", which I tested end to end with a Postman collection.
3. Front end without frameworks: I built the pages in plain HTML, CSS and JavaScript, as the brief did not allow JavaScript libraries. Users register, log in, are sent to their role's page, and are returned to the login screen with a clear message when they log out or their token is invalid.
4. Multi-factor authentication: after entering a correct password, users scan a QR code to link an authenticator app such as Microsoft Authenticator, then enter the 6-digit time-based code it generates. Access is only granted once that code is verified, so a stolen password alone is not enough to get in.
5. Session timeout: users are logged out automatically after a period of inactivity, so an account left signed in on a shared or public computer cannot be picked up by the next person.

### Challenges

The hardest part was fitting MFA into a login flow that already issued a token on a correct password. I had to split sign-in into two steps, so the password check alone no longer grants access and the full session only begins once the authenticator code is verified, while keeping the error messages clear and the redirects working for every role.

### Outcome & what I learned

The finished portal combines role-based access control with two OWASP-recommended defences, and I demonstrated it live and explained my code in the final presentation. It gave me a practical understanding of how authentication, authorisation and session management fit together, and why security has to be designed into a login flow rather than added at the end.

---

## Lost & Found

**AY 2026/2027 · Mobile app developer · Individual project**  
**Tools:** Flutter, Dart, Firebase, Riverpod, Groq AI, NETS QR

A Flutter mobile app that helps people on campus report and recover lost items, with AI that writes the listing from a photo and paid NETS QR boosts for urgent items.

### Overview

Built for the Mobile App Development module (CIT2C18), Lost & Found is an Android and iOS app for the Temasek Polytechnic community. Anyone who loses or finds something can post a listing with a photo, description, category and location, and browse other listings to reunite items with their owners. I took it from proposal and high-fidelity wireframes through to a finished app with authentication, a cloud database and an applied AI feature.

### The problem

Lost items on a large campus are usually reported through scattered chat groups, where posts get buried and are hard to search. The app needed a single place to post and find items quickly, with listings that are detailed enough to identify an item and easy to filter. The brief also required Firebase Authentication, one full set of CRUD on Cloud Firestore with advanced queries, Riverpod for state management, one applied AI feature and a NETS QR payment scenario.

### How I built it

1. Design: I wrote a proposal with a data dictionary and ER diagram, explored visual concepts with AI image generation, and turned them into high-fidelity wireframes and a widget tree before writing any code.
2. Navigation and authentication: the app uses a bottom navigation bar (Home, My Listings, Profile) and Firebase Authentication for registering, logging in, logging out and resetting passwords, with validation and clear feedback on every form.
3. Listings and search: listings are stored in Cloud Firestore with full create, read, update and delete. The home screen splits items into Lost and Found tabs, and combines a name search with category and time filters so users can narrow results quickly.
4. AI-assisted listings: when a user takes a photo or picks one from their gallery, the app sends it to Groq AI, which analyses the image and suggests the item's name, description and category. The user can edit the suggestions before posting, so listings are faster to create and more consistent.
5. Location and payments: each listing records where the item was lost or found and can be pinned on a map. Users can pay $1 through NETS QR to boost a listing to High Priority for 7 days, which highlights it and moves it to the top of the feed.

### Challenges

Making the AI suggestions genuinely useful was the hardest part. The model's output had to be turned into clean values for the name, description and category fields, and the form still had to work smoothly when the user wanted to change a suggestion or when the AI response failed.

### Outcome & what I learned

The finished app covers the full flow from signing up to posting, finding and boosting listings, and I demonstrated it live and explained my code in the final assessment. It taught me how to structure a larger Flutter project with Riverpod, design around a cloud database, and integrate an AI model so that it supports the user instead of getting in their way.

---

## EventFlow

**AY 2026/2027 · Cloud application developer · Individual project**  
**Tools:** AWS Lambda, API Gateway, Amazon Cognito, Amazon RDS (MySQL), DynamoDB, Next.js

A cloud-native event booking platform on AWS, built as four serverless microservices, where organisers publish events and attendees discover and book tickets.

### Overview

Built for the Cloud Application Development module (CIT2C24), EventFlow brings event organisers and attendees together in one place. Organisers create events with a venue, date, capacity and ticket types, publish them, and track bookings as they come in. Attendees search and filter events by category and date, book one or more tickets, receive an email confirmation, and manage or cancel their bookings. I designed the architecture, databases and APIs, then built and deployed the full application on AWS.

### The problem

Ticketing has to stay correct under pressure: when a popular event opens, many people book at once, and the system must never sell more seats than exist. The brief required a microservices architecture on AWS with at least one relational and one non-relational database, a full set of REST APIs, and a web application that consumes every one of them, so each part of the system had to be designed to scale and fail independently.

### How I built it

1. Architecture: I split the back end into four microservices (Events, Bookings, Notifications and Users), each running on AWS Lambda behind Amazon API Gateway. A single CloudFront domain routes the Next.js front end (hosted on AWS Amplify) and the API together, avoiding cross-origin issues and caching static content close to users.
2. Authentication and roles: users register through my User Service, which creates their account in Amazon Cognito with an organiser or attendee role, and sign in through the Cognito Hosted UI. API Gateway verifies each request's JWT before it reaches a Lambda, so no microservice needs its own login code, and the role decides what each user can do.
3. Choosing the right database: events and ticket types are relational, so the Event Service uses Amazon RDS (MySQL) for structured relationships, filtering and reliable transactions. Bookings and notification history are looked up by key, so they live in DynamoDB, with Global Secondary Indexes to fetch all bookings for an event or all notifications for a user.
4. Preventing overselling: before a booking is saved, the Booking Service asks the Event Service to reserve the seats, which fails if too few remain. If writing the booking then fails, the seats are released again as a rollback, so availability stays accurate even during peak demand.
5. Event-driven notifications: when a booking is confirmed or cancelled, the Booking Service publishes an event to Amazon EventBridge instead of waiting on email. The Notification Service then sends the email through Amazon SES and logs it, so a slow email never delays a booking, and attendees can review their notification history.

### Challenges

The hardest problem was keeping seat counts correct across two different databases. Seats live in MySQL while bookings live in DynamoDB, so a single transaction could not cover both. I solved it with a reserve-then-confirm flow and an automatic release on failure, which keeps the services independent while still preventing double-booking.

### Outcome & what I learned

EventFlow runs as a complete serverless application covering registration, event management, booking, cancellation and email notifications across organiser and attendee roles. It taught me how to design microservices around clear responsibilities, choose between relational and NoSQL storage based on access patterns, and use asynchronous events to keep a system fast and resilient.

---

## CalmClarity

**AY 2026/2027 · Product designer and product owner · Individual project**  
**Tools:** Figma, Jira, Design Thinking, Scrum, User Testing

A mobile app concept that brings every academic deadline into one prioritised view and pairs it with daily wellness check-ins, designed with design thinking and planned in Agile sprints.

### Overview

Built for the Agile Methodology and Design Thinking module (CIT2C23), CalmClarity tackles mental wellness and workload overwhelm among polytechnic students. It combines a unified deadline dashboard sorted by urgency, a guided planner that breaks assignments into sub-tasks, and a daily wellness check-in that tracks stress over time and surfaces support when it is needed. I took it through all three design thinking milestones, Define, Ideate and Prototype, ending with a high-fidelity Figma prototype tested with real users.

### The problem

Students feel overwhelmed during peak assessment periods because their deadlines are scattered across POLITEMall, Microsoft Teams and Outlook, with no single view of their total workload. Root cause analysis showed that school platforms are built around individual modules rather than the student's whole workload, that students are rarely taught how to plan large assignments, and that declining wellbeing usually goes unnoticed until it becomes a crisis.

### How I built it

1. Define: I identified the key problems, used the 5 Whys to reach their root causes, and wrote a user-centred problem statement backed by secondary research. I built personas, context maps and empathy maps for both a typical student and an extreme user, a disengaged student who only discovers deadlines at the last minute.
2. Ideate: I designed three key screens with alternative layouts for each and justified the final choices on usability and clarity. I mapped every root cause to the features and wireframe screens that address it, and turned the features into a prioritised product backlog of user stories in Jira.
3. Prototype: I built a high-fidelity, clickable Figma prototype and documented two complete user journeys, one for the primary user planning a deadline and checking in on their wellbeing, and one for the extreme user setting up the app in a panic the night before a deadline.
4. Sprint planning: I planned three two-week sprints in Jira, each with a clear goal and estimated stories broken into sub-tasks. Foundation (18 points) delivered sign-up, deadline entry, the urgency-sorted dashboard and reminders. Planning and Wellness (21 points) added the sub-task planner, clash warnings and the wellness check-in with a 7-day stress trend. Refinement and Polishing (19 points) added support resources, the Plan tab, settings and offline access.
5. User testing: I tested the prototype with a primary user and an extreme user, recorded the sessions, and captured their reactions in a Feedback Capture Grid of likes, wishes, questions and ideas. I then ranked each issue by importance and set a concrete next step for it.

### Challenges

The biggest lesson came from testing a decision I was confident in. I had locked the wellness support resources until a student completed their daily check-in, to encourage the habit, but both testers found this restrictive and wanted help straight away. I ranked it as the most critical issue and redesigned the wellness screen into two tabs, so support is always one tap away while reminders still encourage daily check-ins.

### Outcome & what I learned

Testers valued seeing every deadline in one place, the clean interface, and having workload planning and wellbeing in a single app, and said the privacy note made them comfortable sharing how they felt. The ranked feedback produced a clear improvement plan, including a completed-tasks archive, clearer confirmation messages and a more readable stress graph. The project taught me to let research and real user feedback drive design decisions, and to plan work in small, valuable increments.

---

## Food Outlet Queue Simulation

**AY 2025/2026 · Developer and analyst · Individual project**  
**Tools:** Python, Jupyter Notebook, Queues, Linked Lists, Big-O Analysis, draw.io

A Python simulation of lunch-hour queues at a campus food outlet, used to compare one queue against two, weigh linked lists, and design the layout of a new outlet.

### Overview

Built for the Data Structures and Algorithms module (CIT1C14), this project applies data structures to a real problem on campus: the lunch crowd at the food outlets near Temasek Polytechnic's Triangular Garden. I mapped the spaces around an outlet, simulated its ordering queues in Python, analysed how different designs perform, and finished by designing the layout for a new outlet, CafeX, alongside the existing Subway and Triplets.

### The problem

During lunch, queues at popular outlets spill out of the door and across walkways and seating areas, with only one counter taking orders. The brief was to model this with a queue of 20 people, test whether a second queue at another entrance would cope better with the crowd, explain the trade-offs using Big-O notation, consider replacing the queues with linked lists, and use those findings to plan a third outlet that handles peak periods well.

### How I built it

1. Mapping the space: I chose three interconnected spaces around an outlet and drew a digital floor plan in draw.io, marking doors, ordering counters and 20 squares for the people in the queue, laid out so the line fits across the spaces it passes through.
2. Single-queue simulation: I wrote a Queue class in Python with enqueue, dequeue, size and empty checks, then a while loop that adds customers and serves one per round for at least 50 people, printing each step and a "queue is full" message when the line reaches 20.
3. Two-queue simulation: I added a second queue of 20 at the outlet's other entrance, with one counter serving the two queues alternately. Customers arrive in random bursts and pick a queue with a slightly uneven 55/45 split, as real crowds do, and when one queue empties the counter keeps serving the other without errors, until all 25 customers in each queue are served.
4. Analysis: I compared the one-queue and two-queue designs using Big-O notation for their operations, and explained how replacing both queues with linked lists would change the way orders are placed and the queue is managed at different times of the day.
5. Designing CafeX: I planned a new air-conditioned outlet with a menu, its entrances, self-order kiosks and the data structures behind its ordering process, and drew a combined layout of Subway, Triplets and CafeX showing how their queues share the surrounding seating areas during peak periods.

### Challenges

Making the two-queue simulation both realistic and correct was the trickiest part. Random arrival bursts and an uneven split between entrances meant the queues filled at different rates, so the alternating counter had to skip an empty queue and pass the turn back fairly, without stalling or serving anyone twice, until every customer had been served.

### Outcome & what I learned

The simulation shows step by step how customers join, wait and are served across one and two queues, and the analysis and CafeX design turn those results into practical decisions about entrances, kiosks and queue placement. It taught me to choose data structures based on how they are actually used, and to back design decisions with evidence from a working model.
