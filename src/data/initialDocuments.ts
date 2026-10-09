import { AcademicDocument } from '../types';

export const INITIAL_DOCUMENTS: AcademicDocument[] = [
  {
    id: 'doc-dsa-assign1',
    title: 'DSA Assignment 1 - Linear Data Structures & Complexity',
    course: 'DSA',
    semester: 'Sem 3',
    type: 'ASSIGNMENT',
    file_path: 'uploads/DSA_Assignment1.pdf',
    file_name: 'DSA_Assignment1.pdf',
    file_size: '340 KB',
    upload_date: '2026-10-01 10:30:00',
    tags: ['arrays', 'linked lists', 'stack', 'queue', 'complexity', 'deadline'],
    department: 'Computer Science & Engineering',
    author: 'Prof. R. Sharma (Dept of CSE, BIT)',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
Course: Data Structures & Algorithms (CS-301) | Semester: 3rd Sem B.Tech

ASSIGNMENT 1: Linear Data Structures, Stacks, Queues & Asymptotic Analysis
Faculty In-Charge: Prof. R. Sharma
Submission Deadline: 20 Oct 2026 at 11:59 PM (IST) via BIT Student ERP Portal or Hardcopy in Lab 304.

PROBLEM STATEMENTS:
1. Arrays & Dynamic Resizing:
   Implement an amortized O(1) dynamic array in C++/Java. Write a function to detect and remove duplicates in O(n) time using hashing.
2. Linked List Algorithms:
   Write code to reverse a singly linked list in-place and find the intersection node of two linked lists without extra space.
3. Stack Applications:
   Evaluate postfix expressions and verify balanced parentheses using stack ADT. Time complexity must be O(N).
4. Circular Queue:
   Implement a circular queue with array of fixed size N avoiding overflow and underflow conditions.

IMPORTANT SUBMISSION INSTRUCTIONS:
- 20 Oct is the deadline for DSA assignment submission. Late submissions will attract a 10% penalty per day.
- Submit clean source code with test cases, screenshot of output, and time complexity derivation.
- Any form of plagiarism will lead to 0 marks in internal assessments.
For help with study material regarding array manipulation, pointer operations, and Big-O notation, refer to DSA Unit 1 & Unit 2 lecture notes available in the BIT Digital Library.`
  },
  {
    id: 'doc-dbms-unit3',
    title: 'DBMS Unit 3 Lecture Notes - Normalization & Relational Design',
    course: 'DBMS',
    semester: 'Sem 4',
    type: 'NOTES',
    file_path: 'uploads/DBMS_Unit3_Notes.pdf',
    file_name: 'DBMS_Unit3_Notes.pdf',
    file_size: '1.2 MB',
    upload_date: '2026-09-28 14:15:00',
    tags: ['normalization', '1NF', '2NF', '3NF', 'BCNF', 'functional dependencies', 'lossless join'],
    department: 'Computer Science & Engineering',
    author: 'Dr. Meenakshi Verma (Dept of CSE, BIT)',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
Course: Database Management Systems (CS-401)
UNIT 3 NOTES: Relational Database Design, Functional Dependencies & Normalization

1. FUNCTIONAL DEPENDENCY (FD):
   Let R be a relation schema. An FD X -> Y holds on R if for every pair of valid tuples t1, t2 in instance r(R),
   if t1[X] = t2[X], then t1[Y] = t2[Y].
   - Armstrong's Axioms: Reflexivity, Augmentation, Transitivity.
   - Secondary rules: Union, Decomposition, Pseudo-transitivity.
   - Attribute Closure (X+): The set of all attributes functionally determined by X under FD set F.

2. NORMAL FORMS OVERVIEW:
   - First Normal Form (1NF): A relation is in 1NF if and only if all domain values are atomic and no repeating groups exist.
   - Second Normal Form (2NF): A relation is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key (no partial dependencies).
   - Third Normal Form (3NF): A relation is in 3NF if it is in 2NF and for every non-trivial FD X -> A, either X is a superkey OR A is a prime attribute (eliminates transitive dependencies).
   - Boyce-Codd Normal Form (BCNF): A relation is in BCNF if for every non-trivial FD X -> A, X is strictly a superkey. BCNF is stricter than 3NF.

3. DECOMPOSITION PROPERTIES:
   - Lossless Join Decomposition: R1 join R2 = R. Condition: (R1 intersection R2) -> R1 OR (R1 intersection R2) -> R2.
   - Dependency Preservation: F+ = (F1 union F2)+. 3NF always guarantees both lossless join and dependency preservation, whereas BCNF may not preserve all functional dependencies.

PRACTICE QUESTIONS FOR BIT EXAMS:
1. Decompose relation R(A,B,C,D,E) with F={A->BC, CD->E, B->D, E->A} into 3NF and BCNF.
2. Prove why BCNF is free from redundancy arising from functional dependencies.`
  },
  {
    id: 'doc-os-exam-topics',
    title: 'OS Midterm & End-Semester Important Topics & Blueprint',
    course: 'OS',
    semester: 'Sem 4',
    type: 'NOTES',
    file_path: 'uploads/OS_Important_Exam_Topics.pdf',
    file_name: 'OS_Important_Exam_Topics.pdf',
    file_size: '620 KB',
    upload_date: '2026-10-04 09:00:00',
    tags: ['operating systems', 'important topics', 'deadlock', 'cpu scheduling', 'paging', 'virtual memory', 'bankers algorithm'],
    department: 'Computer Science & Engineering',
    author: 'Prof. S. K. Gupta (Dept of CSE, BIT)',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
Course: Operating Systems (CS-402) | Subject Code: KCS-401
DOCUMENT: High-Priority Important Topics for Upcoming Mid-Semester and End-Semester OS Examinations

The following are the MOST IMPORTANT TOPICS for the upcoming Operating Systems (OS) exam:

1. UNIT 1 - PROCESS MANAGEMENT & CPU SCHEDULING:
   - Process State Transition Diagram (New, Ready, Running, Waiting, Terminated).
   - CPU Scheduling Algorithms with numerical Gantt chart problems:
     * FCFS (First Come First Serve) & Convoy Effect.
     * SJF (Shortest Job First) and SRTF (Shortest Remaining Time First) - high probability numerical question.
     * Round Robin (RR) with optimal time quantum selection.
     * Priority Scheduling with Starvation and Aging solutions.

2. UNIT 2 - PROCESS SYNCHRONIZATION & CLASSICAL PROBLEMS:
   - Critical Section Problem: Requirements (Mutual Exclusion, Progress, Bounded Waiting).
   - Peterson's Solution for 2 processes.
   - Semaphores: Counting vs Binary Semaphores, wait() and signal() primitives.
   - Classical Synchronization Problems: Producer-Consumer (Bounded Buffer), Readers-Writers Problem, Dining Philosophers Problem.

3. UNIT 3 - DEADLOCKS (GUARANTEED 10-MARK QUESTION):
   - Four Coffman Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.
   - Deadlock Prevention vs Deadlock Avoidance.
   - Banker's Algorithm: Safety Algorithm and Resource Request Algorithm (MUST PRACTICE NUMERICAL MATRIX CALCULATION).
   - Resource Allocation Graph (RAG) and cycle detection.

4. UNIT 4 - MEMORY MANAGEMENT & VIRTUAL MEMORY:
   - Contiguous vs Non-contiguous Allocation: Paging architecture and Page Table structure.
   - Translation Lookaside Buffer (TLB) and Effective Memory Access Time (EMAT) calculations.
   - Virtual Memory: Demand Paging and Page Fault handling sequence.
   - Page Replacement Algorithms: FIFO (Belady's Anomaly), Optimal (OPT), Least Recently Used (LRU - numerical with page reference strings).

5. UNIT 5 - FILE SYSTEMS & DISK SCHEDULING:
   - Disk Scheduling numericals: FCFS, SSTF, SCAN (Elevator), C-SCAN, LOOK, C-LOOK.`
  },
  {
    id: 'doc-cse-notice-projects',
    title: 'CSE Department Notice: Minor Project Phase-1 Synopsis Submission',
    course: 'General',
    semester: 'Sem 5',
    type: 'NOTICE',
    file_path: 'uploads/Notice_CSE_MinorProject_2026.pdf',
    file_name: 'Notice_CSE_MinorProject_2026.pdf',
    file_size: '210 KB',
    upload_date: '2026-10-06 11:20:00',
    tags: ['notice', 'cse department', 'minor project', 'synopsis', 'deadline', 'viva'],
    department: 'Computer Science & Engineering',
    author: 'Head of Department (CSE), Bharat Institute of Technology',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
BYPASS ROAD, PARTAPUR, MEERUT - 250103
OFFICE OF THE HEAD OF DEPARTMENT - COMPUTER SCIENCE & ENGINEERING
Ref No: BIT/CSE/2026/NOT-104                                Date: 06 October 2026

CIRCULAR / NOTICE FOR 5th & 7th SEMESTER CSE STUDENTS
Subject: Submission of Minor Project Phase-1 Synopsis & Review Schedule

All 5th Semester B.Tech (CSE) students are hereby notified regarding the mandatory Minor Project Phase-1 guidelines:
1. Synopsis Submission Deadline:
   The deadline for submitting the hardcopy and softcopy of the Project Synopsis approved by your assigned faculty guide is 25 October 2026 by 4:00 PM.
2. Team Size:
   Each project group must strictly consist of 3 to 4 students. Individual projects are not permitted.
3. Approved Domains for Minor Project 2026:
   - Artificial Intelligence & Machine Learning
   - Full Stack Web Applications (React, Spring Boot, Node.js, FastAPI)
   - Cloud Computing & DevOps
   - Cyber Security & Cryptography
   - IoT and Embedded Systems
4. Synopsis Format:
   Must contain: Abstract (200 words), Problem Definition, Literature Review (at least 3 IEEE papers), Proposed Architecture Diagram, Technology Stack, and Gantt Chart.
5. Review-1 Presentation:
   Presentations will commence from 28 October 2026 in Seminar Hall 2. Attendance is compulsory. Failure to appear will lead to deduction in internal sessionals.

Sd/-
Head of Department (CSE)
Bharat Institute of Technology (BIT)`
  },
  {
    id: 'doc-exam-notice-midsem',
    title: 'Examination Cell Circular: Odd Semester Mid-Term Exam Dates & Guidelines',
    course: 'General',
    semester: 'All',
    type: 'NOTICE',
    file_path: 'uploads/ExamCell_MidSem_Datesheet_2026.pdf',
    file_name: 'ExamCell_MidSem_Datesheet_2026.pdf',
    file_size: '280 KB',
    upload_date: '2026-10-05 16:45:00',
    tags: ['exam notice', 'mid sem', 'datesheet', 'admit card', 'timings', 'attendance'],
    department: 'Examination Cell, BIT',
    author: 'Controller of Examinations, BIT',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
OFFICE OF THE CONTROLLER OF EXAMINATIONS
Ref: BIT/EXAM/2026/MID-089                                   Date: 05 October 2026

NOTIFICATION: MID-SEMESTER EXAMINATIONS (ODD SEMESTER 2026-27)
For B.Tech (All Branches), MCA, MBA Students (Semesters 1, 3, 5, 7)

1. Examination Schedule:
   The Mid-Semester Theory & Practical examinations will be conducted from 10 November 2026 to 17 November 2026.
   - Shift 1 (Morning): 09:30 AM to 11:30 AM
   - Shift 2 (Afternoon): 01:30 PM to 03:30 PM

2. Hall Ticket / Admit Cards:
   Students can download digital admit cards from the BIT ERP Portal (https://erp.bit.ac.in) starting 02 November 2026. Entry without BIT Student ID Card and printed Admit Card will strictly NOT be permitted.

3. Mandatory Attendance Criterion:
   As per University and BIT academic regulations, students with less than 75% aggregate attendance in theory/practical classes will be detained from appearing in the mid-term examinations.

4. Seating Plan:
   The detailed seating plan will be displayed on the notice board outside Academic Block A and B one day prior to each examination.

Sd/-
Controller of Examinations
Bharat Institute of Technology (BIT)`
  },
  {
    id: 'doc-dsa-study-guide',
    title: 'DSA Study Material & Revision Guide: Arrays, Pointers, Linked Lists & Complexity',
    course: 'DSA',
    semester: 'Sem 3',
    type: 'NOTES',
    file_path: 'uploads/DSA_Study_Material_Unit1_2.pdf',
    file_name: 'DSA_Study_Material_Unit1_2.pdf',
    file_size: '890 KB',
    upload_date: '2026-10-02 12:00:00',
    tags: ['study material', 'arrays', 'pointers', 'linked list', 'asymptotic analysis', 'assignment help'],
    department: 'Computer Science & Engineering',
    author: 'Prof. R. Sharma (Dept of CSE, BIT)',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
COMPREHENSIVE STUDY MATERIAL FOR DSA ASSIGNMENT & MID-TERM PREPARATION

TOPIC 1: ARRAY MANIPULATION & DYNAMIC MEMORY
- Contiguous storage: Address formula for 1D array: Loc(A[i]) = Base(A) + w * (i - LowerBound).
- For 2D array: Row-Major Order Loc(A[i][j]) = Base + w * [(i - L1)*N2 + (j - L2)].
- Removing duplicates in O(n): Use an unordered_set (Hash Set in Java) to keep track of seen elements while traversing in a single pass.

TOPIC 2: LINKED LIST INVERSION & FAST-SLOW POINTER TECHNIQUE
- In-place reversal algorithm:
  struct Node* prev = NULL; struct Node* curr = head; struct Node* next = NULL;
  while (curr != NULL) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
- Detecting cycle: Floyd's Cycle-Finding Algorithm (slow moves 1 step, fast moves 2 steps). If they meet, cycle exists.

TOPIC 3: STACK APPLICATIONS & OPERATOR PRECEDENCE
- Postfix evaluation: Operands pushed onto stack; when operator encountered, pop top two operands, evaluate, and push result back.
- Infix to Postfix: Operator precedence rule: ^ (highest, right-to-left) > *, / > +, - (lowest, left-to-right).

TOPIC 4: ASYMPTOTIC NOTATIONS
- Big-O (Upper Bound): f(n) <= c * g(n) for all n >= n0.
- Big-Omega (Lower Bound): f(n) >= c * g(n).
- Big-Theta (Tight Bound): c1 * g(n) <= f(n) <= c2 * g(n).`
  },
  {
    id: 'doc-dbms-syllabus',
    title: 'DBMS Complete Course Syllabus & Evaluation Scheme',
    course: 'DBMS',
    semester: 'Sem 4',
    type: 'SYLLABUS',
    file_path: 'uploads/DBMS_Course_Syllabus_BIT.pdf',
    file_name: 'DBMS_Course_Syllabus_BIT.pdf',
    file_size: '410 KB',
    upload_date: '2026-08-20 10:00:00',
    tags: ['syllabus', 'dbms', 'course outcomes', 'evaluation', 'textbooks'],
    department: 'Computer Science & Engineering',
    author: 'Board of Studies, BIT Meerut',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
COURSE SYLLABUS: Database Management Systems (CS-401)
Credits: 4 (L: 3, T: 1, P: 0) | Prerequisites: Data Structures (CS-301)

UNIT 1: Introduction to Database Systems, Data Models, Schemas, Instances, 3-Schema Architecture, ER Modeling (Entities, Relationships, ER to Relational Mapping).
UNIT 2: Relational Query Languages: Relational Algebra, Relational Calculus, SQL DDL, DML, DCL, Aggregate Functions, Nested Queries, Joins, Triggers, Views.
UNIT 3: Relational Database Design: Functional Dependencies, Normalization (1NF, 2NF, 3NF, BCNF), Multi-valued dependencies and 4NF, Lossless join and Dependency preservation.
UNIT 4: Transaction Processing & Concurrency Control: ACID properties, Serializability (Conflict & View), 2-Phase Locking (2PL), Timestamp ordering, Deadlock detection.
UNIT 5: Storage & Indexing: RAID architectures, File organization, B-Tree and B+ Tree Indexing, Static and Dynamic Hashing.

RECOMMENDED TEXTBOOKS:
1. Database System Concepts by Silberschatz, Korth, Sudarshan (McGraw Hill).
2. Fundamentals of Database Systems by Elmasri and Navathe (Pearson).`
  },
  {
    id: 'doc-event-technovation',
    title: 'Technovation 2026: BIT Annual National Technical Festival',
    course: 'General',
    semester: 'All',
    type: 'EVENT',
    file_path: 'uploads/Technovation_2026_Flyer.pdf',
    file_name: 'Technovation_2026_Flyer.pdf',
    file_size: '1.5 MB',
    upload_date: '2026-10-07 15:30:00',
    tags: ['event', 'hackathon', 'technovation', 'coding contest', 'robotics', 'prizes'],
    department: 'BIT Technical Society & CSI Student Chapter',
    author: 'Student Activity Council, BIT',
    content: `BHARAT INSTITUTE OF TECHNOLOGY (BIT)
PRESENTS: TECHNOVATION 2026 - THE ANNUAL NATIONAL TECH FEST
Dates: 20th - 22nd November 2026 | Venue: Main Auditorium & Computing Labs, BIT Meerut Campus

FEATURED EVENTS & COMPETITIONS:
1. Hack-a-BIT 2026: 24-hour National Hackathon on AI & Smart Campus Solutions (Cash Prize Pool: INR 1,50,000).
2. Code-Blaze: Competitive Programming Challenge on HackerRank (Solo participation).
3. Robo-War & Line Follower: Battle of Autonomous bots organized by Robotics Club BIT.
4. Project Expo: Showcase your final year & minor innovation prototypes to industry venture capitalists.
5. Tech-Talk Keynotes: Industry executives from Google, Microsoft, and TCS.

REGISTRATION:
Open for all BIT students and university participants at https://technovation.bit.ac.in.
Last date for Hackathon team registration: 10 November 2026.`
  }
];
