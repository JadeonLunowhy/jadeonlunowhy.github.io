````markdown
---
layout: page
title: Course Timetable Inquiry System
description: A multithreaded C++ client-server system for course schedule queries and administration over TCP.
img: assets/img/12.jpg
importance: 1
category: Undergraduate Coursework
related_publications: false
---

A **C++17 client-server application** for querying and managing university course schedules. The system uses a lightweight TCP protocol to connect console or GUI clients to a multithreaded server, with persistent timetable data stored in CSV format.

[**View on GitHub →**](https://github.com/JadeonLunowhy/Timetable-Inquiry-System)

### Highlights

- Built a **multithreaded Winsock TCP server** with one worker thread per client connection.
- Implemented timetable queries by **course code, instructor, semester, day, and time range**.
- Added authenticated administrator operations for **adding, updating, and deleting courses**.
- Designed synchronized CSV persistence with `std::mutex` for safe concurrent access.
- Developed both a **wxWidgets GUI client** and a command-line client.
- Added optional **AES-256-GCM encrypted sessions** using a pre-shared key.

### System Architecture

```text
Console / wxWidgets Client
          |
          |  TCP
          v
Multithreaded Winsock Server
          |
          v
CourseDatabase
          |
          v
     courses.csv
````

**Tech Stack:** C++17 · Winsock · TCP/IP · Multithreading · wxWidgets · CSV · AES-256-GCM

```
```
